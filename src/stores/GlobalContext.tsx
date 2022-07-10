import React, { useState } from 'react'
import { NETWORK, INetworkSpecifics } from 'stores/networks'

interface GlobalContextState {
  onWalletConnectedCallback: () => void
  setOnWalletConnectedCallback: (f: () => void) => void
  requiredNetwork: null | INetworkSpecifics
  setRequiredNetwork: (val: INetworkSpecifics) => void
  isTxPending: boolean
  setIsTxPending: (val: boolean) => void
}

export const initialState: GlobalContextState = {
  onWalletConnectedCallback: () => {},
  setOnWalletConnectedCallback: (f: () => void) => {},
  requiredNetwork: null,
  setRequiredNetwork: (val: INetworkSpecifics) => {},
  isTxPending: false,
  setIsTxPending: (val: boolean) => {},
}

export const GlobalContext = React.createContext(initialState)

interface Props {}

export const GlobalContextComponent: React.FC<Props> = ({ children }: any) => {
  const [onWalletConnectedCallback, setOnWalletConnectedCallback] = useState(
    () => () => {}
  )
  const [requiredNetwork, setRequiredNetwork] = useState(NETWORK)
  const [isTxPending, setIsTxPending] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        onWalletConnectedCallback,
        setOnWalletConnectedCallback,
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
