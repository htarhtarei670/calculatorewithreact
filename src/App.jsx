import { useReducer } from "react"
import Digit from "./Digit"
import Operator from "./Operator"

//action collection obj
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_SIGN: 'choose_sign',
  AC_BUTTON: "clear",
  DELETE_BUTTON: "delete",
  CALCULATE:'calculate'
}

//Reducer function for useReducer
const reducer = (state,{type,payload}) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currValue:payload.digit,
          overwrite:false,
        }
      }
      //if you are typing "0" many time it'll not appear but one
      if (state.currValue === "0" && payload.digit === "0") {
        return state
      }

      //if your typing number already have "." it'll not allow to type another "." 
      if (payload.digit === "." && state.currValue.includes('.')) {
        return state;
      }

      if(payload.digit =="."){
        return state
      }

      //default conditon
      return (
        {
          ...state,
          currValue:`${state.currValue || ""}${payload.digit}`
        }
      )
    
   
    
    case ACTIONS.CHOOSE_SIGN:
      if(state.currValue ===null && state.prevValue ===null){
          return state
      }

      if(state.currValue === null){
        return {
          ...state,
          operator:payload.operator
        }
      }

     
      if(state.prevValue ==null){
        return {
          ...state,
          prevValue:state.currValue,
          operator:payload.operator,
          currValue:null
        }
      }

       //default condition
        return {
          ...state,
          prevValue:calculate(state),
          currValue:null,
          operator:payload.operator
        }
  
    case ACTIONS.AC_BUTTON:
      return {}
    case ACTIONS.DELETE_BUTTON:
      if(state.overwrite){
        return {
          ...state,
          overwrite:false,
          currValue:null
        }
      }
      if (state.currValue == null) return state
      if(state.currValue<2){
        return {
          ...state,
          currValue:null
        }
      }
      //default condition
      return {
        ...state,
        currValue:state.currValue.slice(0,-1)
      }
    case ACTIONS.CALCULATE:
      if(state.currValue === null || state.prevValue === null || state.operator === null){
        return state
      }

      return {
        ...state,
        currValue:calculate(state),
        prevValue:null,
        operator:null,
        overwrite:true
      }
  }
    
}

const calculate=({currValue,prevValue,operator})=>{
  const curr=parseFloat(currValue);
  const prev=parseFloat(prevValue)
  if(curr === null || prev === null) return {}

  let calculation =""

  switch (operator) {
     case "+":
      calculation= prev + curr
      break;
    case "-":
      calculation=  prev - curr
      break;
    case "*":
      calculation=  prev * curr
      break;
    case "/":
      calculation=  prev / curr
      break;
  }
  return calculation.toString();
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{currValue,prevValue,operator},dispatch]=useReducer(reducer,{})
    return (
      <div className="calculator-grid ">
        <div className="output">
          <div className="pre-output">{formatOperand(prevValue)}{operator}</div>
          <div className="curr-output">{formatOperand(currValue)}</div>
        </div>
          <button className='span-two' onClick={()=>dispatch({type:ACTIONS.AC_BUTTON})}>AC</button>
          <button onClick={()=>dispatch({type:ACTIONS.DELETE_BUTTON})}>DEL</button>
          <Operator dispatch={dispatch} operator='/'/>
          <Digit dispatch={dispatch} digit="1" />
          <Digit dispatch={dispatch} digit="2" />
          <Digit dispatch={dispatch} digit="3" />
          <Operator dispatch={dispatch} operator='*'/>
          <Digit dispatch={dispatch} digit="4" />
          <Digit dispatch={dispatch} digit="5" />
          <Digit dispatch={dispatch} digit="6" />
          <Operator dispatch={dispatch} operator='+'/>
          <Digit dispatch={dispatch} digit="7" />
          <Digit dispatch={dispatch} digit="8" />
          <Digit dispatch={dispatch} digit="9" />
          <Operator dispatch={dispatch} operator='-'/>
          <Digit dispatch={dispatch} digit="." />
          <Digit dispatch={dispatch} digit="0" />
          <button className='span-two' onClick={()=>dispatch({type:ACTIONS.CALCULATE})}>=</button>
        </div>
      
    )
}

export default App