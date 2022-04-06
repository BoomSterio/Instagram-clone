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

interface LogInState {
  login: string
  password: string
}

export const LogInForm = () => {
  const navigation = useNavigation<NavigationProps>()
  const intl = useIntl()

  const handleLogin = async (email: string, password: string) => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      console.log('Successfully logged in!!!')
    } catch (err: any) {
      const message = err instanceof Error ? err.message : String(err)

      Alert.alert(err.message)
    }
  }

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      login: yup
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
    login: '',
    password: '',
  })

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, isValid } = useFormik<LogInState>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (v) => {
      console.log(v)
    },
  })

  return (
    <View>
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.login && touched.login))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Phone number, username or email"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
        autoFocus
        keyboardType="email-address"
        textContentType="emailAddress"
        value={values.login}
        onChangeText={handleChange('login')}
        onBlur={handleBlur('login')}
        error={errors.login}
        touched={touched.login}
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
      <Button style={styles.button(isValid)} title="Log in" onPress={() => handleSubmit()} disabled={!isValid} />
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
