import { useNavigation } from '@react-navigation/native'
import { NavigationProps, NavTab } from 'config'
import { Button, TextInput } from 'components'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as yup from 'yup'
import { auth } from '../../../../firebase'
import { getErrorMessage } from 'utils'

interface LogInState {
  email: string
  password: string
}

export const LogInForm = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false)

  const navigation = useNavigation<NavigationProps>()
  const intl = useIntl()

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsAuthorizing(true)
      const response = await auth.signInWithEmailAndPassword(email, password)
    } catch (err) {
      Alert.alert(
        'Auth error 💀',
        getErrorMessage(err) + '\n\nWhat would you like to do next?',
        [
          {
            text: 'Try again',
            style: 'cancel'
          },
          {
            text: 'Sign Up',
            onPress: () => navigation.push(NavTab.SignUp)
          },
        ]
      )
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
      password: yup
        .string()
        .min(8, intl.formatMessage({ id: 'messages.minLength' }, { length: 8 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
    })
  }, [intl])

  const [initialValues] = useState<LogInState>({
    email: '',
    password: '',
  })

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isValid } = useFormik<LogInState>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (v) => {
      handleLogin(v.email, v.password)
    },
  })

  return (
    <View>
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.email && touched.email))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Phone number, username or email"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
        autoCompleteType='email'
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
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
      <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
        <Text style={{ color: '#03a1fc' }}>Forgor password? 💀</Text>
      </View>
      <Button
        style={styles.button(isValid)}
        title="Log in"
        onPress={() => handleSubmit()}
        disabled={!isValid || isAuthorizing}
      />
      <View style={styles.signUpContainer}>
        <Text style={{ color: '#000' }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push(NavTab.SignUp)}>
          <Text style={{ color: '#03a1fc' }}>Sign Up</Text>
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
  }),
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: '100%',
    justifyContent: 'center',
  },
})
