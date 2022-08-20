import { INetworkSpecifics, ExternalAddresses, AddNetworkParams, SwitchNetworkParams } from '.'
import DeployedAddressesMainnet from '../../assets/deployed-mainnet.json'
import DeployedABIsMainnet from '../../assets/abis-mainnet.json'
import TokenListMainnet from '../../assets/token-list-mainnet.json'

export default class GoerliNetworkSpecifics implements INetworkSpecifics {
  getNetworkName(): string {
    return 'mainnet'
  }

  getHumanReadableNetworkName(): string {
    return 'Mainnet'
  }

  getChainID(): number {
    return 1
  }

  getDeployedAddresses(): any {
    return DeployedAddressesMainnet
  }

  getDeployedABIs(): any {
    return DeployedABIsMainnet
  }

  getExternalAddresses(): ExternalAddresses {
    return {
      imo: '',
      dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      cDai: '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643',
      weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    }
  }

  getTokenList(): any {
    return TokenListMainnet
  }

  getSubgraphURL(): string {
    return 'https://api.studio.thegraph.com/query/11557/all41-subgraph/v0.0.1'
  }

  getEtherscanTxUrl(tx: string): string {
    return `https://etherscan.io/tx/${tx}`
  }

  getAddNetworkParams(): AddNetworkParams | undefined {
    return {
      chainId: '0x1',
      chainName: 'Mainnet',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.infura.io/v3/'],
      blockExplorerUrls: ['https://etherscan.io'],
    }
  }

  getSwitchNetworkParams(): SwitchNetworkParams | undefined {
    return {
      chainId: '0x1',
    }
  }

  getRPCURL(): string {
    return 'https://mainnet.infura.io/v3/e213f324d9ea484ea8f2cb1b5bc5fc4c'
  }
}
