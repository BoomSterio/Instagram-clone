import React from 'react';
import { User } from './Provider';

const defaultValue: User = null;

export const Context = React.createContext<User>(defaultValue);

export default Context;