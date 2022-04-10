import { useNavigation } from '@react-navigation/native'
import { Button, TextInput } from 'components'
import { NavigationProps, NavTab, auth, db } from 'config'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getErrorMessage, getRandomPicture } from 'utils'
import * as yup from 'yup'

interface SignUpState {
  email: string
  username: string
  password: string
}

export const SignUpForm = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false)

  const navigation = useNavigation<NavigationProps>()
  const intl = useIntl()

  const handleSignin = async (username: string, email: string, password: string) => {
    try {
      setIsAuthorizing(true)

      const response = await auth.createUserWithEmailAndPassword(email, password)

      db.collection('users')
        .doc(response.user?.uid)
        .set({
          userId: response.user?.uid,
          username,
          email,
          profilePicture: await getRandomPicture(),
        })
    } catch (err) {
      Alert.alert('Auth error 💀', getErrorMessage(err))
    } finally {
      setIsAuthorizing(false)
    }
  }

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .email()
        .required(intl.formatMessage({ id: 'messages.required' })),
      username: yup
        .string()
        .min(2, intl.formatMessage({ id: 'messages.minLength' }, { length: 2 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
      password: yup
        .string()
        .min(8, intl.formatMessage({ id: 'messages.minLength' }, { length: 8 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
    })
  }, [intl])

  const [initialValues] = useState<SignUpState>({
    email: '',
    username: '',
    password: '',
  })

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isValid } = useFormik<SignUpState>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (v) => {
      handleSignin(v.username, v.email, v.password)
    },
  })

  return (
    <View>
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.email && touched.email))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Email"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
      />
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.username && touched.username))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Username"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
        autoCompleteType={'username'}
        autoCorrect={false}
        value={values.username}
        onChangeText={handleChange('username')}
        onBlur={handleBlur('username')}
        error={errors.username}
        touched={touched.username}
      />
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.password && touched.password))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Password"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        textContentType="password"
        keyboardType="default"
        value={values.password}
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        error={errors.password}
        touched={touched.password}
      />
      <Button
        style={styles.button(isValid)}
        title="Sign up"
        onPress={() => handleSubmit()}
        disabled={!isValid || isAuthorizing}
      />
      <View style={styles.logInContainer}>
        <Text style={{ color: '#000' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push(NavTab.LogIn)}>
          <Text style={{ color: '#03a1fc' }}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create<any>({
  inputField: (error?: boolean) => ({
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: error ? 'red' : '#cfcfcf',
  }),
  button: (isValid: boolean) => ({
    backgroundColor: isValid ? '#03a1fc' : '#9ACAF7',
    marginTop: 20,
  }),
  logInContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
  },
})
