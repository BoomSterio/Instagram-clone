import { Button, TextInput } from 'components'
import { useFormik } from 'formik'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Image, StyleSheet, View } from 'react-native'
import * as yup from 'yup'
import Context from './Context'

const PLACEHOLDER_IMG =
  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='

interface CaptionFormState {
  caption: string
}

export const CaptionForm = () => {
  const { formState, setFormState, setHandleSubmit, handleConfirmStep } = useContext(Context)
  // const { userAuth, userInfo } = useUser()

  // const uploadPost = (v: CaptionFormState) => {
  //   const { imageUrl, caption } = v
  //   db.collection('users')
  //     .doc(userAuth?.uid)
  //     .collection('posts')
  //     .add({
  //       userId: userAuth?.uid,
  //       imageUrl,
  //       caption,
  //       profileImageUrl: userInfo?.profilePicture,
  //       likes: 0,
  //       commentsCount: 0,
  //       likesByUsers: [],
  //       username: userInfo?.username,
  //       createdAt: moment().toISOString(),
  //     })
  //     .then(() => navigation.goBack())
  // }

  const intl = useIntl()

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      caption: yup
        .string()
        .max(1200, intl.formatMessage({ id: 'messages.maxLength' }, { length: 2000 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
    })
  }, [intl])

  const defaultValues: CaptionFormState = {
    caption: formState.caption || '',
  }

  const [initialValues] = useState(defaultValues)

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isValid } = useFormik<CaptionFormState>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (v) => {
      const value = {
        ...formState,
        ...v
      }
      setFormState(value)
      handleConfirmStep()
    },
  })

  useEffect(() => {
    setHandleSubmit(() => handleSubmit)
  }, [handleSubmit, setHandleSubmit])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.image}
          source={{ uri: formState.image ? 'data:image/jpeg;base64,' + formState.image : PLACEHOLDER_IMG }}
        />
        <TextInput
          style={styles.textInput}
          wrapperStyle={{flexShrink: 1}}
          placeholder="Describe your post..."
          placeholderTextColor={'gray'}
          multiline
          value={values.caption}
          onChangeText={handleChange('caption')}
          onBlur={handleBlur('caption')}
          error={errors.caption}
          touched={touched.caption}
          maxLength={1200}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 12,
  },
  textInput: {
    fontSize: 18,
    color: '#fff',
  },
})
