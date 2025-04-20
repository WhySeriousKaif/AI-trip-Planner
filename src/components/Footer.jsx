import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-6 rounded-t-lg w-full">
        <div className="container mx-auto px-4">
          <p className="text-center text-lg font-bold mb-2">
            &copy; {new Date().getFullYear()} WonderMate. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
