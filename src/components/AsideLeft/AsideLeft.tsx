import classNames from 'classnames'
import { NavLink, useLocation, Link } from 'react-router-dom'
import PATH from '~/constants/path'

export default function AsideLeft() {
  const { pathname } = useLocation()

  return (
    <aside>
      <div className='flex h-[70px] items-center pl-[28px] pr-[25px]'>
        <Link to={PATH.base}>
          <img
            className='h-10 w-[120px] hover:opacity-90'
            src='https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg'
            alt='logo zing mp3'
          />
        </Link>
      </div>
      <nav className='mb-4'>
        <ul className='text-[14px] font-medium'>
          <li
            className={classNames('border-l-[3px]', {
              'border-l-[#9b4de0]': pathname === PATH.base,
              'border-l-transparent': pathname !== PATH.base
            })}
          >
            <NavLink
              to={PATH.base}
              title='Khám Phá'
              className={({ isActive }) =>
                classNames('flex items-center gap-3 px-[21px] py-3 hover:text-white', {
                  'bg-[#393142] text-white': isActive,
                  'bg-none text-[#dadada]': !isActive
                })
              }
            >
              <svg width={24} height={24} viewBox='0 0 24 24' className='fill-current'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.25 12C3.25 7.16751 7.16751 3.25 12 3.25C16.8325 3.25 20.75 7.16751 20.75 12C20.75 16.8325 16.8325 20.75 12 20.75C7.16751 20.75 3.25 16.8325 3.25 12ZM12 1.75C6.33908 1.75 1.75 6.33908 1.75 12C1.75 17.6609 6.33908 22.25 12 22.25C17.6609 22.25 22.25 17.6609 22.25 12C22.25 6.33908 17.6609 1.75 12 1.75ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12ZM12 7.75C9.65279 7.75 7.75 9.65279 7.75 12C7.75 14.3472 9.65279 16.25 12 16.25C14.3472 16.25 16.25 14.3472 16.25 12C16.25 9.65279 14.3472 7.75 12 7.75Z'
                  fillOpacity='0.8'
                />
              </svg>
              <span>Khám Phá</span>
            </NavLink>
          </li>
          <li
            className={classNames('border-l-[3px]', {
              'border-l-[#9b4de0]': pathname === PATH.zingChart,
              'border-l-transparent': pathname !== PATH.zingChart
            })}
          >
            <NavLink
              to={PATH.zingChart}
              title='#zingchart'
              className={({ isActive }) =>
                classNames('flex items-center gap-3 px-[21px] py-3 hover:text-white', {
                  'bg-[#393142] text-white': isActive,
                  'bg-none text-[#dadada]': !isActive
                })
              }
            >
              <svg width={24} height={24} viewBox='0 0 24 24' className='fill-current'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M1.76078 11.5281C2.0086 6.08576 6.49865 1.75 12.0018 1.75C14.0559 1.75 15.971 2.35489 17.5759 3.39648C17.9234 3.62198 18.0222 4.08645 17.7967 4.4339C17.5712 4.78136 17.1068 4.88023 16.7593 4.65473C15.3901 3.76614 13.7574 3.25 12.0018 3.25C7.30422 3.25 3.47074 6.95138 3.25923 11.5963C3.24039 12.0101 2.88968 12.3303 2.47589 12.3114C2.06211 12.2926 1.74194 11.9419 1.76078 11.5281ZM21.5275 11.6871C21.9413 11.7057 22.2617 12.0563 22.243 12.4701C21.998 17.9149 17.5067 22.2536 12.0018 22.2536C9.89696 22.2536 7.93821 21.6184 6.30952 20.5292C5.9652 20.299 5.87274 19.8332 6.103 19.4889C6.33327 19.1446 6.79905 19.0521 7.14337 19.2824C8.53298 20.2117 10.203 20.7536 12.0018 20.7536C16.7009 20.7536 20.5354 17.0497 20.7445 12.4026C20.7632 11.9888 21.1137 11.6685 21.5275 11.6871ZM20.7535 8.05986C20.7535 7.40256 20.2207 6.86972 19.5634 6.86972C18.9061 6.86972 18.3732 7.40256 18.3732 8.05986C18.3732 8.71715 18.9061 9.25 19.5634 9.25C20.2207 9.25 20.7535 8.71715 20.7535 8.05986ZM19.5634 5.36972C21.0491 5.36972 22.2535 6.57413 22.2535 8.05986C22.2535 9.54558 21.0491 10.75 19.5634 10.75C19.1208 10.75 18.7031 10.6431 18.3349 10.4537L15.5083 14.5112C15.3814 14.6933 15.1803 14.8099 14.9592 14.8295C14.738 14.8491 14.5196 14.7698 14.3626 14.6128L13.3637 13.6139L12.2257 15.3202C12.0906 15.5227 11.8658 15.6471 11.6225 15.6538C11.3793 15.6605 11.1478 15.5488 11.0018 15.3542L9.05228 12.7558L6.78385 15.0242C6.75187 15.0562 6.71772 15.0847 6.68188 15.1097C6.80299 15.4073 6.86972 15.7328 6.86972 16.074C6.86972 17.4877 5.72363 18.6338 4.30986 18.6338C2.89609 18.6338 1.75 17.4877 1.75 16.074C1.75 14.6602 2.89609 13.5141 4.30986 13.5141C4.83856 13.5141 5.32983 13.6744 5.73772 13.949L8.60299 11.0837C8.75671 10.93 8.96957 10.8506 9.18642 10.8659C9.40327 10.8813 9.60278 10.9901 9.73324 11.164L11.5657 13.6064L12.6234 12.0207C12.748 11.8338 12.9499 11.7126 13.1735 11.6905C13.3971 11.6684 13.6188 11.7477 13.7776 11.9065L14.7897 12.9186L17.2351 9.40829C17.005 9.01185 16.8732 8.55124 16.8732 8.05986C16.8732 6.57413 18.0777 5.36972 19.5634 5.36972ZM4.30986 15.0141C4.8952 15.0141 5.36972 15.4886 5.36972 16.074C5.36972 16.6593 4.8952 17.1338 4.30986 17.1338C3.72452 17.1338 3.25 16.6593 3.25 16.074C3.25 15.4886 3.72452 15.0141 4.30986 15.0141Z'
                  fill='#currentColor'
                  fillOpacity='0.8'
                />
              </svg>
              <span>#zingchart</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className='mx-[21px] h-[1px] break-words bg-[#ffffff1a] text-[#ffffff1a]' />
      <nav className='my-4'>
        <ul className='text-[14px] font-medium'>
          <li
            className={classNames('border-l-[3px]', {
              'border-l-[#9b4de0]': pathname === PATH.newReleased,
              'border-l-transparent': pathname !== PATH.newReleased
            })}
          >
            <NavLink
              to={PATH.newReleased}
              title='BXH Nhạc Mới'
              className={({ isActive }) =>
                classNames('flex items-center gap-3 px-[21px] py-3 hover:text-white', {
                  'bg-[#393142] text-white': isActive,
                  'bg-none text-[#dadada]': !isActive
                })
              }
            >
              <svg width={24} height={24} viewBox='0 0 24 24' className='fill-current'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M20.25 2C20.25 1.58579 19.9142 1.25 19.5 1.25C19.0858 1.25 18.75 1.58579 18.75 2C18.75 2.95195 18.4626 3.63685 18.0656 4.07478C17.6709 4.51015 17.1258 4.75 16.5 4.75C16.0858 4.75 15.75 5.08579 15.75 5.5C15.75 5.91421 16.0858 6.25 16.5 6.25C17.126 6.25 17.671 6.48996 18.0657 6.9254C18.4628 7.36341 18.75 8.04835 18.75 9C18.75 9.41421 19.0858 9.75 19.5 9.75C19.9142 9.75 20.25 9.41421 20.25 9C20.25 8.04805 20.5374 7.36315 20.9344 6.92522C21.3291 6.48985 21.8742 6.25 22.5 6.25C22.9142 6.25 23.25 5.91421 23.25 5.5C23.25 5.08579 22.9142 4.75 22.5 4.75C21.874 4.75 21.329 4.51004 20.9343 4.0746C20.5372 3.63659 20.25 2.95165 20.25 2ZM19.1769 5.08231C19.2934 4.95373 19.4013 4.81641 19.5 4.6709C19.5987 4.81629 19.7064 4.95351 19.8229 5.082C19.9625 5.23602 20.1129 5.37549 20.2725 5.49999C20.113 5.62441 19.9627 5.76378 19.8231 5.91769C19.7066 6.04627 19.5987 6.18359 19.5 6.3291C19.4013 6.18371 19.2936 6.04649 19.1771 5.918C19.0375 5.76398 18.8871 5.62451 18.7275 5.50001C18.887 5.37559 19.0373 5.23622 19.1769 5.08231ZM13.5095 5.31294C13.5652 5.72339 13.2776 6.10128 12.8672 6.15698L12.3492 6.22728L11.3238 6.36644C10.186 6.55633 9.25 7.65728 9.25 8.74999V18.5C9.25 20.5711 7.57107 22.25 5.5 22.25C3.42893 22.25 1.75 20.5711 1.75 18.5C1.75 16.4289 3.42893 14.75 5.5 14.75C6.3442 14.75 7.12325 15.0289 7.75 15.4997V8.74999C7.75 6.89294 9.25015 5.18376 11.0921 4.88439L11.1116 4.88149L12.1475 4.7409L12.6655 4.67061C13.0759 4.61491 13.4538 4.90249 13.5095 5.31294ZM5.5 16.25C6.74264 16.25 7.75 17.2573 7.75 18.5C7.75 19.7426 6.74264 20.75 5.5 20.75C4.25736 20.75 3.25 19.7426 3.25 18.5C3.25 17.2573 4.25736 16.25 5.5 16.25ZM19.5 11.75C19.9142 11.75 20.25 12.0858 20.25 12.5V17.5C20.25 19.5711 18.5711 21.25 16.5 21.25C14.4289 21.25 12.75 19.5711 12.75 17.5C12.75 15.4289 14.4289 13.75 16.5 13.75C17.3442 13.75 18.1233 14.0289 18.75 14.4997V12.5C18.75 12.0858 19.0858 11.75 19.5 11.75ZM16.5 15.25C17.7426 15.25 18.75 16.2573 18.75 17.5C18.75 18.7426 17.7426 19.75 16.5 19.75C15.2574 19.75 14.25 18.7426 14.25 17.5C14.25 16.2573 15.2574 15.25 16.5 15.25Z'
                  fillOpacity='0.8'
                />
              </svg>
              <span>BXH Nhạc Mới</span>
            </NavLink>
          </li>
          <li
            className={classNames('border-l-[3px]', {
              'border-l-[#9b4de0]': pathname === PATH.hub,
              'border-l-transparent': pathname !== PATH.hub
            })}
          >
            <NavLink
              to={PATH.hub}
              title='Chủ Đề & Thể Loại'
              className={({ isActive }) =>
                classNames('flex items-center gap-3 px-[21px] py-3 hover:text-white', {
                  'bg-[#393142] text-white': isActive,
                  'bg-none text-[#dadada]': !isActive
                })
              }
            >
              <svg width={24} height={24} viewBox='0 0 24 24' className='fill-transparent stroke-current'>
                <rect
                  x={3}
                  y={3}
                  width='7.57895'
                  height='7.57895'
                  rx='1.89474'
                  stroke='currentColor'
                  strokeOpacity='0.8'
                  strokeWidth='1.5'
                />
                <rect
                  x='13.4211'
                  y={3}
                  width='7.57895'
                  height='7.57895'
                  rx='3.78947'
                  stroke='currentColor'
                  strokeOpacity='0.8'
                  strokeWidth='1.5'
                />
                <path
                  d='M7.02442 20.7272C6.89558 20.7751 6.68337 20.7751 6.55453 20.7272C5.45558 20.3321 3 18.6835 3 15.8893C3 14.6558 3.94358 13.6579 5.10695 13.6579C5.79663 13.6579 6.40674 14.0092 6.78947 14.552C7.17221 14.0092 7.78611 13.6579 8.472 13.6579C9.63537 13.6579 10.5789 14.6558 10.5789 15.8893C10.5789 18.6835 8.12337 20.3321 7.02442 20.7272Z'
                  stroke='currentColor'
                  strokeOpacity='0.8'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M14.3684 13.7475L14.3684 20.6735C14.3684 20.819 14.5256 20.9102 14.6519 20.838L20.7121 17.375C20.8394 17.3023 20.8394 17.1188 20.7121 17.046L14.6519 13.583C14.5256 13.5109 14.3684 13.6021 14.3684 13.7475Z'
                  stroke='currentColor'
                  strokeOpacity='0.8'
                  strokeWidth='1.5'
                />
              </svg>
              <span>Chủ Đề & Thể Loại</span>
            </NavLink>
          </li>
          <li
            className={classNames('border-l-[3px]', {
              'border-l-[#9b4de0]': pathname === PATH.top100,
              'border-l-transparent': pathname !== PATH.top100
            })}
          >
            <NavLink
              to={PATH.top100}
              title='Top 100'
              className={({ isActive }) =>
                classNames('flex items-center gap-3 px-[21px] py-3 hover:text-white', {
                  'bg-[#393142] text-white': isActive,
                  'bg-none text-[#dadada]': !isActive
                })
              }
            >
              <svg width={24} height={24} viewBox='0 0 24 24' className='fill-transparent stroke-current'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M12 17L7.01888 19.6187C6.65207 19.8116 6.22335 19.5001 6.29341 19.0916L7.24472 13.5451L3.21491 9.61699C2.91815 9.32773 3.08191 8.82374 3.49202 8.76415L9.06107 7.95491L11.5516 2.90849C11.735 2.53687 12.265 2.53687 12.4484 2.90849L14.9389 7.95491L20.508 8.76415C20.9181 8.82374 21.0818 9.32773 20.7851 9.61699L16.7553 13.5451L17.7066 19.0916C17.7766 19.5001 17.3479 19.8116 16.9811 19.6187L12 17Z'
                  stroke='currentColor'
                  strokeOpacity='0.8'
                  strokeWidth='1.5'
                />
              </svg>
              <span>Top 100</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
