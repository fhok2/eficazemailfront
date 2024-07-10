import dynamic from 'next/dynamic';

const EmailValidationClient = dynamic(() => import('../../components/EmailValidationClient'), {
  ssr: false,
});

export default function EmailValidationPage() {
  return <EmailValidationClient />;
}

export const config = {
  unstable_runtimeJS: true
};