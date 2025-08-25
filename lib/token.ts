import { SignJWT, jwtVerify } from 'jose'
import { randomUUID } from 'crypto'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret')

export async function signRound(payload: object){
  return await new SignJWT({ jti: randomUUID(), ...payload })
    .setProtectedHeader({ alg:'HS256' })
    .setExpirationTime('15m')
    .sign(secret)
}

export async function verifyRound(token: string){
  const { payload } = await jwtVerify(token, secret)
  return payload
}
