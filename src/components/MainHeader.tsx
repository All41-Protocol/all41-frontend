import classNames from "classnames"
import ModalService from "modules/modals/ModalService"
import WalletModal from "modules/wallet/components/WalletModal"
import WalletStatus from "modules/wallet/components/WalletStatus"
import Web3ActionsModal from "modules/web3/components/Web3ActionsModal"
import { useRouter } from "next/router"
import { useContext } from "react"
import { GlobalContext } from "stores/GlobalContext"
import { useWalletStore } from "stores/walletStore"
import A from "./A"

type Props = {
  bgColor?: string
  textColor?: string
}

const MainHeader = ({ bgColor = 'bg-black/[.6]', textColor = 'text-white' }: Props) => {
  const router = useRouter()
  const { setOnWalletConnectedCallback } = useContext(GlobalContext)

  const onDepositClicked = () => {
    if (!useWalletStore.getState().address) {
      setOnWalletConnectedCallback(() => () => {
        ModalService.open(Web3ActionsModal)
      })
      ModalService.open(WalletModal)
    } else {
      ModalService.open(Web3ActionsModal)
    }
  }

  const onMyFundsClicked = () => {
    if (!useWalletStore.getState().address) {
      setOnWalletConnectedCallback(() => () => {
        router.push(`/pool/${useWalletStore.getState().address}`)
      })
      ModalService.open(WalletModal)
    } else {
      router.push(`/pool/${useWalletStore.getState().address}`)
    }
  }

  return (
    <>
      {/* Desktop */}
      <div
        className={classNames(
          bgColor,
          textColor,
          'hidden md:flex justify-between items-center absolute z-[200] w-full px-2 py-3 overflow-none'
        )}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center space-x-2">

          <A href="/" className="w-auto h-full text-2xl font-bold">
            All41
          </A>

          <button
            onClick={onDepositClicked}
            className="px-4 py-2 rounded-lg bg-blue-600 font-bold"
          >
            Deposit/Withdraw
          </button>

          <WalletStatus />

          <button
            onClick={onMyFundsClicked}
            className="px-4 py-2 rounded-lg bg-blue-600 font-bold"
          >
            My Funds
          </button>

        </div>
      </div>

      {/* Mobile */}
      <div
        className={classNames(
          bgColor,
          textColor,
          'md:hidden absolute z-[200] w-full h-10 px-3 py-4 overflow-none flex justify-between items-center'
        )}
      >

      </div>
    </>
  )
}

export default MainHeader