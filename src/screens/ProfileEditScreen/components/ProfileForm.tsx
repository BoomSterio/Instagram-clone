import React, { useContext, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as yup from 'yup'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { MAX_SYMBOLS_BIO, sections } from '../config'
import { TextInput, TextInputProps } from 'components'
import { useUser } from 'providers'
import Context from '../Context'
import { db } from 'config'
import { getErrorMessage } from 'utils'
import { useNavigation } from '@react-navigation/native'

interface ProfileState {
  name: string
  username: string
  bio: string
  phoneNumber: string
  email: string
}

export interface Field extends TextInputProps {
  id: keyof ProfileState
  label: string
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Element: React.FC = ({ children }) => {
  return <View style={styles.element}>{children}</View>
}

const TextInputRow = ({ id, label, touched, error, ...props }: Field) => {
  const hasError = Boolean(error && touched)
  const helperText = hasError ? error : null

  return (
    <Element>
      <View>
        <View style={styles.inputRow}>
          <Text style={styles.inputRowLabel}>{label}</Text>
          <TextInput {...props} placeholderTextColor={'#444'} />
        </View>
        {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      </View>
    </Element>
  )
}

export const ProfileForm = () => {
  const {setHandleSubmit} = useContext(Context)
  const { userInfo, userAuth } = useUser()
  const intl = useIntl()
  const navigation = useNavigation()

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .email()
        .required(intl.formatMessage({ id: 'messages.required' })),
      bio: yup
        .string()
        .max(MAX_SYMBOLS_BIO, intl.formatMessage({ id: 'messages.maxLength' }, { length: MAX_SYMBOLS_BIO })),
      username: yup
        .string()
        .matches(/^\S*$/, intl.formatMessage({ id: 'messages.space' }))
        .min(2, intl.formatMessage({ id: 'messages.minLength' }, { length: 2 }))
        .required(intl.formatMessage({ id: 'messages.required' })),
      phoneNumber: yup.string().matches(phoneRegExp, intl.formatMessage({ id: 'messages.phone' })),
    })
  }, [intl])

  const [initialValues] = useState<ProfileState>({
    email: '',
    username: '',
    name: '',
    bio: '',
    phoneNumber: '',
  })

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, setValues } = useFormik<ProfileState>({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (v) => {
      try {
        await db.collection('users').doc(userAuth?.uid).update(v)
        navigation.goBack()
      } catch (error) {
        alert(getErrorMessage(error))
      }
    },
  })

  useEffect(() => {
    setHandleSubmit(() => handleSubmit)
  }, [handleSubmit, setHandleSubmit])

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      email: userInfo?.email || '',
      username: userInfo?.username || '',
      name: userInfo?.name || '',
      bio: userInfo?.bio || '',
      phoneNumber: userInfo?.phoneNumber || '',
    }))
  }, [userInfo])

  return (
    <View>
      {sections.map(({ id, heading, fields }) => (
        <React.Fragment key={id}>
          {heading && (
            <Element>
              <Text style={styles.sectionHeading}>{heading}</Text>
            </Element>
          )}
          {fields.map(({ id: fieldId, ...field }) => (
            <TextInputRow
              key={fieldId}
              {...field}
              id={fieldId}
              style={styles.inputRowField}
              wrapperStyle={styles.inputRowFieldWrapper}
              value={values[fieldId]}
              onChangeText={handleChange(fieldId)}
              onBlur={handleBlur(fieldId)}
              error={errors[fieldId]}
              touched={touched[fieldId]}
            />
          ))}
        </React.Fragment>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  element: {
    justifyContent: 'center',
    minHeight: 60,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopColor: '#444',
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputRowLabel: {
    width: 90,
    color: '#fff',
    fontSize: 18,
    marginRight: 4,
  },
  inputRowField: {
    color: '#fff',
    fontSize: 18,
  },
  inputRowFieldWrapper: {},
  sectionHeading: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  helperText: {
    color: 'red',
    fontSize: 12,
  },
})
