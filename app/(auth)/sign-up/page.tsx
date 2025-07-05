import AuthForm from '@/app/components/AuthForm'
import React from 'react'
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "linkedOut - Sign Up",
  description: "Sign in to practice job interviews with AI",
};


const Page = () => {
  return (
    <AuthForm type="sign-up" />
  )
}

export default Page