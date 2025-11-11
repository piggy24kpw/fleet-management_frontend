type User = {
    id?: string,
    username: string,
    organizaation: string,
    email: string,
    role: string
}

export interface UserListItem {
  id: number,
  username: string,
  organization: string,
  email: string,
  role: string
}

export interface UserDetails{
  id: number,
  username: string,
  organization: string,
  email: string,
  role: string,
  profileImage?: string,
  createdAt: Date,
  deletedAt?: Date

}