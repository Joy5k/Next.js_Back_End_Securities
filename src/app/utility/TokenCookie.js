import { CreateToken } from "./JWTHelper";

export async function TokenCookie() {
    const token = await CreateToken();
    return {'Set-Cookie':`token=${token}; Max-Age=7200;Secure;HttpOnly;path=/ SameSite:Strict`}
}