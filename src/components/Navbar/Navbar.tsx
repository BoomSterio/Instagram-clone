import { IconButton } from 'components/IconButton/IconButton'
import { navbarTabs, NavTab } from 'config'
import { useState } from 'react'
import { ImageStyle, StyleSheet, View, ViewStyle } from 'react-native'

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.Home)

  return (
    <View style={styles.container}>
      {navbarTabs.map(({ name, selectedIcon, icon }) => {
        const currentIcon = activeTab === name ? selectedIcon : icon

        return (
          <IconButton
            style={[
              name === NavTab.Profile ? styles.profilePic() : null,
              name === NavTab.Profile && activeTab === NavTab.Profile ? styles.profilePic(activeTab) : null,
            ]}
            imgStyle={[
              styles.icon,
              name === NavTab.Profile ? styles.profilePic() : null,
            ]}
            key={name}
            icon={currentIcon}
            onPress={() => setActiveTab(name)}
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
    alignItems: 'center',
    justifyContent: 'center',
  }),
})
