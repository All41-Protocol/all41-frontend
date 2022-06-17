import { ReactNode } from 'react'
// import { Toaster } from 'react-hot-toast'
import MainHeader from 'components/MainHeader'
import classNames from 'classnames'

type Props = {
  children: ReactNode
  bgColor?: string // Can style background color of page different from default (needs to be Tailwind bg color)
  bgHeaderColor?: string // Can style background color of header different from default (needs to be Tailwind bg color)
  headerTextColor?: string
}

export default function DefaultLayout({
  children,
  bgColor,
  bgHeaderColor,
  headerTextColor,
}: Props) {

  return (
    <div
      className={classNames(
        bgColor ? bgColor : 'bg-brand-gray dark:bg-gray-900',
        'min-h-screen font-inter'
      )}
    >
      {/* <Toaster /> */}
      <MainHeader bgColor={bgHeaderColor} textColor={headerTextColor} />
      <div className="pt-16">{children}</div>
    </div>
  )
}
