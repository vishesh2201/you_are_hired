import React, { ReactNode } from 'react'

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className='auth-layout flex items-center justify-center mx-auto max-w-7xl max-sm:px-4 max-sm:py-8'>
      {children}
    </div>
  )
}

export default AuthLayout