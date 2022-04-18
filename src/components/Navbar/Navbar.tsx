import { useNavigation, useRoute } from '@react-navigation/native'
import { IconButton, ProfilePicture } from 'components'
import { navbarTabs, NavTab, NavigationProps } from 'config'
import { ImageStyle, Pressable, StyleSheet, View, ViewStyle } from 'react-native'

export const Navbar = () => {
  const navigation = useNavigation<NavigationProps>()
  const { name: routeName } = useRoute()

  const handleRedirect = (newRoute?: NavTab) => () => {
    if (!newRoute) {
      return
    }

    navigation.push(newRoute)
  }

  return (
    <View style={styles.container}>
      {navbarTabs.map(({ name, path, selectedIcon, icon }) => {
        const currentIcon = routeName === name ? selectedIcon : icon

        if (name === NavTab.Profile) {
          return (
            <Pressable key={name} onPress={handleRedirect(path)}>
              <ProfilePicture
                gradientType={routeName === NavTab.Profile ? 'selected' : 'transparent'}
                diameter={32}
                imageUrl={currentIcon as string}
              />
            </Pressable>
          )
        }

        return (
          <IconButton
            imgStyle={styles.icon}
            key={name}
            icon={currentIcon}
            onPress={handleRedirect(path)}
          />
        )
      })}
    </View>
  )
}

interface Style {
  container: ViewStyle
  icon: ImageStyle
  profilePic: any
}

const styles = StyleSheet.create<Style>({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#000',
    height: 50,
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  profilePic: (activeTab?: NavTab) => ({
    borderWidth: 2,
    borderColor: activeTab === NavTab.Profile ? '#fff' : 'transparent',
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  }),
})
