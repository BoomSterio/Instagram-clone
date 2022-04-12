export interface Comment {
  userId: string
  username: string
  message: string
  likesByUsers?: string[]
}

export interface PostData {
  userId: string
  username: string
  imageUrl: string
  profileImageUrl?: string
  caption?: string
  likes?: number
  comments?: Comment[]
  commentsCount: number
  likesByUsers?: string[]
  createdAt: Date
}

export interface Post extends PostData {
  id: string
}
