import { gql } from 'graphql-request'

type Props = {
  skip: number
  limit: number
}

export default function getQueryAllPools({ skip, limit }: Props): string {

  // TODO: add pagination
  return gql`
    {
      walletPools {
        id
        wallet
        daiInPool
        cDaiInPool
      }
    }
  `
}
