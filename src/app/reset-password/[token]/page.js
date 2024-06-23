import ReusableHeading from '@/components/component/ReusableComponents/ReusableHeading';
import ResetPasswordForm from '@/components/ResetPasswordForm';

export default function ResetPasswordPage({ params }) {
  const { token } = params;

  return (
    <div className="container mx-auto p-4">
      <ReusableHeading>Redefinir Senha</ReusableHeading>
      
      <ResetPasswordForm token={token} />
    </div>
  );
}