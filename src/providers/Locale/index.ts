import { useContext } from 'react'
import Context from './Context'
export { default } from './Provider'

export function useLocale() {
  return useContext(Context)
}
