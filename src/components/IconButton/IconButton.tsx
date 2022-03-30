import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageProps,
  TouchableOpacityProps,
  StyleProp,
  ImageStyle,
} from 'react-native'

interface IconButtonProps extends TouchableOpacityProps {
  icon: ImageSourcePropType | string
  imgProps?: ImageProps
  imgStyle?: StyleProp<ImageStyle>
}

export const IconButton = ({ icon, imgProps, imgStyle, ...props }: IconButtonProps) => {
  const source = typeof icon === 'string' ? { uri: icon } : icon

  return (
    <TouchableOpacity {...props}>
      <Image {...imgProps} style={imgStyle} source={source} />
    </TouchableOpacity>
  )
}
