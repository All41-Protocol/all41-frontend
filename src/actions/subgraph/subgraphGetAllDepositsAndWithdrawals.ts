import { request } from 'graphql-request'
import { mapSubgraphToAll41Deposit, mapSubgraphToAll41Withdrawal, mapSubgraphToWalletPool } from 'modules/mappings/All41Mappings'
import getQueryAllDepositsAndWithdrawals from 'modules/subgraph/queries/getQueryAllDepositsAndWithdrawals'
import { NETWORK } from "stores/networks"
import { All41Deposit, All41Withdrawal, WalletPool } from 'types/All41Types'

type Props = {
  skip: number
  limit: number
}

export async function subgraphGetAllDepositsAndWithdrawals({ skip, limit }: Props): Promise<All41Deposit[] | All41Withdrawal[]> {
  const HTTP_GRAPHQL_ENDPOINT = NETWORK.getSubgraphURL()

  let result = null
  try {
    result = await request(
      HTTP_GRAPHQL_ENDPOINT,
      getQueryAllDepositsAndWithdrawals({ skip, limit })
    )
  } catch (error) {
    console.error('getQueryAllDepositsAndWithdrawals failed')
    return []
  }

  const all41Deposits = await Promise.all(result?.all41Deposits?.map(async (d: any) => await mapSubgraphToAll41Deposit({ subgraphAll41Deposit: d })))
  const all41Withdrawals = await Promise.all(result?.all41Withdrawals?.map(async (w: any) => await mapSubgraphToAll41Withdrawal({ subgraphAll41Withdrawal: w })))

  const all41Txs = all41Deposits.concat(all41Withdrawals)
  all41Txs.sort((date1, date2) => date2.timestamp - date1.timestamp)
  const paginatedTxs = all41Txs.slice(skip, skip + limit)

  return paginatedTxs
}
