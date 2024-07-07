// pages/api/email/cancelForward.js
import { cancelForward } from '../../../services/emailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const data = await cancelForward(email);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
