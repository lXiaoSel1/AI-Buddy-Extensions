import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {createHash} from 'node:crypto';
import {extractPluginArchive} from '../src/plugin-archive.mjs';
const out=resolve(process.argv.find(arg=>arg.startsWith('--out='))?.slice(6)??'.artifacts/release'),receipt=JSON.parse(await readFile(join(out,'BUILD-RECEIPT.json'),'utf8'));const results=[];
for(const row of receipt.packages){const entry=JSON.parse(await readFile(resolve(out,row.entry),'utf8')),bytes=await readFile(resolve(out,row.archive));if(bytes.length!==entry.archive.bytes||createHash('sha256').update(bytes).digest('hex')!==entry.archive.sha256)throw Error('Archive differs from manifest');const temporary=await mkdtemp(join(tmpdir(),'ai-buddy-extension-verify-'));try{const verified=await extractPluginArchive(bytes,temporary,entry.manifest);if(row.kind==='runtime'&&createHash('sha256').update(await readFile(join(temporary,'bin/kimi.exe'))).digest('hex')!==receipt.originalBinarySha256)throw Error('Runtime byte identity changed');results.push({kind:row.kind,...verified});}finally{await rm(temporary,{recursive:true,force:true});}}
console.log(JSON.stringify({passed:true,signatureVerified:false,note:'Archive/file/hash verification only. Signed catalogs must be verified separately.',results},null,2));
