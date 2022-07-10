import { subgraphGetOnePool } from 'actions/subgraph/subgraphGetOnePool'
import DefaultLayout from 'modules/layouts/DefaultLayout'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import { useQuery } from 'react-query'

const WalletPool: NextPage = () => {
  const router = useRouter()
  const { walletAddress } = router.query

  const { data: poolData } = useQuery<any>([walletAddress], () =>
    subgraphGetOnePool({
      walletAddress,
    } as any)
  )

  return (
    <div className="max-w-[60rem] mx-auto mt-10 pb-20 text-white">

      <span className="text-lg"><span className="font-bold">Wallet Address</span>: {walletAddress}</span>

      {/* Start of table */}
      <div className="w-full mx-auto mt-10 bg-white text-black rounded-t-lg">

        {/* Header with column titles */}
        <div className="flex items-center px-8 py-4 rounded-t-lg border-b">

          <div className="w-[33.333%] font-bold">Amount Stored</div>
          <div className="w-[33.333%] font-bold">Total Redeemable</div>
          <div className="w-[33.333%] font-bold">Interest Redeemable</div>

        </div>

            <div className="flex items-start px-8 py-4 text-xl">

              <div className="w-[33.333%]">${parseFloat(poolData?.daiInPool)}</div>
              <div className="w-[33.333%]">${parseFloat(poolData?.cDaiInPool)}</div>
              <div className="w-[33.333%]">${parseFloat(poolData?.interestRedeemable) || '0'}</div>

            </div>

      </div>
      
    </div>
  )
}

(WalletPool as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default WalletPool
