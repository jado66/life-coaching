export default function handler(req, res) {

    // Generate a random number between 0 and 1
    const random = Math.random();

    // Set the failure rate (e.g., 30%)
    const failureRate = 0.3;

    if (random < failureRate) {
        // Simulate a failure response
        res.status(500).json({ message: 'API request failed' });
    } else {
        // Simulate a successful response
        res.status(200).json({ message: 'API request succeeded' });
    }
}
