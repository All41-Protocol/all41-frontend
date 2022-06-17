import { useState } from 'react'

import TransactionManager from '../random/TxManager'

export default function useTxManager() {
  return new TransactionManager(useState(''), useState(false), useState(''))
}
