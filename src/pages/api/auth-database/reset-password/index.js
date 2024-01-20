import { initiatePasswordReset, getManagementApiToken } from "../account-methods";

export default async function changePassword(req, res) {
    try {
        const { email, connection } = req.body;
        
        // Here you would call Auth0's API to send a password change request.
        // Make sure to handle the logic to obtain the Management API token securely
        const accessToken = await getManagementApiToken();
        const response = await initiatePasswordReset(email, connection, accessToken);  

        if (!response.ok) {
            console.error('Failed to initiate password reset:', response);
            return res.status(500).json({ response: JSON.stringify(response) });
        }

        if (response.status === 404) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        if (response.status === 204) {
            console.log('Password change email sent.');
        }

        return res.status(200).json({ message: 'Password change email sent.' });
    } 
    catch (error) {
        
        // Re-throw the error for further handling if necessary
        return res.status(error.status || 500).json({ error: JSON.stringify(error) });
    }
   
  }