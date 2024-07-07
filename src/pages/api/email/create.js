// pages/api/email/create.js
import { createEmail } from '../../../services/emailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, forwardTo } = req.body;
      const data = await createEmail(email, forwardTo);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
