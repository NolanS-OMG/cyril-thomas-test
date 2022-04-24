import { useEffect, useState } from "react";

const JobPoster = () => {

  const submit = (event) => {
    event.preventDefault();
    if (canSubmit) {
      console.log(job);
    }
  }

  const updateForm = (str,value) => {
    let newJob = job;
    newJob[str] = value;
    setJob(newJob);
  }

  const canSubmitTrue = () => {
    canSubmit = true;
  }

  const canSubmitFalse = () => {
    canSubmit = false;
  }

  const [job, setJob] = useState(
    {
      title: '',

      locations: [],

      yearsOfExperience: {
        min: 0,
        max: undefined
      },

      jobDescription: '',

      categories: [],

      functionalAreas: [],

      graduatingYear: {
        min: 0,
        max: undefined
      },

      tags: []
    }
  )

  let canSubmit = true;

  return (
    <form onSubmit={submit}>
      <h4>Basic Details</h4>
      <div>
        <label>Job title: </label>
        <UsualInput 
          type='text' 
          placeholder='Write a title that appropriately describes the job' 
          valueFunc = {updateForm} 
          jobKey='title' 
        />
      </div>
      <div>
        <label>Locations: </label>
        <ListInput 
          type='text' 
          placeholder='Press enter to add each location' 
          doNotSubmit={canSubmitFalse}
          doSubmit={canSubmitTrue}
          valueFunc = {updateForm} 
          jobKey='locations'
        />
      </div>
      <MinMaxInputs title='Yearse of experience' min={0}/>
      <div>
        <label>Job description: </label>
        <UsualInput 
          type='text' 
          placeholder='Describe the role and responsabilities, skills required for the job and help candidates understand their role better' 
          valueFunc = {updateForm} 
          jobKey='jobDescription' 
        />
      </div>
      <h4>Targeting</h4>
      <div>
        <label>Categories: </label>
        <ListInput 
          type='text' 
          placeholder='Press enter to add each categorie' 
          doNotSubmit={canSubmitFalse}
          doSubmit={canSubmitTrue}
          valueFunc = {updateForm} 
          jobKey='categories'
        />
      </div>
      <div>
        <label>Functional area: </label>
        <ListInput 
          type='text' 
          placeholder='Press enter to add each categorie' 
          doNotSubmit={canSubmitFalse}
          doSubmit={canSubmitTrue}
          valueFunc = {updateForm} 
          jobKey='functionalAreas'
        />
      </div>
      <MinMaxInputs title='Graduationg year' min={1910} max={2050}/>
      <div>
        <label>Tags: </label>
        <ListInput 
          type='text' 
          placeholder='Press enter to add each categorie' 
          doNotSubmit={canSubmitFalse}
          doSubmit={canSubmitTrue}
          valueFunc = {updateForm} 
          jobKey='tags'
        />
      </div>
      <button type="submit">Post job</button>
    </form>
  )
}

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

export default JobPoster