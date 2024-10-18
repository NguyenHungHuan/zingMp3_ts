import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import zingmp3Api from '~/apis/zingmp3Api'
import PATH from '~/constants/path'

const Search = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [valueForm, setValueForm] = useState<string>('')
  const [valueFormReview, setValueFormReview] = useState<string>('')
  const [selectedItem, setSelectedItem] = useState<number>(-1)
  const navigate = useNavigate()
  const searchInput = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()

  const { data: dataRecommend } = useQuery({
    queryKey: ['recommend'],
    queryFn: () => zingmp3Api.getRecommendKeyword(),
    staleTime: 3 * 60 * 1000
  })
  const dataRecommendKeyword = dataRecommend?.data.data

  const { data: dataSuggest } = useQuery({
    queryKey: ['suggestion', { q: valueForm }],
    queryFn: () => zingmp3Api.getSuggestion({ q: valueForm }),
    staleTime: 3 * 60 * 1000,
    enabled: valueForm !== ''
  })
  const dataSuggestKeyword = dataSuggest?.data.data.items.find((item) => item.keywords)?.keywords

  useEffect(() => {
    if (!pathname.includes(PATH.search)) {
      setValueForm('')
    }
  }, [pathname])

  useEffect(() => {
    if (valueForm === '') {
      setSelectedItem(-1)
    }
  }, [valueForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItem(-1)
    setValueFormReview('')
    setValueForm(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchInput.current && searchInput.current.blur()
    if (valueForm) {
      navigate({
        pathname: `${PATH.search}/all`,
        search: createSearchParams({
          q: valueForm.trim()
        }).toString()
      }, {
        
      })
    }
  }

  const handleClick = (value: string) => {
    setValueForm(value)
    if (value) {
      navigate({
        pathname: `${PATH.search}/all`,
        search: createSearchParams({
          q: value
        }).toString()
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && valueForm === '') {
      if (e.key === 'ArrowDown' && dataRecommendKeyword && selectedItem < dataRecommendKeyword.length - 1) {
        setSelectedItem((prev) => prev + 1)
        setValueFormReview(dataRecommendKeyword[selectedItem + 1].keyword)
      } else if (e.key === 'ArrowDown' && dataRecommendKeyword && selectedItem === dataRecommendKeyword.length - 1) {
        setSelectedItem(0)
        setValueFormReview(dataRecommendKeyword[0].keyword)
      }
    } else if (open && valueForm !== '') {
      if (e.key === 'ArrowDown' && dataSuggestKeyword && selectedItem < dataSuggestKeyword.length) {
        setSelectedItem((prev) => prev + 1)
        setValueFormReview(
          selectedItem < dataSuggestKeyword.length - 1 ? dataSuggestKeyword[selectedItem + 1].keyword : valueForm
        )
      } else if (e.key === 'ArrowDown' && dataSuggestKeyword && selectedItem === dataSuggestKeyword.length) {
        setSelectedItem(0)
        setValueFormReview(dataSuggestKeyword[0].keyword)
      }
    }
    if (e.key === 'Enter' && valueFormReview) {
      setValueForm(valueFormReview)
      searchInput.current && searchInput.current.blur()
      navigate({
        pathname: `${PATH.search}/all`,
        search: createSearchParams({
          q: valueFormReview.trim()
        }).toString()
      })
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (open && valueForm === '') {
      if (e.key === 'ArrowUp' && selectedItem > 0 && dataRecommendKeyword) {
        setSelectedItem((prev) => prev - 1)
        setValueFormReview(dataRecommendKeyword[selectedItem - 1].keyword)
      } else if (e.key === 'ArrowUp' && selectedItem === 0 && dataRecommendKeyword) {
        setSelectedItem(dataRecommendKeyword.length - 1)
        setValueFormReview(dataRecommendKeyword[dataRecommendKeyword.length - 1].keyword)
      } else if (e.key === 'ArrowUp' && selectedItem === -1 && dataRecommendKeyword) {
        setSelectedItem(dataRecommendKeyword.length - 1)
        setValueFormReview(dataRecommendKeyword[dataRecommendKeyword.length - 1].keyword)
      }
    } else if (open && valueForm !== '') {
      if (e.key === 'ArrowUp' && selectedItem > 0 && dataSuggestKeyword) {
        setSelectedItem((prev) => prev - 1)
        setValueFormReview(dataSuggestKeyword[selectedItem - 1].keyword)
      } else if (e.key === 'ArrowUp' && selectedItem === -1 && dataSuggestKeyword) {
        setSelectedItem(dataSuggestKeyword.length)
        setValueFormReview(valueForm)
      } else if (e.key === 'ArrowUp' && selectedItem === 0 && dataSuggestKeyword) {
        setSelectedItem(dataSuggestKeyword.length)
        setValueFormReview(valueForm)
      }
    }
  }

  return (
    <div className='relative'>
      <form
        noValidate
        onSubmit={(e) => {
          handleSubmit(e)
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }}
        className={`form-control flex h-10 w-[440px] items-center overflow-hidden ${
          !open ? 'rounded-[20px] bg-[#2f2739]' : 'rounded-t-[20px] bg-[#34224f]'
        }`}
      >
        <button disabled={!valueForm} type='submit' className='flex items-center justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            className={`mx-2 h-6 w-6 ${valueForm ? 'stroke-white' : 'stroke-[#75707c]'}`}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </button>
        <input
          value={selectedItem !== -1 ? valueFormReview : valueForm}
          ref={searchInput}
          onFocus={(e) => {
            e.target.select()
            setOpen(true)
          }}
          onBlur={() => {
            setSelectedItem(-1)
            setOpen(false)
          }}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          onKeyUp={(e) => handleKeyUp(e)}
          className={`w-full ${
            !open ? 'bg-[#2f2739]' : 'bg-[#34224f]'
          } py-[5px] text-[14px] text-[#d8d7d8] placeholder-[#d8d7d8] caret-white outline-none`}
          type='text'
          placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        />
        {valueForm !== '' && (
          <button onClick={() => setValueForm('')} className='ml-auto flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='mx-3 h-5 w-5 stroke-[#dadada]'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
            </svg>
          </button>
        )}
      </form>
      {open && valueForm === '' && (
        <ul className='absolute left-0 right-0 top-10 z-10 w-[440px] rounded-b-[20px] bg-[#34224f] px-[10px] py-[13px]'>
          <li className='px-[10px] pb-2 text-[14px] font-bold text-white'>Đề xuất cho bạn</li>
          {dataRecommendKeyword &&
            dataRecommendKeyword.map((item, index) => (
              <li
                aria-hidden
                onMouseDown={() => handleClick(item.keyword)}
                key={index}
                className={`flex cursor-pointer items-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded px-[10px] py-2 hover:bg-[#ffffff1a] ${
                  index === selectedItem ? 'bg-[#ffffff1a]' : ''
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='#d8d7d8'
                  className='h-[18px] w-[18px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
                  />
                </svg>
                <span className='text-[14px] text-white'>{item.keyword}</span>
              </li>
            ))}
        </ul>
      )}
      {open && valueForm !== '' && (
        <ul className='absolute left-0 right-0 top-10 z-10 w-[440px] rounded-b-[20px] bg-[#34224f] px-[10px] py-[13px]'>
          <li className='px-[10px] pb-2 text-[14px] font-bold text-white'>Từ khóa liên quan</li>
          {dataSuggestKeyword && (
            <>
              {dataSuggestKeyword.map((item, index) => (
                <li
                  key={index}
                  aria-hidden
                  onMouseDown={() => handleClick(item.keyword)}
                  className={`flex cursor-pointer items-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded px-[10px] py-2 hover:bg-[#ffffff1a] ${
                    index === selectedItem ? 'bg-[#ffffff1a]' : ''
                  }`}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    className='h-[19px] w-[19px] stroke-[#9892a0]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                    />
                  </svg>
                  <span className='text-[14px] text-white'>{item.keyword}</span>
                </li>
              ))}
              <li
                aria-hidden
                onMouseDown={() => handleClick(valueForm)}
                className={`flex cursor-pointer items-center gap-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded px-[10px] py-2 hover:bg-[#ffffff1a] ${
                  selectedItem === dataSuggestKeyword.length ? 'bg-[#ffffff1a]' : ''
                }`}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  className='h-[19px] w-[19px] stroke-[#9892a0]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
                <span className='text-[14px] text-white'>{`Tìm kiếm "${valueForm}"`}</span>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  )
}
export default Search
