import React from 'react'

const Footer = () => {
   const year = new Date().getFullYear();
  return (
    <div className=" bg-gray-600/30 text-white text-center py-4 mt-8">
       <p>© {year} Get me a Chai. All rights reserved.❤️</p>
    </div>
  )
}

export default Footer
