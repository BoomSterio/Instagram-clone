import { useContext } from 'react';
import Context from './Context';
export { default } from './Provider';

export function useUser() {
  return useContext(Context);
}
