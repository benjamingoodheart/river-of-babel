import jwt from 'jsonwebtoken';
export default defineNuxtPlugin((nuxtApp))=>{

    return {
        provide:{
            generateJWT: ()=>{
                return jwt.sign({
                    alg:'ES256',
                    kid: '6598SC5394',
                    typ: 'JWT'
                }, process.env.VITE_APPLE_API_SECRET, { algorithm: 'RS256' })
            }
        }
    }
}