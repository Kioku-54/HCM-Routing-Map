import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

export default function ControlPanel() {
  const { minDistance, numberVehicles, setIsDrawing } = useContext(AppContext)

  return (
    <div className='absolute bg-white drop-shadow-xl lg:mt-6 lg:ml-6 w-full lg:w-64 z-10'>
      <div className='container px-6 py-6 flex flex-col text-black'>
        <div className='text-align text-xl font-extrabold'>Setting Simulate</div>
        {/* Select Number Vehicle */}
        <div className='flex py-2'>
          <div className='w-2/3 text-base font-bold flex justify-start items-center'>
            <span>Vehicles</span>
          </div>
          <div className='w-1/3'>
            <form className='px-2 py-2 bg-gray-100 flex border-solid'>
              <input
                type='text'
                name='search'
                value={numberVehicles}
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent w-full'
              />
            </form>
          </div>
        </div>
        {/* Select Min Distance */}
        <div className='flex py-2'>
          <div className='w-2/3 text-base font-bold flex justify-start items-center'>
            <span>Distance</span>
          </div>
          <div className='w-1/3'>
            <form className='px-2 py-2 bg-gray-100 flex border-solid'>
              <input
                type='text'
                name='search'
                value={minDistance}
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent w-full'
              />
            </form>
          </div>
        </div>
        {/* Draw Your Research Area */}
        <div className='flex py-2'>
          <div className='w-2/3 text-base font-bold flex justify-start items-center'>
            <span>Research Area</span>
          </div>
          <div className='w-1/3'>
            <button
              className='rounded-lg py-2 px-6 flex-shrink-0 border-solid drop-shadow-lg bg-white'
              onClick={() => {
                setIsDrawing(true)
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex mt-4 pt-4 border-t'>
          <div className='w-full'>
            <button className='rounded-lg py-2 px-6 flex-shrink-0 border-solid drop-shadow-lg bg-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
