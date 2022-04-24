import { useState } from "react";

import {ListInput, UsualInput, MinMaxInputs} from "./InputsTypes.js"

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
        min: 1910,
        max: undefined
      },

      tags: []
    }
  )

  let canSubmit = true;

  const canSubmitTrue = () => {
    canSubmit = true;
  }

  const canSubmitFalse = () => {
    canSubmit = false;
  }

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
      <MinMaxInputs 
        title='Years of experience' 
        min={0}
        placeholder='year'
        valueFunc = {updateForm} 
        jobKey='yearsOfExperience'
      />
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
      <MinMaxInputs 
        title='Graduating year' 
        min={1910}
        max={2050}
        placeholder='batch'
        valueFunc = {updateForm} 
        jobKey='graduatingYear'
      />
      <div>
        <label>Tags: </label>
        <ListInput
          type='text'
          placeholder='Press enter to add each category'
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

export default JobPoster