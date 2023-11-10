import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext, defaultUser } from './user-context';
import { useAuth } from 'src/hooks/use-auth';
import { createNewUser } from './create-new-user';

export const UserProvider = (props) => {
  const { children } = props;
  const [state, setState] = useState(null);

  const { user } = useAuth();

  // Grab user from MongoDB
  useEffect(() => {
    if (user) {

      // get from MongoDB
      const isUserFound = false;

      if (!isUserFound) {
        // create user in MongoDB
        const newUser = createNewUser(user)
        console.log("New User: "+ JSON.stringify(newUser))
        setState({user: newUser});
      }
      else{
        // set user from MongoDB
      }
    }
  }, [user]);

  const handleUpdate = useCallback((user) => {
    setState((prevState) => {
      return {
        ...prevState,
        ...user,
      };
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
       handleUpdate
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
