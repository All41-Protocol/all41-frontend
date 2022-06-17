import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
// import { WalletLinkConnector } from '@web3-react/walletlink-connector'
// import { FortmaticConnector } from '@web3-react/fortmatic-connector'
// import { PortisConnector } from '@web3-react/portis-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { getNetworkSpecifics, NETWORK } from 'stores/networks'
// import { FortmaticConnector } from './fortmatic-connector'
// import { PortisConnector } from './portis-connector'

const CHAIN_IDS = [
  ...(new Set(getNetworkSpecifics()?.map((v) => v.getChainID())) as any),
]
const RPC_URLS: { [chainId: number]: string } = getNetworkSpecifics()?.reduce(
  (a, v) => ({ ...a, [v.getChainID()]: v.getRPCURL() }),
  {}
)

export const injected = new InjectedConnector({
  supportedChainIds: [...CHAIN_IDS, 421611, 42161],
})

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  supportedChainIds: [...CHAIN_IDS, 421611, 42161],
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  chainId: NETWORK.getChainID(),
})

// export const walletlink = new WalletLinkConnector({
//   url: NETWORK.getRPCURL(),
//   appName: 'Ideamarket',
// })

export function resetWalletConnector(connector: AbstractConnector) {
  if (
    connector &&
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined
  }
}

export async function disconnectWalletConnector(connector: AbstractConnector) {
  if (
    connector &&
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    try {
      await connector.walletConnectProvider.disconnect()
    } catch (ex) {
      console.log(ex)
    }
  }
}

// export const fortmatic = new FortmaticConnector({
//   apiKey:
//     NETWORK.getNetworkName() === 'avm' || NETWORK.getNetworkName() === 'mainnet'
//       ? 'pk_live_B3A1A25FBF96DCB5'
//       : 'pk_test_4F838B34CAE38BC8',
//   chainId: NETWORK.getChainID(),
// })
// // export const fortmatic = {}

// export const portis = new PortisConnector({
//   dAppId: 'bbff3259-d19c-4791-9695-5a61f3146e51',
//   networks: CHAIN_IDS,
// })

export enum ConnectorIds {
  Injected = 1,
  Metamask = 1,
  WalletConnect = 2,
  // Fortmatic = 3,
  // WalletLink = 4,
  // Coinbase = 4,
  // Portis = 5,
}

export const connectorsById: { [connectorName in ConnectorIds]: any } = {
  [ConnectorIds.Injected]: injected,
  [ConnectorIds.Metamask]: injected,
  [ConnectorIds.WalletConnect]: walletconnect,
  // [ConnectorIds.WalletLink]: walletlink,
  // [ConnectorIds.Coinbase]: walletlink,
  // [ConnectorIds.Fortmatic]: fortmatic,
  // [ConnectorIds.Portis]: portis,
}
