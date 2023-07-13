const useGenerateLink = (link: string | undefined) => {
  const arrLink = link !== '' && link !== undefined ? link.replace('.html', '').split('/') : []
  const idPlaylist = arrLink.length > 0 ? arrLink[arrLink.length - 1] : ''
  const namePlaylist = arrLink.length > 0 ? arrLink[arrLink.length - 2] : ''

  return { idPlaylist, namePlaylist }
}

export default useGenerateLink
