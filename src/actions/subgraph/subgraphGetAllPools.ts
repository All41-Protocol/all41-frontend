import { request } from 'graphql-request'
import { mapSubgraphToWalletPool } from 'modules/mappings/All41Mappings'
import getQueryAllPools from "modules/subgraph/queries/getQueryAllPools"
import { NETWORK } from "stores/networks"
import { WalletPool } from 'types/All41Types'

type Props = {
  skip: number
  limit: number
}

export async function subgraphGetAllPools({ skip, limit }: Props): Promise<WalletPool[]> {
  const HTTP_GRAPHQL_ENDPOINT = NETWORK.getSubgraphURL()

  let result = null
  try {
    result = await request(
      HTTP_GRAPHQL_ENDPOINT,
      getQueryAllPools({ skip, limit })
    )
  } catch (error) {
    console.error('getQueryAllPools failed')
    return []
  }

  return result?.walletPools?.map((pool: any) => mapSubgraphToWalletPool({ subgraphWalletPool: pool }))
}