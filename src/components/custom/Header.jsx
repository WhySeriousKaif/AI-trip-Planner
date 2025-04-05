import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center p-3'>
      <div className='flex items-center gap-2'>
      <img src="/logo.svg" alt="" />
      <h1 className='text-xl font-bold cursor-pointer'>Wonderly</h1>
      
      </div>
      
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  )
}

export default Header