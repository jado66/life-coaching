import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './user-context';
import { useAuth } from 'src/hooks/use-auth';
import { createNewUserObject } from './create-new-user-object';
import useUserApis from 'src/hooks/use-user-apis';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setState] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { user: authUser } = useAuth();

  const auth = useAuth();

  const { 
    createUser,
    fetchUser,
    updateUser,
    deleteUser,
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

  const sendResetPasswordEmail = async () => {
    try{
      await fetch('/api/auth-database/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          email: user.email,
          connection: 'Username-Password-Authentication'
        })
      });

      if (!response.ok) {
        console.error('Failed to initiate password reset:', response);
        return res.status(500).json({ error: error.message });
      }

      toast.success("Reset password email sent successfully. Please check your inbox.");
    }
    catch(error){
      console.error("Error sending reset password email:", error);
      alert("Error sending reset password email: " + error)
    }
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

  const deleteUserAccount = async () => {
    try{
      await deleteUser(user.email, user.auth0Id)
      setState(null);

      // nextjs redirect to home page
      await auth.logout();
    }
    catch(error){
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error)
    }
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
      await changeUserEmail(user.email, newEmail, user.auth0Id)
      setState((prevState) => {
        return {
          ...prevState,
          email: newEmail,
          _id: newEmail
        };
      });

      toast.success("Email changed successfully");

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

  // if (authUser) {
  //   console.log(Object.keys(authUser))
  // }


  return (
    <UserContext.Provider
      value={{
        user,
        streakDates: user?.streakDates,
        isLoaded,
        updateUserByKey,
        deleteUserAccount,
        tryChangeUserEmail,
        updateUserAvatar,
        sendResetPasswordEmail
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


