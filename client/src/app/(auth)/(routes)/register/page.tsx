import { Metadata } from "next";
import dynamic from "next/dynamic";

const RegisterForm = dynamic(() => import("@/components/auth/RegisterForm"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "GPT-Register",
  description: "sign up to experience the power of AI",
};

export default function RegisterPage() {
  return (
    <main className="h-[70vh] flex flex-col items-center justify-center space-y-8 mt-4">
      <h1 className="font-bold text-2xl">Sign up to use ChatGPT!</h1>

      <RegisterForm />
    </main>
  );
}
