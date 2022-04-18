import { StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { UserPlaceholderImage } from 'assets'

type GradientType = 'primary' | 'secondary'

interface ProfilePictureProps {
  imageUrl?: string
  diameter: number
  hideGradient?: boolean
  gradientType?: GradientType
}

const gradients = {
  primary: ['#CA1D7E', '#E35157', '#F2963f'],
  secondary: ['grey', 'grey'],
  transparent: ['transparent', 'transparent'],
}

export const ProfilePicture = ({
  imageUrl,
  diameter,
  hideGradient = false,
  gradientType = 'primary',
}: ProfilePictureProps) => {
  const imageDiameter = diameter - diameter * 0.065
  const gapDiameter = diameter / 25

  return (
    <LinearGradient
      colors={hideGradient ? gradients.transparent : gradients[gradientType]}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{ ...styles.userImageGradient, width: diameter, height: diameter, borderRadius: diameter / 2 }}
    >
      <Image
        source={{ uri: imageUrl || UserPlaceholderImage }}
        style={{
          borderColor: 'black',
          borderWidth: gapDiameter,
          width: imageDiameter,
          height: imageDiameter,
          borderRadius: imageDiameter / 2,
        }}
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  userImageGradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
