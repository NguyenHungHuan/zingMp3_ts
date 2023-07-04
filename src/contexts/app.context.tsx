import React, { createContext, useState } from 'react'

interface appContextInterface {
  stateOpenPopover: boolean
  setStateOpenPopover: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: appContextInterface = {
  stateOpenPopover: false,
  setStateOpenPopover: () => null
}

export const AppContext = createContext<appContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [stateOpenPopover, setStateOpenPopover] = useState<boolean>(initialAppContext.stateOpenPopover)
  return (
    <AppContext.Provider 
    value={{stateOpenPopover, setStateOpenPopover}}>
      {children}
    </AppContext.Provider>
  )
}
