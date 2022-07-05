import { ExternalLinkIcon } from '@heroicons/react/outline'
import { subgraphGetAllPools } from 'actions/subgraph/subgraphGetAllPools'
import A from 'components/A'
import DefaultLayout from 'modules/layouts/DefaultLayout'
import { convertAccountName } from 'modules/wallet/utils/WalletUtils'
import type { NextPage } from 'next'
import { ReactElement } from 'react'
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

const Home: NextPage = () => {

  const {
    data: infiniteAllPoolsData,
    isFetching: isAllPoolsDataLoading,
    fetchNextPage: fetchMoreAllPools,
    refetch: refetchAllPools,
    hasNextPage: canFetchMoreAllPools,
  } = useInfiniteQuery(
    ['all-pools'],
    ({ pageParam = 0 }) => subgraphGetAllPools({ skip: TOKENS_PER_PAGE, limit: pageParam }),
    infiniteQueryConfig
  )

  const allPools = infiniteAllPoolsData?.pages[0] || []

  return (
    <div>

      <div className="max-w-[60rem] mx-auto mt-10 text-center text-white">
        <div className="font-extrabold text-3xl">DEPOSIT. EARN. WITHDRAW. TOGETHER.</div>
        <A
          href="/about"
          className="underline hover:text-blue-600 opacity-60 cursor-pointer"
        >
          <span>How it Works</span>
          <ExternalLinkIcon className="w-5 inline ml-1 mb-1" />
        </A>
      </div>
      
      {/* Start of table */}
      <div className="max-w-[60rem] mx-auto mt-10 bg-white text-black rounded-t-lg">

        {/* Header with column titles */}
        <div className="flex items-center px-8 py-4 rounded-t-lg border-b">

          <div className="w-[40%]">Wallet</div>
          <div className="w-[20%]">Amount Stored</div>
          <div className="w-[20%]">Total Redeemable</div>
          <div className="w-[20%]">Interest Redeemable</div>

        </div>

        {allPools && allPools.length > 0 && allPools.map((pool, pInd) => {
          const displayUsernameOrWallet = convertAccountName(
            pool?.wallet
          )

          return (
            <div className="flex items-start px-8 py-4" key={pInd}>

              <div className="w-[40%]">
                <A href={`https://etherscan.io/address/${pool?.wallet}`} className="font-bold hover:underline hover:text-blue-600">
                  {displayUsernameOrWallet}
                </A>
              </div>
              <div className="w-[20%]">${parseFloat(pool?.daiInPool)}</div>
              <div className="w-[20%]">${parseFloat(pool?.cDaiInPool)}</div>
              <div className="w-[20%]">${parseFloat(pool?.interestRedeemable) || '0'}</div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

(Home as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default Home
