import classNames from 'classnames'
import A from 'components/A'
import CircleSpinner from 'components/CircleSpinner'
import { NETWORK } from 'stores/networks'
import TxManager from '../random/TxManager'

type Props = {
  txManager: TxManager
}

const TxPending = ({ txManager }: Props) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-3 my-5 text-sm text-brand-new-dark font-semibold',
        txManager.isPending ? '' : 'hidden'
      )}
    >
      <div className="font-bold justify-self-center">{txManager.name}</div>
      <div className="justify-self-center">
        <A
          className={classNames(
            'underline',
            txManager.hash === '' ? 'hidden' : ''
          )}
          href={NETWORK.getEtherscanTxUrl(txManager.hash)}
          target="_blank"
        >
          {txManager.hash.slice(0, 8)}...{txManager.hash.slice(-6)}
        </A>
      </div>
      <div className="justify-self-center">
        <CircleSpinner color="#0857e0" />
      </div>
    </div>
  )
}

export default TxPending
