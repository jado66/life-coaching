export default async function handler(req, res) {
    setCorsHeaders(req, res, async() => {
        res.status(200).json({ message: 'Hello World' });
    })
}