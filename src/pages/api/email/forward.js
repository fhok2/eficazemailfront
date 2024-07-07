// app/api/email/forward.js
import { forwardEmail } from '../../services/emailService';

export default async function forward(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, forwardTo } = req.body;
      const data = await forwardEmail(email, forwardTo);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
