import { ReactNode } from "react";
import { HomeScreen } from "screens";

export enum NavTab {
  Home = 'Home',
  NewPost = 'NewPost',
  Search = 'Search',
  Add = 'Add',
  Activity = 'Activity',
  Profile = 'Profile',
}

interface Route {
  name: string,
  component: ReactNode
}

export const signInRoutes: Route[] = [
  {
    name: NavTab.Home,
    component: HomeScreen
  },
  {
    name: NavTab.Home,
    component: HomeScreen
  },
]

export const unsignedRoutes: Route[] = []