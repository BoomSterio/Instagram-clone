type PictureSize = 'thumbnail' | 'medium' | 'large'

export const getRandomPicture = async (size: PictureSize = 'large') => {
  const response = await fetch('https://randomuser.me/api')
  const data = await response.json()
  return data?.results[0]?.picture[size]
}
