import { useEffect, useState } from 'react'
import { PostData, Post } from 'types'
import { db } from 'config'

export const usePosts = () => {
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    return db.collectionGroup('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
      const posts: Post[] = snapshot.docs.map((doc) => {
        const postData = doc.data() as PostData
        return {
          id: doc.id,
          ...postData
        }
      })
      setData(posts)
    })
  }, [])

  return data
}
