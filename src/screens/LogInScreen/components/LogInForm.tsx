import { Button, TextInput } from 'components'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const LogInForm = () => {
  return (
    <View>
      <TextInput
        containerStyle={styles.inputField}
        placeholder='Phone number, username or email'
        placeholderTextColor={'#444'}
        autoCapitalize='none'
        autoFocus
        keyboardType='email-address'
        textContentType='emailAddress'
      />
      <TextInput
        containerStyle={styles.inputField}
        placeholder='Password'
        placeholderTextColor={'#444'}
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        textContentType='password'
        keyboardType="default"
      />
      <View style={{alignItems: 'flex-end', marginBottom: 30}}>
        <Text style={{color: '#03a1fc'}}>Forgor password? 💀</Text>
      </View>
      <Button style={styles.button} title='Log in' onPress={() => {}} />
      <View style={styles.signUpContainer}>
        <Text style={{color: '#000'}}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={{color: '#03a1fc'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#cfcfcf'
  },
  button: {
    backgroundColor: '#03a1fc'
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 35,
    width: '100%',
    justifyContent: 'center',
  },
})