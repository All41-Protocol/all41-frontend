import BN from 'bn.js'
import { TX_TYPES } from 'modules/web3/components/TradeCompleteModal'

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

export type All41Deposit = {
  txHash: string  // This is ID in subgraph and is actually the txHash..super conventient
  wallet: string
  sender: string
  cDaiInPoolBN: BN
  cDaiInPool: string
  daiInPoolBN: BN
  daiInPool: string
  totalCostBN: BN
  totalCost: string
  daiAmountBN: BN
  daiAmount: string
  tradingFeeInvestedBN: BN
  tradingFeeInvested: string
  timestamp: Date
  txType: TX_TYPES
}

export type All41Withdrawal = {
  txHash: string  // This is ID in subgraph and is actually the txHash..super conventient
  wallet: string
  cDaiInPoolBN: BN
  cDaiInPool: string
  daiInPoolBN: BN
  daiInPool: string
  daiRedeemedBN: BN
  daiRedeemed: string
  timestamp: Date
  txType: TX_TYPES
}
