import { Navbar, SafeAreaContainer } from 'components'
import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Header } from './components/Header'
import { PictureEdit } from './components/PictureEdit'
import { ProfileForm } from './components/ProfileForm'
import Context from './Context'

export const ProfileEditScreen = () => {
  const [handleSubmit, setHandleSubmit] = useState<(...args: any[]) => any>()

  const handleConfirm = () => {
    if (handleSubmit) {
      handleSubmit()
    }
  }

  return (
    <Context.Provider value={{handleConfirm, setHandleSubmit}}>
      <SafeAreaContainer>
        <Header />
        <Divider width={1} orientation={'vertical'} color="grey" />
        <ScrollView>
          <PictureEdit />
          <ProfileForm />
        </ScrollView>
        <Navbar />
      </SafeAreaContainer>
    </Context.Provider>
  )
}

const styles = StyleSheet.create({})
