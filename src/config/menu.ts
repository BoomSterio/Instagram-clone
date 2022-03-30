import {
  ActivityIcon,
  ActivitySelectedIcon,
  AddIcon,
  AddSelectedIcon,
  HomeIcon,
  HomeSelectedIcon,
  ProfileIcon,
  ProfileSelectedIcon,
  SearchIcon,
  SearchSelectedIcon,
} from 'assets'
import { ImageSourcePropType } from 'react-native'

export enum NavTab {
  Home = 'Home',
  Search = 'Search',
  Add = 'Add',
  Activity = 'Activity',
  Profile = 'Profile',
}

export interface MenuItem {
  name: NavTab
  selectedIcon: ImageSourcePropType | string
  icon: ImageSourcePropType | string
}

export const navbarTabs: MenuItem[] = [
  {
    name: NavTab.Home,
    selectedIcon: HomeSelectedIcon,
    icon: HomeIcon,
  },
  {
    name: NavTab.Search,
    selectedIcon: SearchSelectedIcon,
    icon: SearchIcon,
  },
  {
    name: NavTab.Add,
    selectedIcon: AddSelectedIcon,
    icon: AddIcon,
  },
  {
    name: NavTab.Activity,
    selectedIcon: ActivitySelectedIcon,
    icon: ActivityIcon,
  },
  {
    name: NavTab.Profile,
    selectedIcon: ProfileSelectedIcon,
    icon: ProfileIcon,
  },
]
