import { useEffect } from 'react';

const useUserApis = () => {
    const createUser = async (userData) => {
        try {
            const response = await fetch('/api/database/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) {
                // If the response has a status code indicating an error,
                // throw an error that includes the status text.
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            // Improved error logging with more context.
            console.error('Error creating user:', error.message || error);
            // Optionally re-throw the error if you want calling code to handle it.
            throw error; 
        }
    };

    const fetchUser = async (email) => {
        try {
            const response = await fetch(`/api/database/users/${email}`);
            
            // Check if the user was found (status code 200)
            if (response.ok) {
                const data = await response.json();
                console.log('User fetched successfully:', data);
                return data;
            } else {
                console.log('User does not exist or could not be fetched');
                return null;
            }
    
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };
    

    const updateUser = async (email, userData) => {
        try {
            const response = await fetch(`/api/database/users/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    };

    const deleteUserFromAuth0 = async (auth0Id) => {
        try {
            const response = await fetch(`/api/auth-database/delete-account/${auth0Id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    const deleteUser = async (email, auth0Id, isChangingEmail = false) => {
        try {
            const response = await fetch(`/api/database/users/${email}`, {
                method: 'DELETE',
            });
            
            const data = await response.json();
            
            if (!isChangingEmail) {
                await deleteUserFromAuth0(auth0Id);
            }

            return data;
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const changeUserEmailInAuth0 = async (newEmail, auth0Id) => {
        try {
            const response = await fetch(`/api/auth-database/update-email/${auth0Id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({newEmail}),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating user email:', error);
        }
    }

    const changeUserEmail = async (oldEmail, newEmail, auth0Id) => {
        // check and see if new email is already taken
        
        if (!auth0Id) {
            throw new Error('Auth0 ID is required');
        }
        
        const user = await fetchUser(newEmail);

        if (user) {
            throw new Error('Email is already taken');
        }

        // clone old user
        const oldUser = await fetchUser(oldEmail);
        const newUser = {...oldUser};

        // delete old user
        await deleteUser(oldEmail, auth0Id, true);

        // update email
        newUser.email = newEmail;
        newUser._id = newEmail;

        // update in Auth0
        await changeUserEmailInAuth0(newEmail, auth0Id);

        console.log("New User: " + JSON.stringify(newUser));

        // create new user
        await createUser(newUser);
    }      

    useEffect(() => {
        // Additional logic or side effects can be added here
        // This will run when the component using this hook mounts
        return () => {
            // Additional cleanup logic can be added here
            // This will run when the component using this hook unmounts
        };
    }, []);

    return {
        createUser,
        changeUserEmail,
        fetchUser,
        updateUser,
        deleteUser,
    };
};

export default useUserApis;
