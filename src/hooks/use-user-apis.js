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

    const deleteUser = async (email) => {
        try {
            const response = await fetch(`/api/database/users/${email}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

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
        fetchUser,
        updateUser,
        deleteUser,
    };
};

export default useUserApis;
