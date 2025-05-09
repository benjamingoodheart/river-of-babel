import fs from 'node:fs'
import crypto from 'node:crypto'
export default defineEventHandler((event) => {
  let header = {
    alg: "ES256",
    kid: "792ZNGX3CU",
    typ: "JWT",
  };
  const privateKey = fs.readFileSync("./AuthKey_792ZNGX3CU.p8")
  const epoch = Math.floor(Date.now()/1000)
  let claims = {
    iss: "RQM9MTR98R",
    iat: epoch,
    exp: epoch + 60 * 60 * 24 * 7,
    origin: 'http://localhost:3000'
  };

  const unsignedToken = Buffer.from(JSON.stringify(header)).toString('base64url') + '.' + Buffer.from(JSON.stringify(claims)).toString('base64url');
  console.log(unsignedToken)
  const signer = crypto.createSign('sha256');
  signer.update(unsignedToken);
  signer.end();
  //console.log(String(privateKey).replace(/\\n/g, '\\n'))
  const signature = signer.sign({
    key: privateKey,
    format: 'pem'
  })
  .toString('base64url')
  .replace(/=/g, '')
  .replace(/\\+/g,'-')
  .replace(/\\/g, '_');



  return unsignedToken + '.' + signature;
});
