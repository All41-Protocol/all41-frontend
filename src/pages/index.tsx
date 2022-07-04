import { subgraphGetAllPools } from 'actions/subgraph/subgraphGetAllPools'
import DefaultLayout from 'modules/layouts/DefaultLayout'
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

  console.log('infiniteAllPoolsData==', infiniteAllPoolsData)
  console.log('allPools==', allPools)

  return (
    <div>
      
    </div>
  )
}

(Home as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default Home
