import { Metadata } from "next";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@/components/auth/LoginForm"),{
  ssr: false
});

export const metadata: Metadata = {
  title: 'GPT-Login',
  description: 'Login to experience the power of AI'
}

export default function LoginPage() {
  return (
    <main className="h-[70vh] flex flex-col items-center justify-center space-y-8">
      <h1 className="font-bold text-2xl">Login to use ChatGPT!</h1>

      <LoginForm />
    </main>
  );
}
