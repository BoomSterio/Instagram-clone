import { useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { getErrorMessage } from 'utils'

const defaultOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 1,
  base64: true,
}

type PickerResult = ImagePicker.ImagePickerResult | ImagePicker.ImagePickerMultipleResult

export const useFilePicker = (options = defaultOptions) => {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need gallery access permissions to make this work!')
      }
    }
    requestPermissions()
  }, [])

  return async () => {
    try {
      return ImagePicker.launchImageLibraryAsync(options) as Promise<
        ImagePicker.ExpandImagePickerResult<ImagePicker.ImagePickerOptions>
      >
    } catch (err) {
      alert(getErrorMessage(err))
    }
  }
}
