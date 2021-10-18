import React, { FC } from 'react';

const RecorderDisplay: FC = () => {

  const commonCss = `m-2 p-2 font-bold rounded-2xl h-12 transition duration-500 ease-in-out transform hover:scale-110`
  
  return (
    <div>

      <div className="flex flex-row justify-center items-center">

        <button
          id={`startBtn`}
          className={`bg-green-500 w-28 ${commonCss} hover:bg-green-400 `}
        >
          Start</button>

        <button
          id={`stopBtn`}
          className={`bg-red-500 w-28 ${commonCss} hover:bg-red-400`}
        >
          Stop</button>

        <button
          id={`videoSelectBtn`}
          className={`bg-blue-500 max-w-xs overflow-hidden ${commonCss} hover:bg-blue-400`}
        >
          Select Video Source</button>

      </div>

      <div className="grid grid-flow-col grid-cols-10">
        <video id={`video`} className="p-2 m-2 rounded-2xl border-4 border-blue-400 col-start-3 col-span-6"></video>
      </div>

    </div>
  )
}

export default RecorderDisplay