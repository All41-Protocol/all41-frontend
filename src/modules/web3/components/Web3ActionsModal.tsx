import classNames from "classnames"
import BigNumber from 'bignumber.js'
import Modal from "modules/modals/Modal"
import { useContext, useState } from "react"
import { NETWORK } from "stores/networks"
import useTxManager from "../hooks/useTxManager"
import { floatToWeb3BN, isETHAddress } from "../utils/Web3Utils"
import ApproveButton from "./ApproveButton"
import useBalance from "../hooks/useBalance"
import { useWeb3React } from "@web3-react/core"
import TxPending from "./TxPending"
import TradeCompleteModal, { TX_TYPES } from "./TradeCompleteModal"
import ModalService from "modules/modals/ModalService"
import { GlobalContext } from "stores/GlobalContext"
import deposit from "actions/web3/deposit"
import Tooltip from "modules/tooltip/Tooltip"
import { CogIcon } from "@heroicons/react/outline"
import ApproveOptions from "./ApproveOptions"

export default function Web3ActionsModal({
  close,
}: {
  close: () => void
}) {
  const txManager = useTxManager()
  const { setIsTxPending } = useContext(GlobalContext)
  const { account } = useWeb3React()

  const [recipientAddress, setRecipientAddress] = useState('')
  const [inputDaiAmount, setInputDaiAmount] = useState('')

  function onTradeComplete(
    isSuccess: boolean,
    transactionType: TX_TYPES
  ) {
    close()
    ModalService.open(TradeCompleteModal, {
      isSuccess,
      transactionType,
    })
  }

  const onDepositClicked = async () => {
    setIsTxPending(true)

    try {
      const web3TxMethod = deposit
      // tokenId , rating, comment
      const depositArgs = [
        recipientAddress,
        inputDaiAmount,
      ]
      await txManager.executeTx(
        'Deposit',
        web3TxMethod,
        ...depositArgs
      )
    } catch (ex) {
      console.log(ex)
      setIsTxPending(false)
      onTradeComplete(
        false,
        TX_TYPES.NONE
      )
      return
    }

    onTradeComplete(true, TX_TYPES.DEPOSIT)
  }

  const [isUnlockOnceChecked, setIsUnlockOnceChecked] = useState(false)
  const [isUnlockPermanentChecked, setIsUnlockPermanentChecked] = useState(true)

  const [isMissingAllowance, setIsMissingAllowance] = useState(false) // isMissingAllowance says whether the user has enough allowance on the ERC20 token to perform the trade. If isMissingAllowance == true then the user needs to do an approve tx first
  const [approveButtonKey, setApproveButtonKey] = useState(0)

  const spender = NETWORK.getDeployedAddresses().all41Exchange

  const spendTokenAddress = NETWORK.getExternalAddresses().dai

  const spendTokenSymbol = "DAI"

  // Amount of token that needs approval before tx
  const requiredAllowance = inputDaiAmount

  // Is user's address a valid hex-address? TODO: support ENS eventually
  const isValidAddress = isETHAddress(recipientAddress)

  const [tokenBalance, tokenBalanceBN, isTokenBalanceLoading] = useBalance(
    NETWORK.getExternalAddresses().dai,
    account as any,
    18,
    true
  ) as any

  const isDaiAmountValid = inputDaiAmount && parseFloat(inputDaiAmount) > 0 && inputDaiAmount?.length > 0

  const exceedsBalance =
    isTokenBalanceLoading
      ? false
      : parseFloat(tokenBalance as string) < parseFloat(inputDaiAmount)

  const isApproveButtonDisabled =
    txManager.isPending ||
    exceedsBalance ||
    !isMissingAllowance ||
    !isValidAddress ||
    !isDaiAmountValid

  const isDepositDisabled =
    txManager.isPending ||
    exceedsBalance ||
    isMissingAllowance ||
    !isValidAddress ||
    !isDaiAmountValid 

  return (
    <Modal close={close}>
      <div className="w-full md:w-[34rem] px-6 py-6 bg-white dark:bg-gray-700 rounded-xl text-white">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Deposit</div>

          <Tooltip
            className="w-4 h-4 ml-2 cursor-pointer text-white"
            IconComponent={CogIcon}
          >
            <div className="w-64">
              <ApproveOptions
                disabled={txManager.isPending}
                setIsUnlockOnceChecked={setIsUnlockOnceChecked}
                isUnlockOnceChecked={isUnlockOnceChecked}
                isUnlockPermanentChecked={isUnlockPermanentChecked}
                setIsUnlockPermanentChecked={setIsUnlockPermanentChecked}
                unlockText={'for All41 transactions'}
              />
            </div>
          </Tooltip>
        </div>

        <div className="mb-4">
          <div className="mb-2">Enter ETH address</div>
          <input
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full px-2 py-2 rounded text-black"
            placeholder="Enter ETH address..."
          />
        </div>

        <div className="mb-8">
          <div className="mb-2">Enter amount of DAI to send</div>
          <input
            onChange={(e) => setInputDaiAmount(e.target.value)}
            className="w-full px-2 py-2 rounded text-black"
            placeholder="Enter amount of DAI..."
          />
        </div>

        <ApproveButton
          tokenAddress={spendTokenAddress}
          tokenName={spendTokenSymbol}
          spenderAddress={spender}
          requiredAllowance={floatToWeb3BN(
            requiredAllowance,
            18,
            BigNumber.ROUND_UP
          )}
          unlockPermanent={isUnlockPermanentChecked}
          txManager={txManager}
          setIsMissingAllowance={setIsMissingAllowance}
          disable={isApproveButtonDisabled}
          key={approveButtonKey}
          txType={TX_TYPES.DEPOSIT}
        />

        <button
          className={classNames(
            'py-4 mt-4 mb-2 text-lg font-bold rounded-2xl w-full',
            isDepositDisabled
              ? 'text-gray-300 bg-gray-500 cursor-default'
              : 'text-white bg-blue-600 hover:bg-blue-800'
          )}
          disabled={isDepositDisabled}
          onClick={onDepositClicked}
        >
          Deposit
        </button>

        <div className="text-xs text-center font-semibold">
          Confirm transaction in wallet to complete.
        </div>

        <TxPending txManager={txManager} />

      </div>
    </Modal>
  )
}
