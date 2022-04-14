import {
  ActivityIcon,
  ActivitySelectedIcon,
  AddIcon,
  AddSelectedIcon,
  HomeIcon,
  HomeSelectedIcon,
  SearchIcon,
  SearchSelectedIcon,
} from 'assets'
import { ImageSourcePropType } from 'react-native'
import { NavTab } from './routes'

export interface MenuItem {
  name: NavTab
  selectedIcon: ImageSourcePropType | string
  icon: ImageSourcePropType | string
  path?: NavTab
}

export const navbarTabs: MenuItem[] = [
  {
    name: NavTab.Home,
    path: NavTab.Home,
    selectedIcon: HomeSelectedIcon,
    icon: HomeIcon,
  },
  {
    name: NavTab.Search,
    selectedIcon: SearchSelectedIcon,
    icon: SearchIcon,
  },
  {
    name: NavTab.NewPost,
    path: NavTab.NewPost,
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
    selectedIcon:
      'https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fd0d5f2cc3c6b0f369b77a6c429499887.959x959x1.jpg',
    icon: 'https://t2.genius.com/unsafe/409x409/https%3A%2F%2Fimages.genius.com%2Fd0d5f2cc3c6b0f369b77a6c429499887.959x959x1.jpg',
  },
]
