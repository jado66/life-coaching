import { connectToMongoDatabase } from "src/utils/connect-to-mongo-database";
import { setCorsHeaders } from "src/utils/middlware/cors";

export async function getUserByEmail(email) {
    const { db } = await connectToMongoDatabase();
    const userCollection = db.collection("Users");
    return await userCollection.findOne({ _id: email });
}

export async function updateUserByEmail(email, userData) {
    const { db } = await connectToMongoDatabase();
    const userCollection = db.collection("Users");

    console.log("updateUserByEmail:", email, userData);

    return await userCollection.updateOne({ _id: email }, { $set: userData });
}

export async function deleteUserByEmail(email) {
    const { db } = await connectToMongoDatabase();
    const userCollection = db.collection("Users");
    return await userCollection.deleteOne({ _id: email });
}

// Exported handler where we use those functions.
export default async function handler(req, res) {
    setCorsHeaders(req, res, async() => {

        try {
            const email = req.query.email;
            let result;

            switch (req.method) {
                case 'GET':
                    // Fetch a user by ID
                    result = await getUserByEmail(email);
                    if (!result) {
                        return res.status(404).json({ message: "User not found" });
                    } else {
                        return res.status(200).json(result);
                    }
                
                case 'PUT':
                    // Update a user by ID
                    const userData = JSON.parse(req.body);
                    result = await updateUserByEmail(email, userData);
                    return res.status(200).json(result);
                
                case 'DELETE':
                    // Delete a user by ID
                    result = await deleteUserByEmail(email);
                    return res.status(200).json(result);
                
                default:
                    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
                    return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        } catch (error) {
            console.error('Error with User API:', error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }

    })
}