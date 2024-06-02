// pages/api/auth/logout.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Implementar lógica de logout
    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.status(405).end(); // Método não permitido
  }
}
