import classNames from 'classnames'

export default function ApproveOptions({
  disabled,
  isUnlockOnceChecked,
  setIsUnlockOnceChecked,
  isUnlockPermanentChecked,
  setIsUnlockPermanentChecked,
  unlockText,
}: {
  disabled: boolean
  isUnlockOnceChecked: boolean
  setIsUnlockOnceChecked: (b: boolean) => void
  isUnlockPermanentChecked: boolean
  setIsUnlockPermanentChecked: (b: boolean) => void
  unlockText: string
}) {
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="unlockOnceCheckbox"
          className="cursor-pointer border-2 border-gray-200 rounded-sm"
          disabled={disabled}
          checked={isUnlockOnceChecked}
          onChange={(e) => {
            setIsUnlockOnceChecked(e.target.checked)
            setIsUnlockPermanentChecked(!e.target.checked)
          }}
        />
        <label
          htmlFor="unlockOnceCheckbox"
          className={classNames(
            'ml-2 cursor-pointer',
            isUnlockOnceChecked
              ? 'text-blue-400'
              : 'text-white'
          )}
        >
          Allow once {unlockText}
        </label>
      </div>

      <div>
        <input
          type="checkbox"
          id="unlockPermanentCheckbox"
          className="cursor-pointer border-2 border-gray-200 rounded-sm"
          disabled={disabled}
          checked={isUnlockPermanentChecked}
          onChange={(e) => {
            setIsUnlockPermanentChecked(e.target.checked)
            setIsUnlockOnceChecked(!e.target.checked)
          }}
        />
        <label
          htmlFor="unlockPermanentCheckbox"
          className={classNames(
            'ml-2 cursor-pointer',
            isUnlockPermanentChecked
              ? 'text-blue-400'
              : 'text-white'
          )}
        >
          Allow permanent {unlockText}
        </label>
      </div>
    </>
  )
}
