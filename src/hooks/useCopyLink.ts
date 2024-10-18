import toast from 'react-hot-toast'

const useCopyLink = () => {
  const notify = () =>
    toast('Link đã sao chép vào clipboard.', {
      style: {
        borderBottom: '4px solid #41f315de'
      }
    })

  const copyToClipboard = (link: string) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}${link}`).then(() => {
      notify()
    })
  }

  return { copyToClipboard }
}

export default useCopyLink
