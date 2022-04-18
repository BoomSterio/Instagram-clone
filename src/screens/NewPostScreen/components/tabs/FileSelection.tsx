import { Button } from 'components'
import { useFormik } from 'formik'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Image, StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import * as ImagePicker from 'expo-image-picker'
import Context from '../Context'
import { getErrorMessage } from 'utils'

const PLACEHOLDER_IMG =
  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='

interface FileSelectionState {
  image: string
}

export const FileSelection = () => {
  const { formState, setFormState, setHandleSubmit, handleConfirmStep } = useContext(Context)

  const intl = useIntl()

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      image: yup.string().required(intl.formatMessage({ id: 'messages.required' })),
    })
  }, [intl])

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need gallery access permissions to make this work!')
      }
    }
    requestPermissions()
  }, [])

  const defaultValues: FileSelectionState = {
    image: formState.image || '',
  }

  const [initialValues] = useState(defaultValues)

  const { values, errors, touched, handleSubmit, setFieldValue, isValid } = useFormik<FileSelectionState>({
    initialValues,
    validationSchema,
    onSubmit: async (v) => {
      const value = {
        ...v,
        image: v.image,
      }
      setFormState(value)
      handleConfirmStep()
    },
  })

  useEffect(() => {
    setHandleSubmit(() => handleSubmit)
  }, [handleSubmit, setHandleSubmit])

  useEffect(() => {
    if (errors.image && touched.image) {
      alert('image: ' + errors.image)
    }
  }, [errors, touched])

  const selectFile = async () => {
    try {
      const { base64 } = (await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      })) as ImagePicker.ImageInfo
      setFieldValue('image', base64 ? 'data:image/jpeg;base64,' + base64 : '')
    } catch (err) {
      alert(getErrorMessage(err))
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={[styles.image, { resizeMode: values.image ? 'contain' : 'cover' }]}
          source={{ uri: values.image ? values.image : PLACEHOLDER_IMG }}
        />
      </View>
      <Button textStyle={styles.buttonTitle} title="Press to select media..." onPress={selectFile} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  imageWrapper: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonTitle: {
    color: '#03a1fc',
  },
})
