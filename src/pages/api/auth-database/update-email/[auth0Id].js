// pages/api/auth-database/update-email/[email].js

import { updateUserEmail, getManagementApiToken } from '../account-methods'; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { auth0Id } = req.query;
  const newEmail = req.body.newEmail; // Assuming the new email is sent in the request body

  try {
    const accessToken = await getManagementApiToken();
    const userId = auth0Id; // Construct user ID as per your Auth0 user ID scheme
    const response = await updateUserEmail(userId, newEmail, accessToken);
  
    if (!response.ok) {
      console.error('Failed to update user email:', response);
      return res.status(500).json({ error: JSON.stringify(response) });
    }

    return res.status(200).json({ message: 'Email updated successfully' });

  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({ error: error.message });
  }
}