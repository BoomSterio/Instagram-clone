import { StyleSheet, Text, TextInput as NativeTextInput, TextInputProps as NativeTextInputProps, TextStyle, View } from 'react-native'

interface TextInputProps extends NativeTextInputProps {
  error?: string
  touched?: boolean
}

export const TextInput = ({ error, touched, ...props }: TextInputProps) => {
  const helperText = error && touched ? error : null
  return (
    <View>
      <NativeTextInput style={[styles.input(Boolean(error && touched))]} {...props} />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  )
}

interface Style {
  helperText: TextStyle
  input: any
}

const styles = StyleSheet.create<Style>({
  input: (error?: boolean) => ({
    borderRadius: 4,
    borderWidth: 2,
    borderColor: error ? 'red' : 'transparent',
    padding: 4,
  }),
  helperText: {
    color: 'red',
    fontSize: 10
  }
})
