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

  const exceedsBalance =
    isTokenBalanceLoading || !inputDaiAmount
      ? false
      : parseFloat(tokenBalance as string) < parseFloat(inputDaiAmount)

  const isApproveButtonDisabled =
    txManager.isPending ||
    exceedsBalance ||
    !isMissingAllowance ||
    !isValidAddress

  const isDepositDisabled = !isValidAddress || inputDaiAmount?.length <= 0

  return (
    <Modal close={close}>
      <div className="w-full md:w-[34rem] px-6 py-6 bg-white dark:bg-gray-700 rounded-xl text-white">
        <div className="text-2xl font-bold mb-4">Deposit</div>

        <div className="mb-4">
          <div className="mb-2">Enter ETH address to send DAI too</div>
          <input
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="px-2 py-2 rounded text-black"
            placeholder="Enter ETH address..."
          />
        </div>

        <div>
          <div className="mb-2">Enter amount of DAI to send</div>
          <input
            onChange={(e) => setInputDaiAmount(e.target.value)}
            className="px-2 py-2 rounded text-black"
            placeholder="Enter amount of DAI..."
          />
        </div>

        {/* TODO: need approve button */}
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
              ? 'text-brand-gray-2 dark:text-gray-300 bg-brand-gray dark:bg-gray-500 cursor-default border-brand-gray'
              : 'border-brand-blue text-white bg-black font-medium hover:bg-black/[.8]'
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