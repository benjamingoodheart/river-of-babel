import jwt from 'jsonwebtoken';
export default defineEventHandler((event)=>{
    let payload = {
        alg: 'ES256',
        kid: '6598SC5394',
        typ: 'JWT'
    }
    let options = {
        "issuer": "5ef33849-0998-4870-87d4-4fbdb5d09207",
        "expiresIn": 1777320129,
        "audience": "riverofbabel-v1",
        "subject": "RQM9MTR98R.media.com.riverofbabel",
        "algorithm": 'ES256',
        "keyId": '6598SC5394'
    }
    let privateKey = process.env.VITE_APPLE_API_SECRET.replace(/\\n/g, "\n")
    let token = jwt.sign(payload, privateKey, options)
    console.log(token)
    return token
})