import { StyleSheet, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

interface ProfilePictureProps {
  imageUrl: string
  diameter: number
}

export const ProfilePicture = ({ imageUrl, diameter }: ProfilePictureProps) => {
  const imageDiameter = diameter - diameter * 0.085
  const gapDiameter = diameter / 25

  return (
    <LinearGradient
      colors={['#CA1D7E', '#E35157', '#F2703F']}
      start={{ x: 0.0, y: 1.0 }}
      end={{ x: 1.0, y: 1.0 }}
      style={{ ...styles.userImageGradient, width: diameter, height: diameter, borderRadius: diameter / 2 }}
    >
      <Image
        source={{ uri: imageUrl }}
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
