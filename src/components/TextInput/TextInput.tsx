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

export interface TextInputProps extends NativeTextInputProps {
  error?: string
  touched?: boolean
  containerStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

export const TextInput = ({ error, touched, containerStyle, wrapperStyle, ...props }: TextInputProps) => {
  const hasError = Boolean(error && touched)
  const helperText = hasError ? error : null

  return (
    <View style={wrapperStyle}>
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
  input: (error?: boolean, editable?: boolean) => ({
    borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: error ? 'red' : 'transparent',
    padding: 4,
  }),
  helperText: {
    color: 'red',
    fontSize: 12,
  },
})
