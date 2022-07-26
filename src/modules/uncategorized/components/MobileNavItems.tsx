import { Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import A from 'components/A'
import ModalService from 'modules/modals/ModalService'
import WalletModal from 'modules/wallet/components/WalletModal'
import { useRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import { GlobalContext } from 'stores/GlobalContext'
import { useWalletStore } from 'stores/walletStore'
import useOnClickOutside from '../hooks/useOnClickOutside'

type Props = {
  isMobileNavOpen: boolean
}

const MobileNavItems = ({ isMobileNavOpen }: Props) => {
  const router = useRouter()
  const { setOnWalletConnectedCallback } = useContext(GlobalContext)
  const ref = useRef() as any
  const [isOpen, setIsOpen] = useState(false)

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

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
    <Transition
      show={isMobileNavOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      className="md:hidden w-full mt-4"
    >
      <div className="w-full px-2 pt-2 pb-3 space-y-3 sm:px-3 bg-gradient-to-b from-[#02194D] to-[#011032] text-white">
        
        <div className="relative px-3 py-3 border-y">
          <div
            className="inline-flex items-center text-md transition duration-150 ease-in-out rounded-md cursor-pointer hover:text-blue-600"
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

        <div
          onClick={onMyFundsClicked}
          className="px-3 font-bold"
        >
          My Funds
        </div>


      </div>
    </Transition>
  )
}

export default MobileNavItems
