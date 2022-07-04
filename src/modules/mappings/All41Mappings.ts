import { WalletPool } from "types/All41Types"
import BN from 'bn.js'
import { bigNumberTenPow18, web3BNToFloatString } from "modules/web3/utils/Web3Utils"

export const mapSubgraphToWalletPool = ({ subgraphWalletPool }: any): WalletPool => {

  const cDaiInPoolBN = new BN(subgraphWalletPool?.cDaiInPool)
  const cDaiInPool = web3BNToFloatString(cDaiInPoolBN, bigNumberTenPow18, 18)
  const daiInPoolBN = new BN(subgraphWalletPool?.daiInPool)
  const daiInPool = web3BNToFloatString(daiInPoolBN, bigNumberTenPow18, 18)
  const interestRedeemableBN = daiInPoolBN.sub(cDaiInPoolBN) || 0
  const interestRedeemable = web3BNToFloatString(interestRedeemableBN, bigNumberTenPow18, 18)

  return {
    id: subgraphWalletPool?.id,
    wallet: subgraphWalletPool?.wallet,
    cDaiInPoolBN,
    cDaiInPool,
    daiInPoolBN,
    daiInPool,
    interestRedeemableBN,
    interestRedeemable,
  }
}
