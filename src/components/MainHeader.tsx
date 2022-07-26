import { ChevronDownIcon, MenuIcon, SearchIcon, XIcon } from "@heroicons/react/solid"
import classNames from "classnames"
import ModalService from "modules/modals/ModalService"
import MobileNavItems from "modules/uncategorized/components/MobileNavItems"
import useOnClickOutside from "modules/uncategorized/hooks/useOnClickOutside"
import WalletModal from "modules/wallet/components/WalletModal"
import WalletStatus from "modules/wallet/components/WalletStatus"
import Web3ActionsModal from "modules/web3/components/Web3ActionsModal"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useRef, useState } from "react"
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

  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  const [inputTextSearch, setInputTextSearch] = useState('')

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

  const onSearchBarEnterPressed = (key: string) => {
    if (key === 'Enter') {
      router.push(`/pool/${inputTextSearch}`)
    }
  }

  const ref = useRef() as any
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

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
        <div className="max-w-7xl h-[2.5rem] mx-auto flex flex-wrap justify-between items-center space-x-2">

          <A href="/" className="contents w-auto h-full text-2xl font-bold">
            All41
          </A>

          <div className="relative">
            <div
              className="inline-flex items-center px-3 py-2 text-md transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-blue-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Social</span>
              <ChevronDownIcon className="w-5 h-5 mt-0.5" />
            </div>

            <div
              ref={ref}
              className={classNames(
                'relative z-[300]  transition-all origin-top-right transform scale-95 text-black -translate-y-0 bg-white dropdown-menu',
                isOpen ? 'visible' : 'invisible'
              )}
            >
              <div className="absolute left-0 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none dark:divide-gray-600 dark:border-gray-700">
                <A
                  href={`https://discord.gg/dm3VqGZCvf`}
                  onClick={() => {
                    setIsOpen(false) // Close subMenu when clicked on
                  }}
                  className="relative flex flex-row items-center w-full px-2 py-4 space-x-2 leading-5 transition-colors transform hover:bg-gray-100 hover:cursor-pointer dark:text-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800"
                >
                  Discord
                </A>

                <A
                  href={`https://twitter.com/all41protocol`}
                  onClick={() => {
                    setIsOpen(false) // Close subMenu when clicked on
                  }}
                  className="relative flex flex-row items-center w-full px-2 py-4 space-x-2 leading-5 transition-colors transform hover:bg-gray-100 hover:cursor-pointer dark:text-gray-200 dark:hover:bg-gray-900 dark:bg-gray-800"
                >
                  Twitter
                </A>

              </div>
            </div>
          </div>

          <button
            onClick={onDepositClicked}
            className="px-4 py-2 rounded-lg bg-blue-600 font-bold"
          >
            Deposit/Withdraw
          </button>

          <div className="relative md:w-[14rem] lg:w-[24rem] h-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-black" />
            </div>
            <input
              type="text"
              id="search-input"
              className={classNames(
                'block w-full h-full pl-10 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black bg-white placeholder-gray-500'
              )}
              placeholder="Search wallets..."
              onChange={(event) => setInputTextSearch(event.target.value)}
              onKeyDown={(event) => onSearchBarEnterPressed(event.key)}
            />
          </div>

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
          'md:hidden absolute z-[200] w-full h-16 py-4 overflow-none'
        )}
      >
        <div className="flex justify-between items-center md:hidden px-3">
          <button
            onClick={() => setMobileNavOpen(!isMobileNavOpen)}
            type="button"
            className="inline-flex pr-2 mr-1 bg-transparent focus:outline-none "
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileNavOpen ? (
              <MenuIcon className="w-6 h-6" />
            ) : (
              <XIcon className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={onDepositClicked}
            className="px-4 py-2 rounded-lg bg-blue-600 font-bold"
          >
            Deposit/Withdraw
          </button>

          <A href="/" className="contents w-auto h-full text-2xl font-bold">
            All41
          </A>

          {/* <div className="flex">
            <WalletStatusWithConnectButton />
          </div> */}
        </div>

        <MobileNavItems
          isMobileNavOpen={isMobileNavOpen}
        />
      </div>
    </>
  )
}

export default MainHeader