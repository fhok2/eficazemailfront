import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email, feedback } = req.body;
     

      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER,
        port: 587,
        secure: false, // Use TLS
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        },
        tls: {
          // Do not fail on invalid certs
          rejectUnauthorized: false
        }
      });

      // Send the email
      await transporter.sendMail({
        from: `"Feedback EficazMail+" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_TO,
        subject: `Nova mensagem de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${feedback}`,
        html: `<p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Mensagem:</strong> ${feedback}</p>`
      });

      res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      res.status(500).json({ message: 'Erro ao enviar email', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}