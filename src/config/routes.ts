import { ComponentType } from 'react'
import { HomeScreen, LogInScreen, NewPostScreen, ProfileEditScreen, SignUpScreen } from 'screens'
import { StackNavigationProp } from '@react-navigation/stack'

export enum NavTab {
  Home = 'Home',
  NewPost = 'NewPost',
  Search = 'Search',
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
  Search: undefined
  Activity: undefined
  Profile: undefined
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
  {
    name: NavTab.Profile,
    component: ProfileEditScreen,
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
