import { useState } from "react";

const UsualInput = ({type, placeholder, valueFunc, value, jobKey}) => {
  return (
    <div>
      <input
        type = {type}
        placeholder = {placeholder}
        onChange={(e) => {
          valueFunc(jobKey, e.target.value);
        }}
        value = {value}
    />
    </div>
  )
}

const ListInput = ({className, title, type, placeholder, valueFunc, value, jobKey}) => {

  const [inputValue, setInputValue] = useState('');

  let showInputs = value.map( (input, index) => { return ( 
    <li key={`jobkey: ${index}`}>
      <span>{input}</span>
      <span onClick={() => {
        value.splice(index,1);
        valueFunc(jobKey, value);
      }}>
        <b>x</b>
      </span>
    </li> 
  ) } )

  const addValueToList = () => {
    let newList = [...value];
    newList.push(inputValue);
    if ( value.findIndex(element => element === inputValue) === -1 ) {
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

const MinMaxInputs = ({title, min, max, placeholder, valueFunc, value, jobKey}) => {
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
            valueFunc( jobKey, {
              min: e.target.value,
              max: value.max
            } );
          }}
        />
        <input
          type='number'
          placeholder={`max ${placeholder}`}
          min={min}
          max={max}
          onChange = {(e) => {
            valueFunc( jobKey, {
              min: value.min,
              max: e.target.value
            } );
          }}
        />
      </div>
    </div>
  )
}

const TextAreaInput = ({type, placeholder, valueFunc, value, jobKey}) => {
  return (
    <div id={jobKey}>
      <textarea 
        type = {type}
        placeholder = {placeholder}
        onChange={(e) => {
          valueFunc(jobKey, e.target.value);
        }}
        value = {value}
      ></textarea>
    </div>
  )
}

export {UsualInput, ListInput, MinMaxInputs, TextAreaInput}