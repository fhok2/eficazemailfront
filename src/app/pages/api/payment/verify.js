// pages/api/payment/verify.js
import { verifyPayment } from '../../../services/paymentService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentId } = req.body;
      const data = await verifyPayment(paymentId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
}
