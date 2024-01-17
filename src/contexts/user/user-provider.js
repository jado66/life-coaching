import { useEffect, useState } from 'react';
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
    deleteAccount: deleteUser,
    changeUserEmail
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

  const updateUserAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('file', file);
  
      const response = await fetch('/api/database/users/update-avatar', {
        method: 'POST',
        body: formData, // Send the form data with the file
      });
  
      const data = await response.json();
  
      if(response.ok){
        console.log("Avatar updated successfully:", data.message);

        setState((prevState) => {
          return {
            ...prevState,
            avatar: data.avatar,
          };
        });
      } else {
        console.error("Error updating user avatar:", data.message);
        alert("Error updating user avatar: " + data.message);
      }
  
    } catch (error) {
      console.error("Error updating user avatar:", error);
      alert("Error updating user avatar: " + error)
    }
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

  const deleteAccount = async () => {
    deleteUser(user.email)
    setState(null);
  }

  const loadUser = async () => {
    console.log("Loading User: " + JSON.stringify(authUser));

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

  const tryChangeUserEmail = async (newEmail) => {
    try{
      await changeUserEmail(user.email, newEmail)
      setState((prevState) => {
        return {
          ...prevState,
          email: newEmail,
          _id: newEmail
        };
      });

      // This needs to be done in the Auth Provider too

      return true;
    }
    catch(error){
      console.error("Error changing user email:", error);
      alert("Error changing user email: " + error)
      return false;
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
        deleteAccount,
        tryChangeUserEmail,
        updateUserAvatar
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


