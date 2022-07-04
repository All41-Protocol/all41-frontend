import BN from 'bn.js'

export type WalletPool = {
  id: string
  wallet: string
  cDaiInPoolBN: BN
  cDaiInPool: string
  daiInPoolBN: BN
  daiInPool: string
  interestRedeemableBN: BN
  interestRedeemable: string
}