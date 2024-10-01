// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { method, body } = req;

    try {
        const response = await fetch('http://ec2-13-60-49-9.eu-north-1.compute.amazonaws.com:8080/classify', {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        // Forward the response data and status code
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}
