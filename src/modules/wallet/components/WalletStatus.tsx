import React from 'react'

import DotRed from '../../../assets/dotred.svg'
import DotGreen from '../../../assets/dotgreen.svg'
import { useWeb3React } from '@web3-react/core'
import ModalService from 'modules/modals/ModalService'
import WalletModal from './WalletModal'

export default function WalletStatus() {
  const { active, account } = useWeb3React()

  const openWalletModal = () => {
    ModalService.open(WalletModal)
  }

  return (
    <React.Fragment>
      <div
        className="flex flex-row items-center px-2 cursor-pointer justify-self-end"
        onClick={openWalletModal}
      >
        {!active && <DotRed className="w-4 h-4" />}
        {!active && (
          <div className="ml-3 text-gray-400 align-middle whitespace-nowrap">
            No wallet
          </div>
        )}

        {active && <DotGreen className="w-4 h-4" />}
        {active && (
          <div className="ml-3 text-gray-400 align-middle whitespace-nowrap">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
