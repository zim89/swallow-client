export interface PublicUser {
  id: number
  email: string
  name: string
  avatar_url: string | null
  theme: string
  isVerified: boolean
}

export interface AuthDto {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: PublicUser
}
