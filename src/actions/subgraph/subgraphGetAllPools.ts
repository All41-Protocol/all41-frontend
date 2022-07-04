import { request } from 'graphql-request'
import getQueryAllPools from "modules/subgraph/queries/getQueryAllPools"
import { NETWORK } from "stores/networks"

type Props = {
  skip: number
  limit: number
}

export async function subgraphGetAllPools({ skip, limit }: Props): Promise<any[]> {
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

  console.log('result==', result)

  return result?.walletPools || []
}