import { useState, useEffect } from 'react'
import { useWalletStore } from 'stores/walletStore'
import { getERC20Contract } from 'stores/contractStore'
import BigNumber from 'bignumber.js'
import BN from 'bn.js'
import { web3BNToFloatString, ZERO_ADDRESS } from '../utils/Web3Utils'

export default function useBalance(
  tokenAddress: string, // This can be token or contract address
  userAddress: string, // This can be wallet or contract address. It's address you want to get balance of
  decimals: number,
  refreshToggle?: boolean // Used to refresh balance whenever needed
) {
  const [isLoading, setIsLoading] = useState(true)
  const [balanceBN, setBalanceBN] = useState(undefined)
  const [balance, setBalance] = useState(undefined)

  // Need walletAddress to detect when user changes wallet accounts
  const { web3, walletAddress, chainID } = useWalletStore((state) => ({
    web3: state.web3,
    walletAddress: state.address,
    chainID: state.chainID,
  }))

  useEffect(() => {
    let isCancelled = false

    function getBalance() {
      return new Promise<BN>((resolve) => {
        if (!web3 || !tokenAddress) {
          resolve(new BN('0'))
          return
        }

        try {
          if (tokenAddress === ZERO_ADDRESS) {
            web3.eth
              .getBalance(userAddress)
              .then((value) => {
                resolve(new BN(value))
              })
              .catch((error) => {
                console.error('Getting balance of ETH failed', error)
                resolve(new BN('0'))
              })
          } else {
            const contract = getERC20Contract(tokenAddress)
            contract?.methods
              .balanceOf(userAddress)
              .call()
              .then((value: any) => {
                resolve(new BN(value))
              })
              .catch((error: any) => {
                console.error('Getting balance of ERC20 failed', error)
                resolve(new BN('0'))
              })
          }
        } catch (error) {
          resolve(new BN('0'))
        }
      })
    }

    async function run() {
      const bn = await getBalance()
      if (!isCancelled) {
        const pow = new BigNumber('10').pow(new BigNumber(decimals))
        setBalanceBN(bn as any)
        setBalance(web3BNToFloatString(bn, pow, 4, BigNumber.ROUND_DOWN) as any)
        setIsLoading(false)
      }
    }

    setIsLoading(true)
    run()

    return () => {
      isCancelled = true
    }
  }, [
    tokenAddress,
    web3,
    walletAddress,
    userAddress,
    refreshToggle,
    decimals,
    chainID,
  ])

  return [balance, balanceBN, isLoading]
}
