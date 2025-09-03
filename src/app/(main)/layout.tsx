import React from 'react'
import Navbar from './_components/Navbar'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        <main className='container mx-auto'>
            {children}
        </main>
    </div>
  )
}

export default MainLayout