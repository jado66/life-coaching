import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './user-context';
import { useAuth } from 'src/hooks/use-auth';
import { createNewUserObject } from './create-new-user-object';
import useUserApis from 'src/hooks/use-user-apis';

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setState] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: authUser } = useAuth();

  const { 
    createUser,
    fetchUser,
    updateUser,
    deleteUser: deleteUserFromMongoDB
  } = useUserApis();

  const updateUserByKey = (key, value) => {
    setState((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });

    // update in MongoDB
    updateUser(user.email, JSON.stringify({[key]: value}))
  }

  const createUserIfNotFound = async () => {
    try {
      const newUserObject = createNewUserObject(authUser);
      const createdUser = await createUser(newUserObject);
      console.log("Created User: " + JSON.stringify(createdUser));
      setState(createdUser);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle the error state here
    }
  };

  const deleteUser = async () => {
    deleteUserFromMongoDB(user.email)
    setState(null);
  }

  const loadUser = async () => {
    
    const loadedUser = await fetchUser(authUser.email);
    console.log("Loaded User: "+ JSON.stringify(loadedUser))
    
    if (loadedUser) {
      setState(loadedUser);
      setIsLoaded(true);
    }
    else{
      createUserIfNotFound()
    }
  }

  // Grab user from MongoDB
  useEffect(() => {
    if (authUser) {

      loadUser()
      // get from MongoDB
      
    }
  }, [authUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        streakDates: user?.streakDates,
        isLoaded,
        updateUserByKey,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


