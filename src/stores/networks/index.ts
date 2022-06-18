// import MainnetNetworkSpecifics from './mainnet'
import GoerliNetworkSpecifics from './goerli'
import RinkebyNetworkSpecifics from './rinkeby'

export type ExternalAddresses = {
  imo: string
  dai: string
  cDai: string
  weth: string
}

export type AddNetworkParams = {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export type SwitchNetworkParams = {
  chainId: string
}

export type INetworkSpecifics = {
  getNetworkName(): string
  getHumanReadableNetworkName(): string
  getChainID(): number
  getDeployedAddresses(): any
  getDeployedABIs(): any
  getExternalAddresses(): ExternalAddresses
  getTokenList(): any
  getSubgraphURL(): string
  getEtherscanTxUrl(tx: string): string
  getAddNetworkParams(): AddNetworkParams | undefined
  getSwitchNetworkParams(): SwitchNetworkParams | undefined
  getRPCURL(): string
}

const specifics: INetworkSpecifics[] = [
  // new MainnetNetworkSpecifics(),
  new RinkebyNetworkSpecifics(),
  new GoerliNetworkSpecifics(),
]

export function getNetworkSpecifics(): INetworkSpecifics[] {
  return specifics
}

export function getNetworkSpecificsByNetworkName(
  networkName: string
): INetworkSpecifics {
  for (const s of specifics) {
    if (s.getNetworkName() === networkName) {
      return s
    }
  }

  return null as any
}

if (!process.env.NEXT_PUBLIC_NETWORK) {
  console.log('WARNING: NEXT_PUBLIC_NETWORK not found. Defaulting to rinkeby')
}

const networkName = process.env.NEXT_PUBLIC_NETWORK
  ? process.env.NEXT_PUBLIC_NETWORK
  : 'rinkeby'

// Gets network based on NEXT_PUBLIC_NETWORK environment variable
export const NETWORK = getNetworkSpecificsByNetworkName(networkName)

if (!NETWORK) {
  throw Error('no network config: ' + networkName)
}
