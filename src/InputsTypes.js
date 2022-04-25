import { useState } from "react";

const UsualInput = ({type, placeholder, valueFunc, jobKey}) => {

  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <input
        type = {type}
        placeholder = {placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          valueFunc(jobKey, inputValue);
        }}
        value = {inputValue}
    />
    </div>
  )
}

const ListInput = ({className, title, type, placeholder, valueFunc, jobKey}) => {

  const [inputValue, setInputValue] = useState('');
  const [inputList, setInputList] = useState([]);

  let showInputs = inputList.map( (input, index) => { return ( 
    <li key={`jobkey: ${index}`}>
      <span>{input}</span>
      <span onClick={() => {
        inputList.splice(index,1);
      }}>
        <b>x</b>
      </span>
    </li> 
  ) } )

  const addValueToList = () => {
    let newList = [...inputList];
    newList.push(inputValue);
    if ( inputList.findIndex(element => element === inputValue) === -1 ) {
      setInputList(newList);
      valueFunc(jobKey, newList);
    }
    setInputValue('');
  }

  return (
    <div id = {jobKey} className={className}>
      <label><b>*</b>{`${title}: `}</label>
      <div>
        <input
          type={type}
          placeholder={placeholder}
          value = {inputValue}
          onChange={(e) => {setInputValue(e.target.value)}}
          onKeyDown = {(e) => { if (e.key === 'Enter') {
            addValueToList();
          } }}
        />
      </div>
      <ul>{showInputs}</ul>
    </div>
  )
}

const MinMaxInputs = ({title, min, max, placeholder, valueFunc, jobKey}) => {

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(undefined);

  return(
    <div id={jobKey}>
      <label><b>*</b>{title + ': '}</label>
      <div>
        <input
          type='number'
          placeholder={`min ${placeholder}`}
          min={min}
          max={max}
          onChange = {(e) => {
            setMinValue(e.target.value);
            valueFunc( jobKey, {
              min: minValue,
              max: maxValue
            } );
          }}
        />
        <input
          type='number'
          placeholder={`max ${placeholder}`}
          min={min}
          max={max}
          onChange = {(e) => {
            setMaxValue(e.target.value);
            valueFunc( jobKey, {
              min: minValue,
              max: maxValue
            } );
          }}
        />
      </div>
    </div>
  )
}

const TextAreaInput = ({type, placeholder, valueFunc, jobKey}) => {

  const [inputValue, setInputValue] = useState('');

  return (
    <div id={jobKey}>
      <textarea 
        type = {type}
        placeholder = {placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          valueFunc(jobKey, inputValue);
        }}
        value = {inputValue}
      ></textarea>
    </div>
  )
}

export {UsualInput, ListInput, MinMaxInputs, TextAreaInput}