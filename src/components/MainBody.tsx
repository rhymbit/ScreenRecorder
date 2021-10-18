import React, { FC } from 'react';
import Footer from './Footer/Footer';
import Recorder from './Recorder/Recorder';
import RecorderDisplay from './Recorder/RecorderDisplay';


const MainBody: FC = () => {

  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-800 to-red-400 h-screen w-screen overflow-y-scroll">

      <div className="flex flex-col justify-start mt-12 items-center">
        <h1 className="logo text-6xl font-bold text-purple-600 m-10 transition duration-500 ease-in-out transform hover:scale-125
          hover:text-purple-400">
          ⚡ Screen Recorder</h1>
      </div>

      <div className="flex justify-center items-center">
        <RecorderDisplay />
        <Recorder />
      </div>

      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default MainBody

