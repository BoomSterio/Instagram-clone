import { SignedInStack, SignedOutStack } from 'providers/Navigation/Navigation'
import { useUser } from 'providers'

export const Auth = () => {
  const currentUser = useUser()

  return currentUser ? <SignedInStack /> : <SignedOutStack />
}