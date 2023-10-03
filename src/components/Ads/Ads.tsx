import { useState } from 'react'

const partner = {
  title: 'Đối tác âm nhạc',
  items: [
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/kakao.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/believe.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/danal.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/hikoon.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/ingrooves.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/jsj.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/route-note.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/stone-music.png',
    'https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/taihe.png'
  ]
}

interface Props {
  className?: string
}

export default function Ads({ className }: Props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div className={className}>
      <h3 className='mb-6 text-center text-xs font-bold uppercase tracking-[1.71px] text-[#ffffff80]'>
        <span aria-hidden onClick={handleOpen} className='cursor-pointer hover:text-[#c273ed]'>
          {partner.title}
        </span>
      </h3>
      {open && (
        <div
          className='fixed inset-0 z-50 flex cursor-default items-center justify-center bg-[#000000cc]'
          aria-hidden
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className='h-[426px] w-[740px] rounded-lg bg-[#34224f] p-5'
            aria-hidden
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative'>
              <h3 className='mb-5 text-center text-base font-bold uppercase tracking-[3.03px] text-[#ffffff80]'>
                <span>{partner.title}</span>
              </h3>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className='absolute right-[-5px] top-[-5px] text-3xl text-white hover:opacity-80'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-7 w-7'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            <div className='flex flex-wrap gap-x-[30px] gap-y-[30px] px-[10px]'>
              {partner.items.map((item, index) => (
                <div
                  className='flex h-[63px] w-[112px] items-center justify-center overflow-hidden rounded-lg bg-white'
                  key={index}
                >
                  <img className='max-h-[80%] w-auto max-w-[90%] object-cover' src={item} alt={partner.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-wrap justify-center gap-x-[20px] gap-y-[30px] px-[10px]'>
        {partner.items.slice(0, 16).map((item, index) => (
          <div
            className='flex h-[71.86px] w-[127.75px] items-center justify-center overflow-hidden rounded-lg bg-white'
            key={index}
          >
            <img className='max-h-[80%] w-auto max-w-[90%] object-cover' src={item} alt={partner.title} />
          </div>
        ))}
      </div>
    </div>
  )
}
