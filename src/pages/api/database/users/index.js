import { connectToMongoDatabase } from "src/utils/connect-to-mongo-database";
import {setCorsHeaders} from "src/utils/middlware/cors";

export default async function handler(req, res) {
    setCorsHeaders(req, res, async() => {

        let client;
        let db;

        try {
            const connection = await connectToMongoDatabase();
            client = connection.client;
            db = connection.db;
            
            const userCollection = db.collection("Users");

            if (req.method === 'POST') {
                // Create a new user
                let newUser = req.body

                const email = newUser.email;

                const creationResult = await userCollection.insertOne({ _id: email, ...newUser});
                return res.status(201).json({
                    _id: email, ...newUser
                });
            } else {
                res.setHeader('Allow', ['POST']);
                return res.status(405).end(`Method ${req.method} Not Allowed`);
            }
        } catch (error) {
            console.error('Error with User API:', error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        } 
    })
}