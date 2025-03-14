'use client';

import LoginForm from "@/components/LoginForm";

export default function LoginPage() {

  const onSignInSuccess = () => {
    const token = localStorage.getItem("token");
  };

  return <LoginForm onSignInSuccess={onSignInSuccess} />;
}
