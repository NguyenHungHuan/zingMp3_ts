import { useState } from 'react'
import classNames from 'classnames'

export default function AsideRight() {
  const [activeButton, setActiveButton] = useState(true)

  const handleActiveButton = () => {
    setActiveButton((prev) => !prev)
  }

  return (
    <>
      <div className='px-2 py-[14px] '>
        <div className='flex h-[42px] items-center gap-2'>
          <div className='flex items-center rounded-full bg-[#2f2739] p-[3px] text-xs'>
            <button
              onClick={handleActiveButton}
              className={classNames(
                'flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-4 py-[6px] hover:text-white',
                {
                  'bg-[#6d6875] font-medium text-white': activeButton,
                  'font-normal text-[#dadada]': !activeButton
                }
              )}
            >
              Danh sách phát
            </button>
            <button
              onClick={handleActiveButton}
              className={classNames(
                'flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full px-[13px] py-[6px] hover:text-white',
                {
                  'bg-[#6d6875] font-medium text-white': !activeButton,
                  'font-normal text-[#dadada]': activeButton
                }
              )}
            >
              Nghe gần đây
            </button>
          </div>
          <button className='flex items-center justify-center rounded-full bg-[#2f2739] p-[6px] hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'white'}
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </button>
          <button className='flex items-center justify-center rounded-full bg-[#2f2739] p-[6px] hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke={'white'}
              className='h-5 w-5'
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
        className='ml-5 mt-5 h-[240px] w-[285px] bg-cover bg-no-repeat opacity-50 [background-position-x:50%] [background-position-y:cover]'
        style={{
          backgroundImage: `url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/bg-empty-dark.svg)`
        }}
      />
    </>
  )
}
