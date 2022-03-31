import { ComponentType } from 'react'
import { HomeScreen } from 'screens'
import { NewPostScreen } from 'screens/NewPostScreen/NewPostScreen'
import { StackNavigationProp } from '@react-navigation/stack'

export enum NavTab {
  Home = 'Home',
  NewPost = 'NewPost',
  Search = 'Search',
  Add = 'Add',
  Activity = 'Activity',
  Profile = 'Profile',
}

type StackParamList = {
  Home: undefined
  NewPost: undefined
}

export type NavigationProps = StackNavigationProp<StackParamList>

interface Route {
  name: string
  component: ComponentType
}

export const signInRoutes: Route[] = [
  {
    name: NavTab.Home,
    component: HomeScreen,
  },
  {
    name: NavTab.NewPost,
    component: NewPostScreen,
  },
]

export const unsignedRoutes: Route[] = []
