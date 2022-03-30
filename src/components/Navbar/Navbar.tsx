import { IconButton } from 'components/IconButton/IconButton'
import { navbarTabs, NavTab } from 'config'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState<NavTab>(NavTab.Home)

  return (
    <View style={styles.container}>
      {navbarTabs.map(({ name, selectedIcon, icon }) => {
        const currentIcon = activeTab === name ? selectedIcon : icon

        return <IconButton imgStyle={styles.icon} key={name} icon={currentIcon} onPress={() => setActiveTab(name)} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
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
})
