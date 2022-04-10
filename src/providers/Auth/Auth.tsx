import { SignedInStack, SignedOutStack } from 'providers/Navigation/Navigation'
import { useUser } from '../User'

export const Auth = () => {
  const {userAuth} = useUser()

  return userAuth ? <SignedInStack /> : <SignedOutStack />
}