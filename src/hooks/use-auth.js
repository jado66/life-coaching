import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/auth0';

export const useAuth = () => useContext(AuthContext);

