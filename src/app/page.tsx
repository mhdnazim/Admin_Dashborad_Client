'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Main = () => {

    const router = useRouter()
    
    useEffect(() => {
      const accessToken = localStorage.getItem('access_token')
     if (! accessToken) {
       router.push(`/login`)
     }
     else {
       router.push(`/dashboard`)
     }
    }, [router])
    
  return (
    <>
    </>
  )
}

export default Main