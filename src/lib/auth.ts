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
  if (username && username.length < 5) return "The username is too short."
  if (username.length > 25) return "The username is too long."
  if (/[^A-Za-z0-9_]/g.test(username)) return "The username can only contain letters, numbers, and underscores."
  return username ? "" : "The username was not received."
}

export function findErrorInEmailInputField (email: string): string {
  if (email.length > 50) return "The email address is too long."
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return "The email address is incorrect."
  return email ? "" : "The email address was not received."
}

export function findErrorInPasswordInputField (password: string): string {
  if (password && password.length < 8) return "The password must be at least 8 characters long."
  if (password.length > 250) return "The password is too long."
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) return "Use a strong password that contains at least the following: 8 characters, one lowercase letter, one uppercase letter, one number, one special character."
  return password ? "" : "The password was not received."
}
