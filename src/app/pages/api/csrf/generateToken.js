// pages/api/csrf/generateToken.js
import { generateCsrfToken } from '../../../services/csrfService';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = generateCsrfToken();
    res.status(200).json({ csrfToken: token });
  } else {
    res.status(405).end(); // Método não permitido
  }
}
