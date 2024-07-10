import { AuthProvider } from '@/contexts/AuthContext';


export default function RootLayout({ children }) {
  return (
    <AuthProvider >
      <section className="pt-20 h-full ">{children}</section>
    </AuthProvider>
  );
}
