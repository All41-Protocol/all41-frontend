import { All41Deposit, All41Withdrawal, WalletPool } from "types/All41Types"
import BN from 'bn.js'
import { bigNumberTenPow18, web3BNToFloatString } from "modules/web3/utils/Web3Utils"
import { useWalletStore } from "stores/walletStore"
import { TX_TYPES } from "modules/web3/components/TradeCompleteModal"

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

export const mapSubgraphToAll41Deposit = async ({ subgraphAll41Deposit }: any): Promise<All41Deposit> => {

  const cDaiInPoolBN = new BN(subgraphAll41Deposit?.cDaiInPool)
  const cDaiInPool = web3BNToFloatString(cDaiInPoolBN, bigNumberTenPow18, 18)
  const daiInPoolBN = new BN(subgraphAll41Deposit?.daiInPool)
  const daiInPool = web3BNToFloatString(daiInPoolBN, bigNumberTenPow18, 18)
  const totalCostBN = new BN(subgraphAll41Deposit?.totalCost)
  const totalCost = web3BNToFloatString(totalCostBN, bigNumberTenPow18, 18)
  const daiAmountBN = new BN(subgraphAll41Deposit?.daiAmount)
  const daiAmount = web3BNToFloatString(daiAmountBN, bigNumberTenPow18, 18)
  const tradingFeeInvestedBN = new BN(subgraphAll41Deposit?.tradingFeeInvested)
  const tradingFeeInvested = web3BNToFloatString(tradingFeeInvestedBN, bigNumberTenPow18, 18)

  const web3 = useWalletStore.getState().web3
  const tx =  await web3.eth.getTransaction(subgraphAll41Deposit?.id)
  const block = await web3.eth.getBlock(tx.blockNumber as any)

  return {
    txHash: subgraphAll41Deposit?.id,
    wallet: subgraphAll41Deposit?.wallet,
    sender: subgraphAll41Deposit?.sender,
    cDaiInPoolBN,
    cDaiInPool,
    daiInPoolBN,
    daiInPool,
    totalCostBN,
    totalCost,
    daiAmountBN,
    daiAmount,
    tradingFeeInvestedBN,
    tradingFeeInvested,
    timestamp: new Date(parseFloat(block.timestamp.toString()) * 1000),  // timestamp is unix timestamp. Must convert to ms by multiplying by 1000 before passing into date object
    txType: TX_TYPES.DEPOSIT,
  }
}

export const mapSubgraphToAll41Withdrawal = async ({ subgraphAll41Withdrawal }: any): Promise<All41Withdrawal> => {

  const cDaiInPoolBN = new BN(subgraphAll41Withdrawal?.cDaiInPool)
  const cDaiInPool = web3BNToFloatString(cDaiInPoolBN, bigNumberTenPow18, 18)
  const daiInPoolBN = new BN(subgraphAll41Withdrawal?.daiInPool)
  const daiInPool = web3BNToFloatString(daiInPoolBN, bigNumberTenPow18, 18)
  const daiRedeemedBN = new BN(subgraphAll41Withdrawal?.daiRedeemed)
  const daiRedeemed = web3BNToFloatString(daiRedeemedBN, bigNumberTenPow18, 18)

  const web3 = useWalletStore.getState().web3
  const tx =  await web3.eth.getTransaction(subgraphAll41Withdrawal?.id)
  const block = await web3.eth.getBlock(tx.blockNumber as any)

  return {
    txHash: subgraphAll41Withdrawal?.id,
    wallet: subgraphAll41Withdrawal?.wallet,
    cDaiInPoolBN,
    cDaiInPool,
    daiInPoolBN,
    daiInPool,
    daiRedeemedBN,
    daiRedeemed,
    timestamp: new Date(parseFloat(block.timestamp.toString()) * 1000), // timestamp is unix timestamp. Must convert to ms by multiplying by 1000 before passing into date object
    txType: TX_TYPES.WITHDRAW,
  }
}
