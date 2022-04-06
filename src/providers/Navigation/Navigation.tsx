import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { NavTab, signedInRoutes, signedOutRoutes, Route } from 'config'

const Stack = createStackNavigator()

const screenOptions = {
  headerShown: false,
}

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavTab.Home} screenOptions={screenOptions}>
        {signedInRoutes.map((route: Route) => (
          <Stack.Screen key={route.name} name={route.name} component={route.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavTab.SignUp} screenOptions={screenOptions}>
        {signedOutRoutes.map((route: Route) => (
          <Stack.Screen key={route.name} name={route.name} component={route.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
