import fs from "node:fs";
import crypto from "node:crypto";
import * as jose from "jose";

export default defineEventHandler(async (event) => {
  const privateKey = process.env.VITE_APPLE_API_SECRET
  //fs.readFileSync("./AuthKey_792ZNGX3CU.p8");
  const keyObject = crypto.createPrivateKey(privateKey);
  const epoch = Math.floor(Date.now() / 1000);
  let claims = {
    iss: "",
    iat: epoch,
    exp: epoch + 60 * 60 * 24 * 7,

    origin: "http://localhost:3000",
  };

  const jwt = await new jose.SignJWT({})
    .setProtectedHeader({
      alg: "ES256",
      kid: process.env.VITE_APPLE_KID,
    })
    .setIssuer("RQM9MTR98R")
    .setIssuedAt()
    .setExpirationTime("1 Week")
    .sign(keyObject);

  return jwt;
});
