const Footer = () => {
  return (
    <footer className='mt-10 border-t border-[#ffffff1a] bg-[#170f23]'>
      <div className='overflow-hidden pb-12'>
        <div className='mt-8 flex justify-center gap-8'>
          <a
            href='https://github.com/NguyenHungHuan/zingMp3_ts'
            rel='noopener noreferrer'
            target='_blank'
            className='text-gray-300 hover:text-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='h-10 w-10'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12 2.247a10 10 0 0 0-3.162 19.487c.5.088.687-.212.687-.475c0-.237-.012-1.025-.012-1.862c-2.513.462-3.163-.613-3.363-1.175a3.636 3.636 0 0 0-1.025-1.413c-.35-.187-.85-.65-.013-.662a2.001 2.001 0 0 1 1.538 1.025a2.137 2.137 0 0 0 2.912.825a2.104 2.104 0 0 1 .638-1.338c-2.225-.25-4.55-1.112-4.55-4.937a3.892 3.892 0 0 1 1.025-2.688a3.594 3.594 0 0 1 .1-2.65s.837-.262 2.75 1.025a9.427 9.427 0 0 1 5 0c1.912-1.3 2.75-1.025 2.75-1.025a3.593 3.593 0 0 1 .1 2.65a3.869 3.869 0 0 1 1.025 2.688c0 3.837-2.338 4.687-4.563 4.937a2.368 2.368 0 0 1 .675 1.85c0 1.338-.012 2.413-.012 2.75c0 .263.187.575.687.475A10.005 10.005 0 0 0 12 2.247Z'
              />
            </svg>
          </a>
          <a
            href='https://www.npmjs.com/package/nuxtify-api'
            rel='noopener noreferrer'
            target='_blank'
            className='text-gray-300 hover:text-gray-100'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              aria-hidden='true'
              role='img'
              className='h-10 w-10'
              viewBox='0 0 24 24'
              data-v-c3ad5561
            >
              <path
                fill='currentColor'
                d='M7 7H5a2 2 0 0 0-2 2v8h2v-4h2v4h2V9a2 2 0 0 0-2-2m0 4H5V9h2m7-2h-4v10h2v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2m0 4h-2V9h2m6 0v6h1v2h-4v-2h1V9h-1V7h4v2Z'
              />
            </svg>
          </a>
        </div>
        <p className='mt-8 text-center text-[20px] leading-6 text-gray-500 dark:text-gray-300'>
          © 2024 ZingMp3 Clone. Nguyen Hung Huan.
        </p>
      </div>
    </footer>
  )
}

export default Footer
