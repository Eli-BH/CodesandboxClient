import { hash, compare } from 'bcryptjs'

export async function hashPassword(password: string): Promise<String> {
    const hashedPassword = await hash(password, 12);
    return hashedPassword
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<Boolean> {
    const valid = await compare(password, hashedPassword);
    return valid
}