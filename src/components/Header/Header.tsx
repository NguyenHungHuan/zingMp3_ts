export default function Header() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <header className='h-[70px] sticky top-0 z-10 bg-[#170f23] px-[59px] mx-[-2px]'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center'>
          <button className='w-[44px] h-[24px] flex items-center justify-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'#595361'}
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
            </svg>
          </button>
          <button className='w-[44px] h-[24px] flex items-center justify-start'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'#595361'}
              className='w-6 h-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3' />
            </svg>
          </button>
          <form
            noValidate
            onSubmit={handleSubmit}
            className='flex items-center bg-[#2f2739] rounded-full w-[440px] h-10 overflow-hidden'
          >
            <button type='submit' className='flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke={'#75707c'}
                className='w-6 h-6 mx-2'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
            <input
              className='caret-white text-[#d8d7d8] text-sm outline-none bg-[#2f2739] py-[5px] w-full placeholder-[#d8d7d8]'
              type='text'
              placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
          </form>
        </div>
        <div className='flex items-center gap-[10px]'>
          <button className='rounded-full bg-[#2f2739] p-2 flex items-center justify-center hover:opacity-90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke={'#d8d8d8'}
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z'
              />
              <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
            </svg>
          </button>
          <button className='rounded-full overflow-hidden hover:opacity-90'>
            <img
              className='object-cover w-[38px] h-[38px]'
              src='https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.9.35/static/media/user-default.3ff115bb.png'
              alt='avatar'
            />
          </button>
        </div>
      </div>
    </header>
  )
}
