import React, { useState } from 'react'
import { NETWORK, INetworkSpecifics } from 'stores/networks'

interface GlobalContextState {
  requiredNetwork: null | INetworkSpecifics
  setRequiredNetwork: (val: INetworkSpecifics) => void
  isTxPending: boolean
  setIsTxPending: (val: boolean) => void
}

export const initialState: GlobalContextState = {
  requiredNetwork: null,
  setRequiredNetwork: (val: INetworkSpecifics) => {},
  isTxPending: false,
  setIsTxPending: (val: boolean) => {},
}

export const GlobalContext = React.createContext(initialState)

interface Props {}

export const GlobalContextComponent: React.FC<Props> = ({ children }: any) => {
  const [requiredNetwork, setRequiredNetwork] = useState(NETWORK)
  const [isTxPending, setIsTxPending] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        requiredNetwork,
        setRequiredNetwork,
        isTxPending,
        setIsTxPending,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
