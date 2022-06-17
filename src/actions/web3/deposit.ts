import { useContractStore } from 'stores/contractStore'

/**
 * Deposit DAI into the Wallet Pool of a recipient wallet
 */
export default function deposit(
  recipientAddress: string,
  daiAmount: number,
) {
  const all41Exchange = useContractStore.getState().all41ExchangeContract

  if (!all41Exchange) {
    console.error(`all41Exchange not set correctly`)
    return null
  }

  try {
    return all41Exchange.methods
      .depositToWalletPool(
        recipientAddress,
        daiAmount,
      )
      .send()
  } catch (error) {
    console.error('all41Exchange.methods.depositToWalletPool failed')
    return null
  }
}
