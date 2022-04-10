import { useEffect, useState } from "react"
import { Post } from "types"
import { db } from "../../firebase"

export const usePosts = () => {
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    return db.collectionGroup('posts').onSnapshot((snapshot) => {
      const posts: Post[] = snapshot.docs.map((doc) => {
        const { userId, caption, imageUrl, username, likes, likesByUsers, comments, commentsCount, profileImageUrl } =
          doc.data()
        return {
          id: doc.id,
          userId,
          caption,
          imageUrl,
          username,
          likes,
          likesByUsers,
          comments,
          commentsCount,
          profileImageUrl,
        }
      })
      setData(posts)
    })
  }, [])

  return data
}