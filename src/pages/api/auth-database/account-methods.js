async function updateUserEmail(userId, newEmail, accessToken) {
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newEmail,
          verify_email: false // Optionally send a verification email to the user
        })
      });
  
      // Check if the request was unsuccessful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to update user email:', error);
      throw error;
    }
  }

async function deleteAccount(userId, accessToken) {
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      // Check if the request was unsuccessful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      return response
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  }

async function getManagementApiToken() {
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grant_type: 'client_credentials',
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: process.env.AUTH0_AUDIENCE
        })
      });
  
      if (response.status === 400) {
        console.error('Bad Request Error Occurred:');
        console.error(`Status Code: ${response.status}`);
        console.error(`Status Text: ${response.statusText}`);
        
        // Check if you can access the response body for more details of the error
        try {
            // Assuming the 'response' is an instance of the Response object we get from fetch()
            response.json().then((responseBody) => {
                console.error(`Response Body:`, responseBody);
            }).catch((error) => {
                console.error('Could not parse response body:', error.message);
            });
        } catch (error) {
            console.error('Could not retrieve response body:', error.message);
        }
      }

      // Check if the request was unsuccessful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      
      console.log('Successfully obtained Management API Token'+ data.access_token);

      return data.access_token;
    } catch (error) {
      console.error('Error obtaining Management API Token:', error);
      throw error;
    }
  }

  async function initiatePasswordReset(email, connection, accessToken) {
    try {

      const requestUrl = `https://${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/dbconnections/change_password`;
      console.log("Request URL:", requestUrl);

      const requestBody = {
        client_id: process.env.AUTH0_CLIENT_ID,
        email: email,
        connection: connection, // Replace with your actual connection name
      };
      console.log("Request Body:", requestBody);

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      console.log("Response from initiatePasswordReset:", response)

     // Check if the request was unsuccessful
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      console.error('Error initiating password reset:', error);

      // Check if there are additional details in the error object and log them
      if (error.response) {
          console.error(`HTTP Status: ${error.response.status}`);
          console.error('Response Headers:', JSON.stringify(error.response.headers, null, 2));
          console.error('Response Body:', JSON.stringify(error.response.data, null, 2));
      }

      if (error.request) {
          console.error('Request was made but no response was received');
          console.error('Request:', error.request);
      } else {
          console.error('An error occurred before a request could be made or after a response was received');
      }
      
      // Log the error message and stack trace
      console.error('Error Message:', error.message);
      if (error.stack) {
          console.error('Stack Trace:', error.stack);
      }
      throw error;
    }
  }
  
export { updateUserEmail, deleteAccount, initiatePasswordReset, getManagementApiToken };