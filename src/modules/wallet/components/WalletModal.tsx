import Modal from 'modules/modals/Modal'
import dynamic from 'next/dynamic'

const NoSSRWalletInterface = dynamic(() => import('./WalletInterface'), {
  ssr: false,
})

export default function WalletModal({ close }: { close: () => void }) {
  return (
    <Modal close={close}>
      <div className="text-white">
        <div className="p-4 bg-black/[.5] text-2xl text-left">
          Choose Wallet
        </div>
        <div className="bg-black/[.2]">
          <NoSSRWalletInterface onWalletConnected={close} />
        </div>
      </div>
    </Modal>
  )
}
