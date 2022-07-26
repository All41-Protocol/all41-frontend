import { ExternalLinkIcon } from '@heroicons/react/outline'
import { subgraphGetAllDepositsAndWithdrawals } from 'actions/subgraph/subgraphGetAllDepositsAndWithdrawals'
import { subgraphGetAllPools } from 'actions/subgraph/subgraphGetAllPools'
import classNames from 'classnames'
import A from 'components/A'
import DefaultLayout from 'modules/layouts/DefaultLayout'
import { convertAccountName } from 'modules/wallet/utils/WalletUtils'
import { TX_TYPES } from 'modules/web3/components/TradeCompleteModal'
import type { NextPage } from 'next'
import { ReactElement, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

const infiniteQueryConfig = {
  getNextPageParam: (lastGroup: any, allGroups: any) => {
    const morePagesExist = lastGroup?.length === TOKENS_PER_PAGE

    if (!morePagesExist) {
      return false
    }

    return allGroups.length * TOKENS_PER_PAGE
  },
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  enabled: true,
  keepPreviousData: true,
}

const TOKENS_PER_PAGE = 10

enum HOME_VIEW {
  TX_DATA,
  ALL_POOLS,
}

const Home: NextPage = () => {

  const [homeView, setHomeView] = useState(HOME_VIEW.TX_DATA)

  const {
    data: infiniteAllPoolsData,
    isFetching: isAllPoolsDataLoading,
    fetchNextPage: fetchMoreAllPools,
    refetch: refetchAllPools,
    hasNextPage: canFetchMoreAllPools,
  } = useInfiniteQuery(
    ['all-pools'],
    ({ pageParam = 0 }) => subgraphGetAllPools({ skip: pageParam, limit: TOKENS_PER_PAGE }),
    infiniteQueryConfig
  )

  const allPools = infiniteAllPoolsData?.pages[0] || []

  const {
    data: infiniteTxData,
    isFetching: isTxDataLoading,
    fetchNextPage: fetchMoreTx,
    refetch: refetchTx,
    hasNextPage: canFetchMoreTx,
  } = useInfiniteQuery(
    ['all-tx'],
    ({ pageParam = 0 }) => subgraphGetAllDepositsAndWithdrawals({ skip: pageParam, limit: TOKENS_PER_PAGE }),
    infiniteQueryConfig
  )

  return (
    <div>

      <div className="md:max-w-[60rem] mx-auto mt-10 text-center text-white">
        <div className="font-extrabold text-3xl">Earn passive income. Together.</div>
        <A
          href="/about"
          className="underline hover:text-blue-600 opacity-60 cursor-pointer"
        >
          <span>How it Works</span>
          <ExternalLinkIcon className="w-5 inline ml-1 mb-1" />
        </A>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-6 text-white">
        <button
          onClick={() => setHomeView(HOME_VIEW.TX_DATA)}
          className={classNames(
            homeView === HOME_VIEW.TX_DATA && 'bg-black/[.1] text-blue-600 border-blue-600',
            "text-2xl font-bold px-4 py-2 border rounded-lg"
          )}
        >
          Transactions
        </button>
        <button
          onClick={() => setHomeView(HOME_VIEW.ALL_POOLS)}
          className={classNames(
            homeView === HOME_VIEW.ALL_POOLS && 'bg-black/[.1] text-blue-600 border-blue-600',
            "text-2xl font-bold px-4 py-2 border rounded-lg"
          )}
        >
          Pools
        </button>
      </div>

      {homeView === HOME_VIEW.TX_DATA && (
        <>
          {/* Desktop and tablet */}
          <div className="hidden md:block max-w-[40rem] mx-auto text-white text-left text-lg mt-6">
            {infiniteTxData && infiniteTxData.pages.length > 0
              && infiniteTxData.pages.map((page: any, pInd) => page.map((tx: any, tInd: any) => {

              return (
                <div className="border-b mb-4 pb-4" key={tInd}>
                  {tx.txType === TX_TYPES.DEPOSIT && (
                    <div>{parseFloat(tx.daiAmount)} DAI deposit by <A href={`/pool/${tx.sender}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.sender)}</A> to <A href={`/pool/${tx.wallet}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.wallet)}</A> ({tx.timestamp.toLocaleString()})</div>
                  )}

                  {tx.txType === TX_TYPES.WITHDRAW && (
                    <div>{parseFloat(tx.daiRedeemed)} DAI withdrawal by <A href={`/pool/${tx.wallet}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.wallet)}</A> ({tx.timestamp.toLocaleString()})</div>
                  )}
                </div>
              )
            }))}

            {isTxDataLoading && (
              <div className="my-4 text-yellow-600 text-base">Transactions loading...</div>
            )}

            {canFetchMoreTx && (
              <button
                onClick={() => fetchMoreTx()}
                className="px-3 py-2 bg-blue-600 rounded mt-4 text-base"
              >
                Load more
              </button>
            )}

          </div>

          {/* Mobile */}
          <div className="md:hidden w-full px-4 text-white text-left text-base mt-6">
            {infiniteTxData && infiniteTxData.pages.length > 0
              && infiniteTxData.pages.map((page: any, pInd) => page.map((tx: any, tInd: any) => {

              return (
                <div className="border-b mb-4 pb-4" key={tInd}>
                  {tx.txType === TX_TYPES.DEPOSIT && (
                    <div>{parseFloat(tx.daiAmount)} DAI deposit by <A href={`/pool/${tx.sender}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.sender)}</A> to <A href={`/pool/${tx.wallet}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.wallet)}</A> ({tx.timestamp.toLocaleString()})</div>
                  )}

                  {tx.txType === TX_TYPES.WITHDRAW && (
                    <div>{parseFloat(tx.daiRedeemed)} DAI withdrawal by <A href={`/pool/${tx.wallet}`} className="font-bold hover:underline hover:text-blue-600">{convertAccountName(tx.wallet)}</A> ({tx.timestamp.toLocaleString()})</div>
                  )}
                </div>
              )
            }))}

            {isTxDataLoading && (
              <div className="my-4 text-yellow-600 text-base">Transactions loading...</div>
            )}

            {canFetchMoreTx && (
              <button
                onClick={() => fetchMoreTx()}
                className="px-3 py-2 bg-blue-600 rounded mt-4 text-base"
              >
                Load more
              </button>
            )}

          </div>
        </>
      )}
      
      {/* Start of table */}
      {homeView === HOME_VIEW.ALL_POOLS && (
        <div className="max-w-[60rem] mx-auto">
          <div className="max-w-[60rem] mx-auto mt-10 bg-white text-black rounded-t-lg">

            <div className="flex items-center px-8 py-4 rounded-t-lg border-b">

              <div className="w-[40%] font-bold">Wallet</div>
              <div className="w-[20%] font-bold">Amount Stored</div>
              <div className="w-[20%] font-bold">Total Redeemable</div>
              <div className="w-[20%] font-bold">Interest Redeemable</div>

            </div>

            {infiniteAllPoolsData && infiniteAllPoolsData.pages.length > 0
              && infiniteAllPoolsData.pages.map((page: any, pageInd) => page.map((pool: any, pInd: any) => {
              const displayUsernameOrWallet = convertAccountName(
                pool?.wallet
              )

              return (
                <div className="flex items-start px-8 py-4 text-xl" key={pInd}>

                  <div className="w-[40%]">
                    <A href={`/pool/${pool?.wallet}`} className="font-bold hover:underline hover:text-blue-600">
                      {displayUsernameOrWallet}
                    </A>
                  </div>
                  <div className="w-[20%]">${parseFloat(pool?.daiInPool)}</div>
                  <div className="w-[20%]">${parseFloat(pool?.cDaiInPool)}</div>
                  <div className="w-[20%]">${parseFloat(pool?.interestRedeemable) || '0'}</div>

                </div>
              )
            }))}

          </div>

          {isAllPoolsDataLoading && (
            <div className="my-4 text-yellow-600">Wallet Pools loading...</div>
          )}

          {canFetchMoreAllPools && (
            <button
              onClick={() => fetchMoreAllPools()}
              className="px-3 py-2 bg-blue-600 rounded mt-4 text-white"
            >
              Load more
            </button>
          )}

        </div>
      )}

    </div>
  )
}

(Home as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default Home
