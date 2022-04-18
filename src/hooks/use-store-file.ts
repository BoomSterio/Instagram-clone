import { getStorage, ref, getDownloadURL, uploadString } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { getErrorMessage } from 'utils'
import {decode as atob} from 'base-64'

export const useStoreFile = (file: string, fileName: string) => {
  const [downloadUrl, setDownloadUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const storeFile = async () => {
      try {
        const storage = getStorage()
        const storageRef = ref(storage, fileName)

        if (typeof global.atob === 'undefined') {
          global.atob = atob
        }

        uploadString(storageRef, file, 'base64', {contentType: 'image/jpeg'})
          .then(async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref)
            setDownloadUrl(encodeURIComponent(url))
            console.log(url)
          })
          .catch((err) => console.log(getErrorMessage(err)))

        // const uploadTask = uploadBytesResumable(storageRef, blob)

        // uploadTask.on(
        //   'state_changed',
        //   (snapshot) => {
        //     setProgress(snapshot.bytesTransferred / snapshot.totalBytes)
        //   },
        //   (err: StorageError) => {
        //     throw new Error(getErrorMessage(err))
        //   },
        //   async () => {
        //     const url = await getDownloadURL(uploadTask.snapshot.ref)
        //     setDownloadurl(url)
        //   },
        // )
      } catch (err) {
        setError(getErrorMessage(err))
      }
    }
    storeFile()
  }, [])

  return { downloadUrl, error }
}
