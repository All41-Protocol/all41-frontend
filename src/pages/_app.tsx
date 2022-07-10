import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { ReactElement, useEffect } from 'react'
import { AppProps } from 'next/app'
import { NextPage } from 'next'
import Web3 from 'web3'
import { initContractsFromWeb3 } from 'stores/contractStore'
import { NETWORK } from 'stores/networks'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3ReactManager from 'modules/wallet/components/Web3ReactManager'
import ModalRoot from 'modules/modals/ModalRoot'
import WrongNetworkOverlay from 'modules/web3/components/WrongNetworkOverlay'
import { GlobalContextComponent } from 'stores/GlobalContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { setWeb3 } from 'stores/walletStore'

function getLibrary(provider: any): Web3 {
  return new Web3(provider)
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement<any, any>
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  const { active } = useWeb3React()

  useEffect(() => {
    // If no wallet is connected, then use Infura ETH node provider (not free). When wallet is connected, wallet lets you use contracts for FREE
    if (!active) {
      const web3 = new Web3(NETWORK.getRPCURL())
      initContractsFromWeb3(web3)
      setWeb3(web3, undefined)
    }
  }, [active])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalContextComponent>
          <Web3ReactProvider getLibrary={getLibrary}>

            <Web3ReactManager>
              {getLayout(<Component {...pageProps} />)}
            </Web3ReactManager>

            <WrongNetworkOverlay />
            <ModalRoot />

          </Web3ReactProvider>
        </GlobalContextComponent>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
