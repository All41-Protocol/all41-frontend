import create from 'zustand'
import Web3 from 'web3'
import { NETWORK } from 'stores/networks'
import { useWalletStore } from './walletStore'
import ERC20ABI from 'assets/abi-erc20.json'

type State = {
  all41ExchangeContract: any
}

export const useContractStore = create<State>((set) => ({
  all41ExchangeContract: undefined,
}))

export function clearContracts() {
  useContractStore.setState({
    all41ExchangeContract: undefined,
  })
}

export function initContractsFromWeb3(web3: Web3) {
  const deployedAddresses = NETWORK.getDeployedAddresses()
  const abis = NETWORK.getDeployedABIs()

  const all41ExchangeContract = new web3.eth.Contract(
    abis.all41Exchange as any,
    deployedAddresses.all41Exchange,
    { from: web3.eth.defaultAccount as any }
  )

  useContractStore.setState({
    all41ExchangeContract: all41ExchangeContract,
  })
}

export function getERC20Contract(address: string) {
  const web3 = useWalletStore.getState().web3
  return web3
    ? new web3.eth.Contract(ERC20ABI as any, address, {
        from: web3.eth.defaultAccount as any,
      })
    : null
}
