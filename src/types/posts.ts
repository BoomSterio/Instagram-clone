export interface Comment {
  id: string
  userId: string
  username: string
  message: string
}

export interface Post {
  id: string
  userId: string
  username: string
  imageUrl: string
  profileImageUrl: string
  caption?: string
  likes?: number
  comments?: Comment[]
  commentsCount: number
  likesByUsers?: string[]
}
