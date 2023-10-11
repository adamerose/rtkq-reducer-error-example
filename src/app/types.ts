export interface User {
  email: string
  username: string
  bio: string
  image: string

  token: string
}

export interface UserLogin {
  user: {
    email: string
    password: string
  }
}
