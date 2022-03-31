import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Image, StyleSheet, TextInput, View } from 'react-native'
import * as yup from 'yup'

const PLACEHOLDER_IMG = 'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc='

interface AddPostState {
  caption: string;
  imageUrl: string;
}

export const AddPostForm = () => {
  const intl = useIntl();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      caption: yup
        .string()
        .max(2000, intl.formatMessage({ id: 'messages.maxLength' }, { length: 2000 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
      imageUrl: yup.string().url().required(intl.formatMessage({ id: 'messages.required' })),
    });
  }, [intl]);

  const [initialValues] = useState({
    caption: '',
    imageUrl: PLACEHOLDER_IMG
  })

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    isValidating,
    setFieldValue,
    resetForm,
  } = useFormik<AddPostState>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {

    },
  });

  return (
    <View>
      <Image style={styles.image} source={{uri: values.imageUrl}} />
      <TextInput
        style={{color: '#fff'}}
        placeholder='Describe your post...'
        placeholderTextColor={'gray'}
        multiline
        value={values.caption}
        onChangeText={handleChange('caption')}
      />
      <TextInput
        style={{color: '#fff'}}
        placeholder='Enter image URL...'
        placeholderTextColor={'gray'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 120,
  }
})