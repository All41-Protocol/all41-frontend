import DefaultLayout from 'modules/layouts/DefaultLayout'
import type { NextPage } from 'next'
import { ReactElement } from 'react'

const About: NextPage = () => {

  return (
    <div className="max-w-[60rem] mx-auto mt-10 pb-20 text-white">

      <div>

        <div className="flex pb-10">

          <div className="w-[50%] pr-10 border-r">

            <div className="font-bold underline text-4xl mb-10">PROTOCOL ACTIONS</div>

            <div className="font-bold text-2xl italic">DEPOSIT</div>
            <ul className="ml-5 list-disc">
              <li>Deposit DAI into your Wallet Pool.</li>
              <li>Deposit DAI into other Wallet Pools.</li>
            </ul>

            <div className="font-bold text-2xl italic mt-10">EARN PASSIVE INCOME</div>
            <ul className="ml-5 list-disc">
              <li>All DAI deposited into your Wallet Pool gains interest. This includes DAI you deposit and DAI anyone else deposits. This means that you gain passive income on your deposits AND all donations to you. All41 Protocol is the first technology to ever do this.</li>
            </ul>

            <div className="font-bold text-2xl italic mt-10">WITHDRAW</div>
            <ul className="ml-5 list-disc">
              <li>Withdraw all DAI from your Wallet Pool.</li>
              <li>Withdraw some DAI from your Wallet Pool.</li>
            </ul>

          </div>

          <div className="w-[50%] pl-10">

            <div className="font-bold underline text-4xl mb-10">TERMS TO LEARN</div>

            <div className="font-bold text-2xl italic">WALLET POOL</div>
            <ul className="ml-5 list-disc">
              <li>A pool of DAI owned by a wallet address that gains interest using https://compound.finance</li>
            </ul>

          </div>

        </div>

        <div className="pt-10 border-t">

          <div className="font-bold underline text-4xl mb-10">USE-CASES</div>

          <ul className="ml-5 list-disc">
            <li>Savings account</li>
            <li>Earn passive income that increases as the DAI stored in your Wallet Pool increases</li>
            <li>Donate to another human or organization that owns a wallet address</li>
          </ul>

        </div>

      </div>
      
    </div>
  )
}

(About as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default About
