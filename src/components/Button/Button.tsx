import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

interface ButtonProps extends PressableProps {
  title?: string
  style?: StyleProp<ViewStyle>
}

export const Button = ({ title = 'OK', style, disabled, ...props }: ButtonProps) => {
  return (
    <Pressable style={[style, styles.button]} {...props}>
      <Text style={{ color: disabled ? 'gray' : '#fff', ...styles.text }}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: 0.25,
  },
})
