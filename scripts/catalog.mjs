import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {canonicalPluginJson} from '../src/plugin-manifest.mjs';
import {parsePluginCatalog,verifyPluginCatalog} from '../src/plugin-catalog.mjs';
const mode=process.argv[2],args=Object.fromEntries(process.argv.slice(3).map(value=>value.replace(/^--/,'').split(/=(.*)/s).slice(0,2)));
if(mode==='prepare'){
 if(!args.id||!args.entries||!args.out)throw Error('Required --id --entries=entry1,entry2 --out');const packages=await Promise.all(args.entries.split(',').map(async file=>JSON.parse(await readFile(resolve(file),'utf8'))));
 const payload={schemaVersion:1,id:args.id,generatedAt:args.at??new Date().toISOString(),packages};const out=resolve(args.out);await mkdir(out,{recursive:true});await writeFile(join(out,'PAYLOAD.json'),canonicalPluginJson(payload),{flag:'wx'});await writeFile(join(out,'PAYLOAD.pretty.json'),JSON.stringify(payload,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({prepared:true,id:payload.id,packages:packages.length,out,signingNamespace:'ai-buddy-plugin-catalog'}));
}else if(mode==='envelope'){
 const payload=JSON.parse(await readFile(resolve(args.payload),'utf8')),value=await readFile(resolve(args.signature),'utf8');if(!value.startsWith('-----BEGIN SSH SIGNATURE-----'))throw Error('Expected detached SSHSIG');const envelope={payload,signature:{algorithm:'sshsig',keyId:args['key-id'],value}};parsePluginCatalog(payload);await writeFile(resolve(args.out),JSON.stringify(envelope,null,2)+'\n',{flag:'wx'});console.log(JSON.stringify({envelopeWritten:true,out:resolve(args.out)}));
}else if(mode==='verify'){
 const publicKey=await readFile(resolve(args['public-key']),'utf8'),catalog=verifyPluginCatalog(await readFile(resolve(args.catalog),'utf8'),{trustedKeys:{[args['key-id']]:publicKey.trim()}});console.log(JSON.stringify({verified:true,id:catalog.id,packages:catalog.packages.length,proof:catalog.verified}));
}else throw Error('Use prepare, envelope, or verify. This utility never reads a private key.');
