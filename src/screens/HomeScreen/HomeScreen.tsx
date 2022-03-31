import { Navbar, SafeAreaContainer } from 'components'
import { ScrollView } from 'react-native'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Stories } from './components/Stories'

export const HomeScreen = () => {
  return (
    <SafeAreaContainer>
      <Header />
      <ScrollView>
        <Stories />
        <Posts />
      </ScrollView>
      <Navbar />
    </SafeAreaContainer>
  )
}
