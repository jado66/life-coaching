import { setCorsHeaders } from "src/utils/middlware/cors";
import sharp from 'sharp';
import { updateUserByEmail } from "./[email]";
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    setCorsHeaders(req, res, async () => {
        try {
            if (req.method === 'POST') {
                // Create or update a new user's avatar
                const form = formidable({});

                let fields;
                let files;

                [fields, files] = await form.parse(req);

                const file = files.file[0];

                const { email: emailArray } = fields;

                const email = emailArray[0];

                if (!file) {
                    return res.status(400).json({ message: "No image file provided" });
                }
            
                if (!file.mimetype.match(/image.(jpeg|jpg|png)$/)) {
                    throw new Error('Unsupported file type');
                }  

                // Note: Below code assumes 'file' is the key used in FormData.append()


                    // Use the file's Buffer directly instead of calling arrayBuffer()
                const resizedImageBuffer = await sharp(file.filepath)
                    .resize(150, 150, {
                        fit: sharp.fit.inside,
                        withoutEnlargement: true
                    })
                    .jpeg({ quality: 30 })
                    .toBuffer();

                const base64Avatar = 'data:image/jpeg;base64,'+resizedImageBuffer.toString('base64');

                const updateResponse = await updateUserByEmail(email, { avatar: base64Avatar });

                console.log("updateResponse:", JSON.stringify(updateResponse, null, 2))

                return res.status(200).json({ message: "Avatar updated successfully", avatar: base64Avatar });
            }
        } catch (error) {
            console.error('Error with User API:', error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    });
}