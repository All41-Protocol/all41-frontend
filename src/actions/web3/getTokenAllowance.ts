import BN from 'bn.js'
import { useWalletStore } from 'stores/walletStore'
import { web3UintMax, ZERO_ADDRESS } from 'modules/web3/utils/Web3Utils'
import { getERC20Contract } from 'stores/contractStore'

export default async function getTokenAllowance(
  tokenAddress: string,
  spenderAddress: string
) {
  if (!tokenAddress || !spenderAddress) {
    return web3UintMax
  }

  if (tokenAddress === ZERO_ADDRESS) {
    return web3UintMax
  }

  const ownerAddress = useWalletStore.getState().address
  const tokenContract = getERC20Contract(tokenAddress)
  try {
    return new BN(
      tokenContract
        ? await tokenContract.methods
            .allowance(ownerAddress, spenderAddress)
            .call()
        : '0'
    )
  } catch (ex) {
    console.log(ex)
    throw new Error('Failed to get allowance')
  }
}
