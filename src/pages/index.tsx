import DefaultLayout from 'modules/layouts/DefaultLayout'
import type { NextPage } from 'next'
import { ReactElement } from 'react'

const Home: NextPage = () => {
  return (
    <div>
      
    </div>
  )
}

(Home as any).getLayout = (page: ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
)

export default Home
