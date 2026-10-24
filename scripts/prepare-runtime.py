import argparse,hashlib,io,json,pathlib,tarfile,urllib.request
repo=pathlib.Path(__file__).resolve().parents[1];source=json.loads((repo/'runtime-source.json').read_text('utf8'));parser=argparse.ArgumentParser();parser.add_argument('--out',default=str(repo/'.runtime-cache'));args=parser.parse_args();out=pathlib.Path(args.out).resolve();out.mkdir(parents=True,exist_ok=True)
with urllib.request.urlopen(source['archiveUrl'],timeout=120) as response:archive=response.read()
assert len(archive)==source['archiveBytes'] and hashlib.sha256(archive).hexdigest()==source['archiveSha256'],'Official archive checksum mismatch'
with tarfile.open(fileobj=io.BytesIO(archive),mode='r:gz') as tar:
 rows=[item for item in tar.getmembers() if not item.isdir()];assert len(rows)==1 and rows[0].isfile() and rows[0].name=='kimi.exe','Unexpected archive structure';binary=tar.extractfile(rows[0]).read()
assert len(binary)==source['binaryBytes'] and hashlib.sha256(binary).hexdigest()==source['binarySha256'],'Original executable checksum mismatch'
target=out/'kimi.exe'
if target.exists():assert hashlib.sha256(target.read_bytes()).hexdigest()==source['binarySha256'],'Existing cache differs; choose a new output folder'
else:target.write_bytes(binary)
print(json.dumps({'ok':True,'path':str(target),'sha256':source['binarySha256']}))
