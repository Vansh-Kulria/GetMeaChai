import React from 'react'

const Username = ({ params }) => {
  return (
    <>
      <div>
        <div className="cover-pic relative w-full ">
          <img className='object-cover w-full h-[45vh]' src="https://images.pexels.com/photos/1097456/pexels-photo-1097456.jpeg" alt="Cover picture" />

          <div className='w-full flex justify-center '>
            <img className="w-20 rounded-full h-20 object-cover absolute -bottom-10 border" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="profile picture" />

          </div>

        </div>

        <div className='mt-12 flex flex-col justify-center items-center'>
          <div className="name font-bold text-lg">@Vansh kulria</div>
        </div>

        <div className='flex flex-col justify-center items-center text-gray-400/50 text-xs gap-1 mt-2 '>
          <div>
            Creating Animated art for VTT's
          </div>
          <div>
            9,456 members . 82 posts . $15,450/relese
          </div>
        </div>

        <div className='flex max-w-[80vw] mx-auto mt-15 p-2 border rounded-xl gap-3'>
          <div className='bg-gray-500/20 min-h-[330px] max-h-[330px] w-1/2 rounded-lg '>

            <div className='font-bold px-3 py-2 text-md'>Suppoters</div>
            <div className='text-gray-400  text-sm pl-5 flex flex-col gap-2 py-2 overflow-auto scroll-smooth max-h-[290px] overflow-y-auto
          [&::-webkit-scrollbar]:w-[.01px]
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500'>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
              <div>Shubham donated $30 with a message "I support you bro .lots of love ❤️"</div>
            </div>
          </div>

          <div className='bg-gray-500/20  w-1/2 rounded-lg'>
            <div className='font-bold px-3 py-2 text-md'>Make a Payment</div>
            <div>
              <div className='flex flex-col gap-3 px-5 py-3'>
                <input className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' type="text" placeholder='Enter Name' />
                <input className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' type="text" placeholder='Enter Message' />
                <input className='rounded-lg bg-gray-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600/30 px-3 py-2 transition hover:bg-gray-500/40' type="text" placeholder='Enter Amount' />
              </div>

            </div>

            <div className='px-5 py-3'>
              <button type="button"
                className="text-white  w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl
                focus:ring-2 focus:outline-none focus:ring-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 cursor-pointer
                transition-all duration-300"
              >
                Pay
              </button>
            </div>

            <div className='flex gap-2 px-5 py-2 pb-4'>
              <div className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay $10</div>
              <div className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay $20</div>
              <div className=' w-fit p-1 px-2 rounded-lg bg-gray-600/50 cursor-pointer hover:bg-gray-600/70 text-sm'>Pay $30</div>
            </div>



          </div>
        </div>

      </div>
    </>
  )
}

export default Username
