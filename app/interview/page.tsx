import React from 'react'
import Agent from '@/components/Agent'
import { requireAuth } from '@/lib/actions/auth.action'

const page = async () => {
  // This will redirect to /sign-in if not authenticated
  await requireAuth();

  return (
    <>
      <h3>
        Interview Generation
      </h3>
      <Agent userName="You" userId="user1" type="generate"/>
    </>
  )
}

export default page