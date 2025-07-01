import React from 'react'
import Agent from '@/components/Agent'
import { getCurrentUser, requireAuth } from '@/lib/actions/auth.action'

const page = async () => {
  // This will redirect to /sign-in if not authenticated
  await requireAuth();

  const user = await getCurrentUser();

  return (
    <>
      <h3>
        Interview Generation
      </h3>
      <Agent userName={user?.name || ''} userId={user?.id} type="generate"/>
    </>
  )
}

export default page