// pages/api/auth-database/delete-account/[email].js

import { deleteAccount, getManagementApiToken } from '../account-methods'; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { auth0Id } = req.query;

  try {
    const accessToken = await getManagementApiToken();
    const userId = auth0Id; // Construct user ID as per your Auth0 user ID scheme

    const response = await deleteAccount(userId, accessToken);

    if (!response.ok) {
      console.error('Failed to delete account:', response);
      return res.status(500).json({ error: error.message });
    }

    if (response.status === 404) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    if (response.status === 204) {
      console.log('User deleted successfully');
      return res.status(200).json({ message: 'User deleted successfully' });
    }

    return res.status(response.status).json({ error: 'Unknown error' });

  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ error: error.message });
  }
}