import { INetworkSpecifics, ExternalAddresses, AddNetworkParams, SwitchNetworkParams } from '.'
import DeployedAddressesGoerli from '../../assets/deployed-goerli.json'
import DeployedABIsGoerli from '../../assets/abis-goerli.json'
import TokenListRinkeby from '../../assets/token-list-goerli.json'

export default class GoerliNetworkSpecifics implements INetworkSpecifics {
  getNetworkName(): string {
    return 'goerli'
  }

  getHumanReadableNetworkName(): string {
    return 'Goerli'
  }

  getChainID(): number {
    return 5
  }

  getDeployedAddresses(): any {
    return DeployedAddressesGoerli
  }

  getDeployedABIs(): any {
    return DeployedABIsGoerli
  }

  getExternalAddresses(): ExternalAddresses {
    return {
      imo: '',
      dai: '0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60',
      cDai: '0x5A705ea24b8E30Fa0b75D3aEf572a4eF2A64426E',
      weth: '',
    }
  }

  getTokenList(): any {
    return TokenListRinkeby
  }

  getSubgraphURL(): string {
    return 'https://api.thegraph.com/subgraphs/name/shmoji/all41-subgraph'
  }

  getEtherscanTxUrl(tx: string): string {
    return `https://goerli.etherscan.io/tx/${tx}`
  }

  getAddNetworkParams(): AddNetworkParams | undefined {
    return {
      chainId: '0x5',
      chainName: 'Goerli',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://goerli.infura.io/v3/'],
      blockExplorerUrls: ['https://goerli.etherscan.io'],
    }
  }

  getSwitchNetworkParams(): SwitchNetworkParams | undefined {
    return {
      chainId: '0x5',
    }
  }

  getRPCURL(): string {
    return 'https://goerli.infura.io/v3/e213f324d9ea484ea8f2cb1b5bc5fc4c'
  }
}
