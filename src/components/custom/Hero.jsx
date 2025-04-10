import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-60 gap-6 md:gap-9'>
      <h1 className='font-extrabold text-[28px]    sm:text-[35px] md:text-[42px] lg:text-[50px] text-center mt-8 md:mt-16'>
        <span className='text-[#f56551]'>Discover Your Next Adventure:</span>{' '}
        Personalized Planned Journey At Your FingerTips!
      </h1>
      <p className='  sm:text-lg  md:text-xl text-gray-500 text-center mt-4 md:mt-10 max-w-3xl '>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget
      </p>
      <Link to="/create-trip" className='mt-4 md:mt-6'>
        <Button className='text-sm md:text-base px-6 py-2 md:px-8 md:py-3 font-medium'>
          Get Started,Try Out
        </Button>
      </Link>
    </div>
  )
}

export default Hero
