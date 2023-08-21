import React from 'react'
import { ACTIONS } from './App'

const Operator = ({dispatch,operator}) => {
  return (
      <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_SIGN,payload:{operator}})}>{operator }</button>
  )
}

export default Operator
