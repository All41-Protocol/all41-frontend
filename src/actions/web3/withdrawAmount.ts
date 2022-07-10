import { floatToWeb3BN } from 'modules/web3/utils/Web3Utils'
import { useContractStore } from 'stores/contractStore'
import BigNumber from 'bignumber.js'

/**
 * Withdraw DAI from the Wallet Pool
 */
export default function withdrawAmount(
  recipientAddress: string,
  daiAmount: string,
) {
  const all41Exchange = useContractStore.getState().all41ExchangeContract

  if (!all41Exchange) {
    console.error(`all41Exchange not set correctly`)
    return null
  }

  const daiAmountBN = floatToWeb3BN(
    daiAmount,
    18,
    BigNumber.ROUND_DOWN
  )

  try {
    return all41Exchange.methods
      .withdrawAmount(
        recipientAddress,
        daiAmountBN,
      )
      .send()
  } catch (error) {
    console.error('all41Exchange.methods.withdrawAmount failed')
    return null
  }
}
