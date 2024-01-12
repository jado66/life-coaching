import { connectToMongoDatabase } from "src/utils/connect-to-mongo-database";
import setCorsHeaders from "src/utils/middlware/cors";

export default async function handler(req, res) {
    setCorsHeaders(req, res, async() => {

        let client;
        let db;

        try {
            const connection = await connectToMongoDatabase();
            client = connection.client;
            db = connection.db;
            
            const email = req.query.email;
            const userCollection = db.collection("Users");

            switch (req.method) {               
                case 'GET':
                    // Fetch a user by ID
                    const fetchedUser = await userCollection.findOne({ _id: email });
                    if (!fetchedUser) {
                        return res.status(404).json({ message: "User not found" });
                    } else {
                        return res.status(200).json(fetchedUser);
                    }
                
                case 'PUT':
                    // Update a user by ID
                    const userData = JSON.parse(req.body);
                    const updateResult = await userCollection.updateOne(
                        { _id: email },
                        { $set: userData }
                    );
                    return res.status(200).json(updateResult);
                
                case 'DELETE':
                    // Delete a user by ID
                    const deleteResult = await userCollection.deleteOne({ _id: email });
                    return res.status(200).json(deleteResult);
                
                default:
                    res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
                    return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        } catch (error) {
            console.error('Error with User API:', error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    })
}