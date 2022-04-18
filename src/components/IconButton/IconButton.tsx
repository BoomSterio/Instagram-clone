import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  ImageProps,
  TouchableOpacityProps,
  StyleProp,
  ImageStyle,
  StyleSheet,
  View,
  Text,
} from 'react-native'

interface IconButtonProps extends TouchableOpacityProps {
  icon: ImageSourcePropType | string
  imgProps?: ImageProps
  imgStyle?: StyleProp<ImageStyle>
  badgeNumber?: number
}

export const IconButton = ({ icon, imgProps, imgStyle, badgeNumber = 0, ...props }: IconButtonProps) => {
  const source = typeof icon === 'string' ? { uri: icon } : icon

  return (
    <TouchableOpacity {...props}>
      {badgeNumber > 0 ? (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeNumber}>{badgeNumber}</Text>
        </View>
      ) : null}
      <Image {...imgProps} style={imgStyle} source={source} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  unreadBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    left: 20,
    bottom: 18,
    width: 26,
    height: 19,
    borderRadius: 25,
    backgroundColor: '#FF3250',
  },
  unreadBadgeNumber: {
    color: 'white',
    fontWeight: '600',
  },
})
