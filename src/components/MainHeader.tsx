import classNames from "classnames"
import ModalService from "modules/modals/ModalService"
import WalletStatus from "modules/wallet/components/WalletStatus"
import Web3ActionsModal from "modules/web3/components/Web3ActionsModal"

type Props = {
  bgColor?: string
  textColor?: string
}

const MainHeader = ({ bgColor = 'bg-black/[.6]', textColor = 'text-white' }: Props) => {

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

          <span className="w-auto h-full text-2xl font-bold">
            All41
          </span>

          <button
            onClick={() => ModalService.open(Web3ActionsModal)}
            className="px-4 py-2 rounded-lg bg-blue-600 font-bold"
          >
            Deposit
          </button>

          <WalletStatus />

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