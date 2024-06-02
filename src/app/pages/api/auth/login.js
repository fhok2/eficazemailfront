// pages/api/auth/login.js
import { login } from '../../../services/authService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;
      const data = await login(email, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
