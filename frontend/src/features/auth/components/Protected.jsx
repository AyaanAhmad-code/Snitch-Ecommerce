import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Protected = ({children, role = "buyer"}) => {

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  if (loading) {
    // Return a brief loader or empty div while checking initial auth
    return <div className="min-h-screen bg-[#131313] flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#FFD700]"></div>
    </div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if(user.role !== role){
    return <Navigate to="/" />
  }
  
  return children
}

export default Protected