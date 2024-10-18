import React, { createContext, useState } from 'react'
import { ItemSections } from '~/types/home'
import {
  getHistoryFromLS,
  getIdPlaylistFromLS,
  getPlaylistFromLS,
  getSongFromLS,
  getStateAsideRightFromLS
} from '~/utils/song'

interface appContextInterface {
  stateIdSong: string
  setStateIdSong: React.Dispatch<React.SetStateAction<string>>
  statePlaySong: boolean
  setStatePlaySong: React.Dispatch<React.SetStateAction<boolean>>
  stateAsideRight: boolean
  setStateAsideRight: React.Dispatch<React.SetStateAction<boolean>>
  statePlaylist: ItemSections[]
  setStatePlaylist: React.Dispatch<React.SetStateAction<ItemSections[]>>
  stateHistory: ItemSections[]
  setStateHistory: React.Dispatch<React.SetStateAction<ItemSections[]>>
  stateIdPlaylist: string
  setStateIdPlaylist: React.Dispatch<React.SetStateAction<string>>
}

const initialAppContext: appContextInterface = {
  stateIdSong: getSongFromLS() || '',
  setStateIdSong: () => null,
  statePlaySong: false,
  setStatePlaySong: () => null,
  stateAsideRight: getStateAsideRightFromLS() ? (getStateAsideRightFromLS() === 'true' ? true : false) : true,
  setStateAsideRight: () => null,
  statePlaylist: getPlaylistFromLS() || [],
  setStatePlaylist: () => null,
  stateHistory: getHistoryFromLS() || [],
  setStateHistory: () => null,
  stateIdPlaylist: getIdPlaylistFromLS() || '',
  setStateIdPlaylist: () => null
}

export const AppContext = createContext<appContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [stateIdSong, setStateIdSong] = useState<string>(initialAppContext.stateIdSong)
  const [statePlaySong, setStatePlaySong] = useState<boolean>(initialAppContext.statePlaySong)
  const [stateAsideRight, setStateAsideRight] = useState<boolean>(initialAppContext.stateAsideRight)
  const [statePlaylist, setStatePlaylist] = useState<ItemSections[]>(initialAppContext.statePlaylist)
  const [stateHistory, setStateHistory] = useState<ItemSections[]>(initialAppContext.stateHistory)
  const [stateIdPlaylist, setStateIdPlaylist] = useState<string>(initialAppContext.stateIdPlaylist)
  return (
    <AppContext.Provider
      value={{
        stateIdSong,
        setStateIdSong,
        setStatePlaySong,
        statePlaySong,
        stateAsideRight,
        setStateAsideRight,
        setStateHistory,
        setStatePlaylist,
        stateHistory,
        statePlaylist,
        stateIdPlaylist,
        setStateIdPlaylist
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
