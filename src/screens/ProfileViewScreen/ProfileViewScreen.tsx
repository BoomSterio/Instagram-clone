import { Navbar, SafeAreaContainer } from 'components'
import { useUser } from 'providers'
import { StyleSheet } from 'react-native'
import { Header } from './components/Header'
import { Profile } from './components/Profile'

export const ProfileViewScreen = () => {
  const { userInfo } = useUser()

  return (
    <SafeAreaContainer>
      <Header username={userInfo?.username} />
      <Profile userInfo={userInfo} />
      <Navbar />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({})
