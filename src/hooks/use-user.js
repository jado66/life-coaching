import { useContext } from 'react';
import { UserContext } from 'src/contexts/user';

export const useUser = () => useContext(UserContext);