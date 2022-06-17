import { getERC20Contract } from 'stores/contractStore'
import BN from 'bn.js'

export default function approveToken(
  tokenAddress: string,
  spenderAddress: string,
  amount: BN
) {
  const tokenContract = getERC20Contract(tokenAddress)
  return tokenContract?.methods.approve(spenderAddress, amount).send()
}
