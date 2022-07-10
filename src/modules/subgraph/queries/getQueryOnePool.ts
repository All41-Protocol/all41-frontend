import { gql } from 'graphql-request'

type Props = {
  walletAddress: string
}

export default function getQueryOnePool({ walletAddress }: Props): string {
  return gql`
    {
      walletPools(where: { wallet: "${walletAddress}" }) {
        id
        wallet
        daiInPool
        cDaiInPool
      }
    }
  `
}
