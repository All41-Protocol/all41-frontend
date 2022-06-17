import React, { useEffect, useContext } from 'react'
import { useWalletStore } from 'stores/walletStore'
import { INetworkSpecifics } from 'stores/networks'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { GlobalContext } from 'stores/GlobalContext'

const NoSSRWalletInterface = dynamic(() => import('modules/wallet/components/WalletInterface'), {
  ssr: false,
})

export default function WrongNetworkOverlay() {
  const web3 = useWalletStore((state) => state.web3)
  const web3ChainID = useWalletStore((state) => state.chainID)
  const { requiredNetwork } = useContext(GlobalContext) as {
    requiredNetwork: INetworkSpecifics
  }
  const isWrongNetwork = requiredNetwork.getChainID() !== web3ChainID
  const addNetworkParams = requiredNetwork.getAddNetworkParams()
  const switchNetworkParams = requiredNetwork.getSwitchNetworkParams()

  const show = web3 !== undefined && isWrongNetwork

  useEffect(() => {
    if (show) {
      window.scrollTo(0, 0)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [show])

  if (!show) {
    return <></>
  }

  const addOrSwitchNetwork = async () => {
    const { ethereum } = window as any

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [switchNetworkParams],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [addNetworkParams],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  return (
    <div className="absolute top-0 left-0 z-[500] w-screen h-screen bg-gray-200 dark:bg-gray-800">
      <div className="flex items-center justify-center w-full h-full overflow-auto">
        <div className="flex flex-col items-center">
          <div className="relative w-full h-32 md:h-64">
            <Image
              src="/logo.png"
              alt="Workflow logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h1 className="mt-5 text-2xl md:text-3xl">
            Change network selection
          </h1>
          <div className="mt-10 text-sm">
            Your wallet is connected to the wrong network.
          </div>
          <div className="text-sm">
            Please connect to{' '}
            <strong>{requiredNetwork.getHumanReadableNetworkName()}</strong> and
            try again.
          </div>
          {addNetworkParams !== undefined && (
            <button
              className="mt-5 p-2 text-lg font-bold text-brand-blue border border-brand-blue rounded-lg font-sf-compact-medium hover:bg-brand-blue hover:text-white"
              onClick={addOrSwitchNetwork}
            >
              Add or Switch Network
            </button>
          )}
          <div className="mt-5 bg-white border rounded dark:bg-gray-700 dark:border-gray-500 border-brand-gray-2">
            <NoSSRWalletInterface />
          </div>
        </div>
      </div>
    </div>
  )
}
