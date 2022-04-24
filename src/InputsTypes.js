import { useState, useEffect } from "react";

const UsualInput = ({type, placeholder, valueFunc, jobKey, required}) => {

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
      required = {required ? required : false}
    />
  )
}

const ListInput = ({type, placeholder, doNotSubmit, doSubmit, valueFunc, jobKey, required}) => {

  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);
  const [isRequired, setIsRequired] = useState(required ? required : false);

  let showInputs = inputList.map( (input, index) => { return ( <li key={`${index+1}: ${input}`}>{`${index+1}: ${input}`}</li> ) } )

  const addValueToList = () => {
    let newList = [...inputList];
    newList.push(inputValue);
    if ( inputList.findIndex(element => element === inputValue) === -1 ) {
      setInputList(newList);
      valueFunc(jobKey, newList);
    }
    setInputValue('');
    setIsRequired(false);
  }

  return (
    <div>
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
        required = {isRequired}
      />
      <ul>{showInputs}</ul>
    </div>
  )
}

const MinMaxInputs = ({title, min, max, placeholder, valueFunc, jobKey}) => {

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(undefined);

  useEffect( () => {
    if (typeof maxValue === typeof 1) {
      valueFunc( jobKey, {
        min: minValue,
        max: maxValue
      } )
    }
  }, [minValue, maxValue] )

  return(
    <div>
      <label>{title + ': '}</label>
      <input
        type='number'
        placeholder={`min ${placeholder}`}
        min={min}
        max={max}
        onChange = {(e) => {setMinValue(e.target.value)}}
      />
      <input
        type='number'
        placeholder={`max ${placeholder}`}
        min={min}
        max={max}
        onChange = {(e) => {setMaxValue(e.target.value)}}
      />
    </div>
  )
}

export {UsualInput, ListInput, MinMaxInputs}