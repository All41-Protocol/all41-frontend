import { ExclamationCircleIcon } from '@heroicons/react/solid'
import A from 'components/A'
import Modal from 'modules/modals/Modal'

export enum TX_TYPES {
  NONE,
  DEPOSIT,
}

const tweetableTypes = [
  TX_TYPES.DEPOSIT,
]

const getTweetTemplate = (transactionType: TX_TYPES, idtValue: string) => {
  let tweetText = ''

  // if (transactionType === TX_TYPES.LIST) {
  //   tweetText = `Just listed ${idtValue} on @ideamarket_io, the literal marketplace of ideas!`
  // } else if (transactionType === TX_TYPES.GHOST_LIST) {
  //   tweetText = `Just ghost listed ${idtValue} on @ideamarket_io, the literal marketplace of ideas!`
  // }

  return encodeURIComponent(tweetText)
}

const getTweetUrl = (transactionType: TX_TYPES, listingId: string) => {
  let tweetUrl = 'https://ideamarket.io'

  if (
    transactionType === TX_TYPES.DEPOSIT
  ) {
    tweetUrl = `https://ideamarket.io/post/${listingId}`
  }

  return tweetUrl
}

export default function TradeCompleteModal({
  close,
  isSuccess,
  listingId,
  idtValue,
  transactionType,
}: {
  close: () => void
  isSuccess: boolean
  listingId: string
  idtValue: string // Value stored onchain for this IDT
  transactionType: TX_TYPES
}) {
  const tweetTemplate = getTweetTemplate(transactionType, idtValue)
  const tweetUrl = getTweetUrl(transactionType, listingId)

  const canTweet = tweetableTypes.includes(transactionType)

  const bgImageURL = isSuccess ? '/txSuccess.png' : '/txFail.png'

  return (
    <Modal className="bg-transparent" close={close}>
      <div
        className="relative w-full md:w-120 px-2.5 py-5 flex flex-col justify-center items-center"
        style={{
          backgroundImage: `url("${bgImageURL}"), linear-gradient(180deg, #011032 0%, #02194D 100%)`,
          backgroundSize: 'cover',
          height: '300px',
        }}
      >
        {isSuccess ? (
          <>
            <div className="flex justify-center text-3xl text-white text-center font-gilroy-bold">
              Transaction
              <br />
              Successful!
            </div>
            {canTweet && (
              <div className="flex justify-center mt-10">
                <A
                  className="twitter-share-button"
                  href={`https://twitter.com/intent/tweet?text=${tweetTemplate}&url=${tweetUrl}`}
                >
                  <button
                    className="w-32 h-10 text-white rounded-2xl flex justify-center items-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(100px)',
                    }}
                  >
                    Share
                    {/* <TwitterCircleIcon className="w-5 h-5 ml-2" /> */}
                  </button>
                </A>
              </div>
            )}
          </>
        ) : (
          <>
            {/* <Wrong
              style={{
                width: '19rem',
                height: '16rem',
                position: 'absolute',
                top: 0,
              }}
            /> */}
            <div
              className="mt-48 px-4 py-2 text-white rounded-2xl flex justify-center items-center"
              style={{
                background: 'rgba(199, 43, 67, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(100px)',
              }}
            >
              <ExclamationCircleIcon className="w-5 h-5 text-red-700 mr-2" />
              Transaction Failed to execute
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
