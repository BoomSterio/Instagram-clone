import { useNavigation } from '@react-navigation/native'
import { Button, TextInput } from 'components'
import { NavigationProps, NavTab } from 'config'
import { useFormik } from 'formik'
import { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as yup from 'yup'

interface SignUpState {
  email: string
  username: string
  password: string
}

export const SignUpForm = () => {
  const navigation = useNavigation<NavigationProps>()
  const intl = useIntl()

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
      console.log(v)
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
        value={values.email}
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        error={errors.email}
        touched={touched.email}
      />
      <TextInput
        containerStyle={styles.inputField(Boolean(errors.username && touched.username))}
        wrapperStyle={{ marginBottom: 10 }}
        placeholder="Enter username"
        placeholderTextColor={'#444'}
        autoCapitalize="none"
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
      <Button style={styles.button(isValid)} title="Sign up" onPress={() => handleSubmit()} disabled={!isValid} />
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
