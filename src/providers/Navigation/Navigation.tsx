import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { NavTab, signInRoutes } from 'config'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavTab.Home} screenOptions={screenOptions}>
        {signInRoutes.map((route) => (
          <Stack.Screen key={route.name} name={route.name} component={route.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
