import { Metadata } from "next";
import AuthForm from '@/app/components/AuthForm';
import React from 'react';

export const metadata: Metadata = {
  title: "linkedOut - Sign In",
  description: "Sign in to practice job interviews with AI",
};

const Page = () => {
  return <AuthForm type="sign-in" />;
};

export default Page;