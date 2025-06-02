import jwt from "jsonwebtoken"



const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!



export function createAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1m" })
}

export function createRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "5m" })
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

export function findErrorInUsernameInputField (username: string): string {
  if (username.length > 20) return "The username is too long."
  if (/[^A-Za-z0-9-_]/g.test(username)) return "The username can only contain letters, numbers, dashes, and underscores."
  return ""
}

export function findErrorInEmailInputField (email: string): string {
  if (email.length > 50) return "The email address is too long."
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "The email address is incorrect."
  return ""
}

export function findErrorInPasswordInputField (password: string): string {
  if (password.length > 250) return "The password is too long."
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) return "Use a strong password that contains at least 8 characters, at least one lowercase letter, at least one uppercase letter, at least one number, at least one special character."
  return ""
}
