import { useState, useEffect } from "react";

const UsualInput = ({type, placeholder, valueFunc, jobKey}) => {

  const [inputValue, setInputValue] = useState('');

  useEffect( () => {
    valueFunc(jobKey, inputValue);
  }, [inputValue, jobKey, valueFunc] )

  return (
    <input
      type = {type}
      placeholder = {placeholder}
      onChange={(e) => {setInputValue(e.target.value)}}
      value = {inputValue}
    />
  )
}

const ListInput = ({type, placeholder, doNotSubmit, doSubmit, valueFunc, jobKey}) => {

  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);

  const addValueToList = () => {
    let newList = [...inputList];
    newList.push(inputValue);
    if (inputList.findIndex(element => element === inputValue) === -1) {
      setInputList(newList);
      valueFunc(jobKey, newList);
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value = {inputValue}
      onChange={(e) => {setInputValue(e.target.value)}}
      onKeyDown = {(e) => { if (e.key === 'Enter') {
        addValueToList();
      } }}
      onFocus={() => doNotSubmit()}
      onBlur={() => doSubmit()}
    />
  )
}

const MinMaxInputs = ({title, min, max}) => {
  return(
    <div>
      <label>{title + ': '}</label>
      <input type='number' min={min} max={max}/>
      <input type='number' min={min} max={max}/>
    </div>
  )
}

export {UsualInput, ListInput, MinMaxInputs}