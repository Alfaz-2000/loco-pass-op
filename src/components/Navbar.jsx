import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
        <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

      <div className="logo font-bold text-2xl text-white ">
        <span className='text-green-500'>&lt;</span>
        Pass
        <span className='text-green-500'>OP/&gt;</span>
        </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">Contact</a>
            <a className='hover:font-bold' href="#">Services</a>
        </li>
      </ul> */}
      <button className='flex justify-between items-center text-white bg-green-700 rounded-full  ring-white ring-1'>
        <img className='invert w-10 p-1' src="icons/github.svg" alt="Github logo" />
        <span className='font-bold px-2'>GitHub</span>
      </button>
        </div>
    </nav>
  )
}

export default Navbar
