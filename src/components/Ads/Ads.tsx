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

export default function Ads() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <h3 className='uppercase mb-6 text-xs font-bold text-[#ffffff80] tracking-[1.71px] text-center'>
        <span aria-hidden onClick={handleOpen} className='hover:text-[#c273ed] cursor-pointer'>
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
            className='bg-[#34224f] h-[426px] w-[740px] p-5 rounded-lg'
            aria-hidden
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative'>
              <h3 className='uppercase mb-5 text-base font-bold text-[#ffffff80] tracking-[3.03px] text-center'>
                <span>{partner.title}</span>
              </h3>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className='text-white text-3xl absolute top-[-5px] right-[-5px] hover:opacity-80'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-7 h-7'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            <div className='flex flex-wrap gap-x-[30px] gap-y-[30px] px-[10px]'>
              {partner.items.map((item, index) => (
                <div
                  className='flex items-center justify-center bg-white rounded-lg w-[112px] h-[63px] overflow-hidden'
                  key={index}
                >
                  <img className='object-cover w-auto max-w-[90%] max-h-[80%]' src={item} alt={partner.title} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-wrap gap-x-[20px] gap-y-[30px] px-[10px] justify-center'>
        {partner.items.slice(0, 16).map((item, index) => (
          <div
            className='flex items-center justify-center bg-white rounded-lg w-[127.75px] h-[71.86px] overflow-hidden'
            key={index}
          >
            <img className='object-cover w-auto max-w-[90%] max-h-[80%]' src={item} alt={partner.title} />
          </div>
        ))}
      </div>
    </div>
  )
}
