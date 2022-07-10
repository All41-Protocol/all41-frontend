import { gql } from 'graphql-request'

type Props = {
  skip: number
  limit: number
}

export default function getQueryAllDepositsAndWithdrawals({ skip, limit }: Props): string {

  // TODO: add pagination
  return gql`
    {
      all41Deposits {
        id
        wallet
        sender
        daiInPool
        cDaiInPool
        totalCost
        daiAmount
        tradingFeeInvested
      }
      all41Withdrawals {
        id
        wallet
        daiInPool
        cDaiInPool
        daiRedeemed
      }
    }
  `
}
