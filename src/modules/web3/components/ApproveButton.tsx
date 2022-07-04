import { useEffect } from 'react'
import classNames from 'classnames'
import BN from 'bn.js'

import { NETWORK } from 'stores/networks'
import Tooltip from 'modules/tooltip/Tooltip'
import TxManager from '../random/TxManager'
import { web3UintMax, zeroBN } from '../utils/Web3Utils'
import useTokenAllowance from '../hooks/useTokenAllowance'
import approveToken from 'actions/web3/approveToken'
import { TX_TYPES } from './TradeCompleteModal'
import ApproveOptions from './ApproveOptions'
import { CogIcon } from '@heroicons/react/outline'

export default function ApproveButton({
  tokenAddress,
  tokenName,
  spenderAddress,
  requiredAllowance,
  unlockPermanent,
  txManager,
  disable,
  setIsMissingAllowance,
  txType,
}: {
  tokenAddress: string
  tokenName: string
  spenderAddress: string
  requiredAllowance: BN
  unlockPermanent: boolean
  disable?: boolean
  txManager: TxManager
  setIsMissingAllowance: (b: boolean) => void
  txType: TX_TYPES
}) {
  // allowance is the amount of user's tokens they allow our smart contract to interact with
  const [allowance] = useTokenAllowance(
    tokenAddress,
    spenderAddress,
    requiredAllowance
  ) as any

  // isMissingAllowance says whether the user has enough allowance on the ERC20 token to perform the trade. If isMissingAllowance == true then the user needs to do an approve tx first
  const isMissingAllowance =
    !allowance ||
    allowance === undefined ||
    allowance.lte(zeroBN) ||
    allowance.lt(requiredAllowance)

  const getValuesByTxType = (txType: TX_TYPES) => {
    if (txType === TX_TYPES.DEPOSIT) {
      return {
        buttonText: 'deposit',
        buttonName: 'Deposit',
        tooltipAction: 'depositing',
      }
    }
  }

  const { buttonText, buttonName, tooltipAction } = getValuesByTxType(txType) as any

  useEffect(() => {
    setIsMissingAllowance(isMissingAllowance)
  }, [isMissingAllowance, setIsMissingAllowance])

  async function approve() {
    const allowanceAmount = unlockPermanent ? web3UintMax : requiredAllowance

    try {
      await txManager.executeTx(
        'Unlock',
        approveToken,
        tokenAddress,
        spenderAddress,
        allowanceAmount
      )
    } catch (ex) {
      console.log(ex)
      return
    }
  }

  return (
    <div
      className={classNames(
        'flex justify-center items-center py-4 px-4 text-lg font-bold rounded-2xl w-full text-center',
        disable
          ? 'text-gray-300 bg-gray-500 cursor-default'
          : 'text-white bg-blue-600 hover:bg-blue-800 cursor-pointer'
      )}
      onClick={() => {
        !disable && approve()
      }}
    >
      <span>
        Allow All41 to {buttonText} your {tokenName}
      </span>
      <Tooltip className="inline-block ml-2">
        <div className="w-32 md:w-64 text-white">
          The All41 smart contract needs your approval to interact with
          your {tokenName} balance. After you grant permission, the {buttonName}{' '}
          button will be enabled. Select &apos;allow permanent&apos; in Settings (⚙️) to
          permanently enable {tokenName} {tooltipAction} from this wallet.
        </div>
      </Tooltip>

    </div>
  )
}
