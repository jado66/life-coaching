import { createContext } from 'react';
import { defaultUser } from './user-context';

export const UserContext = createContext({
  ...defaultUser
});
