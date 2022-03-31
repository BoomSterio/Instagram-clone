import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'

interface TextInputProps extends NativeTextInputProps {
  error?: string
  touched?: boolean
  containerStyle?: StyleProp<ViewStyle>
}

export const TextInput = ({ error, touched, containerStyle, ...props }: TextInputProps) => {
  const hasError = Boolean(error && touched)
  const helperText = hasError ? error : null

  return (
    <View>
      <View style={[styles.input(hasError), containerStyle]}>
        <NativeTextInput {...props} />
      </View>
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
    borderBottomWidth: 1,
    borderColor: error ? 'red' : 'transparent',
    padding: 4,
  }),
  helperText: {
    color: 'red',
    fontSize: 10,
  },
})
