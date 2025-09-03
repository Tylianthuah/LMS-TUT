import React from 'react'
import Navbar from './_components/Navbar'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        <main className='container mx-auto px-4 sm:px-10 py-8'>
            {children}
        </main>
    </div>
  )
}

export default MainLayout