import { ComponentType } from 'react'
import { HomeScreen, LogInScreen, NewPostScreen, ProfileEditScreen, ProfileViewScreen, SignUpScreen } from 'screens'
import { StackNavigationProp } from '@react-navigation/stack'

export enum NavTab {
  Home = 'Home',
  NewPost = 'NewPost',
  Search = 'Search',
  Activity = 'Activity',
  ProfileView = 'ProfileView',
  ProfileEdit = 'ProfileEdit',
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
  ProfileView: undefined
  ProfileEdit: undefined
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
    name: NavTab.ProfileView,
    component: ProfileViewScreen,
  },
  {
    name: NavTab.ProfileEdit,
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
