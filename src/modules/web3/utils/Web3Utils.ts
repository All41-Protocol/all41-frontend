import Web3 from 'web3'
import BN from 'bn.js'
import BigNumber from 'bignumber.js'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const web3UintMax = new BN('2').pow(new BN('256')).sub(new BN('1'))
export const zeroBN = new BN('0')

export const bigNumberTenPow18 = new BigNumber('10').pow(new BigNumber('18'))

export function floatToWeb3BN(
  float: string,
  decimals: number,
  round: BigNumber.RoundingMode
) {
  const pow = new BigNumber('10').exponentiatedBy(decimals)
  const big = new BigNumber(float).multipliedBy(pow)
  return new BN(big.toFixed(0, round))
}

export function web3BNToFloatString(
  bn: BN,
  divideBy: BigNumber,
  decimals: number,
  roundingMode = BigNumber.ROUND_DOWN
): string {
  const converted = new BigNumber(bn.toString())
  const divided = converted.div(divideBy)
  return divided.toFixed(decimals, roundingMode)
}

/**
 * https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#tochecksumaddress
 * Will throw an exception if invalid ETH address
 */
export function toChecksumedAddress(addr: string): string {
  const web3 = new Web3()
  return web3.utils.toChecksumAddress(addr)
}

/**
 * @param addr -- The ETH address. It can be upper-case, lower-case, or both
 * @returns true if it is ETH address and false otherwise
 */
 export function isETHAddress(addr: string): boolean {
  try {
    toChecksumedAddress(addr)
    return true
  } catch (e) {
    return false
  }
}
