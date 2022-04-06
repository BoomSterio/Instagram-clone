import { ComponentType } from 'react'
import { HomeScreen, LogInScreen, NewPostScreen, SignUpScreen } from 'screens'
import { StackNavigationProp } from '@react-navigation/stack'

export enum NavTab {
  Home = 'Home',
  NewPost = 'NewPost',
  Search = 'Search',
  Add = 'Add',
  Activity = 'Activity',
  Profile = 'Profile',
  LogIn = 'LogIn',
  SignUp = 'SignUp',
}

type StackParamList = {
  Home: undefined
  NewPost: undefined
  SignUp: undefined
  LogIn: undefined
}

export type NavigationProps = StackNavigationProp<StackParamList>

export interface Route {
  name: string
  component: ComponentType
}

export const signedInRoutes: Route[] = [
  {
    name: NavTab.Home,
    component: HomeScreen,
  },
  {
    name: NavTab.NewPost,
    component: NewPostScreen,
  },
]

export const signedOutRoutes: Route[] = [
  {
    name: NavTab.LogIn,
    component: LogInScreen,
  },
  {
    name: NavTab.SignUp,
    component: SignUpScreen,
  },
]
