import { useState } from 'react'
import classNames from 'classnames'

export default function AsideRight() {
  const [activeButton, setActiveButton] = useState(true)

  const handleActiveButton = () => {
    setActiveButton((prev) => !prev)
  }

  return (
    <>
      <div className='py-[14px] px-2 '>
        <div className='flex items-center gap-2 h-[42px]'>
          <div className='flex items-center p-[3px] rounded-full bg-[#2f2739] text-xs'>
            <button
              onClick={handleActiveButton}
              className={classNames(
                'flex whitespace-nowrap items-center justify-center hover:text-white rounded-full px-4 py-[6px] cursor-pointer',
                {
                  'text-white font-medium bg-[#6d6875]': activeButton,
                  'text-[#dadada] font-normal': !activeButton
                }
              )}
            >
              Danh sách phát
            </button>
            <button
              onClick={handleActiveButton}
              className={classNames(
                'flex whitespace-nowrap items-center justify-center hover:text-white rounded-full px-[13px] py-[6px] cursor-pointer',
                {
                  'text-white font-medium bg-[#6d6875]': !activeButton,
                  'text-[#dadada] font-normal': activeButton
                }
              )}
            >
              Nghe gần đây
            </button>
          </div>
          <button className='flex items-center justify-center rounded-full p-[6px] bg-[#2f2739] hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'white'}
              className='w-5 h-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </button>
          <button className='flex items-center justify-center rounded-full p-[6px] bg-[#2f2739] hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke={'white'}
              className='w-5 h-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className='w-[285px] h-[240px] mt-5 ml-5 opacity-50 bg-cover bg-no-repeat [background-position-y:cover] [background-position-x:50%]'
        style={{
          backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/bg-empty-dark.svg)`
        }}
      />
    </>
  )
}
