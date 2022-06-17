export default class TxManager {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>

  isPending: boolean
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>

  hash: string
  setHash: React.Dispatch<React.SetStateAction<string>>

  constructor([name, setName], [isPending, setIsPending], [hash, setHash]) {
    this.name = name
    this.setName = setName
    this.isPending = isPending
    this.setIsPending = setIsPending
    this.hash = hash
    this.setHash = setHash
  }

  async executeTxWithCallbacks(
    name: string,
    func: (...args: any[]) => any,
    callbacks: {
      onHash?: (hash: string) => void
      onReceipt?: (receipt: any) => void
    },
    ...args: any[]
  ) {
    const { onHash, onReceipt } = callbacks

    this.setIsPending(true)
    this.setName(name)

    try {
      await func(...args)
        .on('transactionHash', (hash: string) => {
          this.setHash(hash)
          onHash && onHash(hash)
        })
        .on('receipt', function (receipt: any) {
          onReceipt && onReceipt(receipt)
        })
    } catch (ex) {
      throw Error(`Transaction execution failed: ${ex}`)
    } finally {
      this.setIsPending(false)
      this.setName('')
      this.setHash('')
    }
  }

  async executeTx(name: string, func: (...args: any[]) => any, ...args: any[]) {
    await this.executeTxWithCallbacks(name, func, {}, ...args)
  }
}
