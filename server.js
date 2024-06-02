// 'use client';
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';

// // const SOCKET_SERVER_URL = 'https://emailpix.up.railway.app';
// const SOCKET_SERVER_URL = 'http://localhost:3005';

// export default function Home() {
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const transactionID = 'fefccd91c7714c598c497dcf303f87f4';

//   useEffect(() => {
//     const connectWebSocket = async () => {
//       try {
//         // Obter o token CSRF (com o cookie)
//         const csrfResponse = await axios.get(`${SOCKET_SERVER_URL}/api/csrf/get-csrf-token`, { withCredentials: true });
//         const csrfToken = csrfResponse.data.csrfToken;
//         axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

//         // Iniciar a sessão de pagamento (enviando o token CSRF)
//         const response = await axios.post(`${SOCKET_SERVER_URL}/api/payments/startPayment`, { transactionID }, { withCredentials: true });
//         const { tempToken } = response.data;

//         // Conectar ao WebSocket com o token temporário
//         const socket = io(SOCKET_SERVER_URL, {
//           transports: ['polling', 'websocket'], // Adicionando polling para compatibilidade
//           auth: {
//             token: tempToken
//           }
//         });

//         socket.on('connect_error', (error) => {
//           console.error('Erro de conexão WebSocket:', error);
//         });

//         socket.on('connect', () => {
//           console.log('Conectado ao WebSocket:', socket.id);
//         });

//         socket.on('paymentStatus', (data) => {
//           console.log('Pagamento atualizado:', data);
//           setPaymentStatus(data);
//         });

//         return () => {
//           socket.disconnect();
//         };
//       } catch (error) {
//         console.error('Erro ao iniciar a sessão de pagamento ou conectar ao WebSocket:', error);
//       }
//     };

//     connectWebSocket();
//   }, []);
