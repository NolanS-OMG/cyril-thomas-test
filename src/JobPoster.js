import { useState } from "react";
import axios from 'axios';

import {ListInput, UsualInput, MinMaxInputs, TextAreaInput} from "./InputsTypes.js";

const JobPoster = () => {

  const defaultJob = {
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

  const postForm = (data) => {
    axios.post(
      "/v1jobs/job", data
      ).then(
        res => console.log(res)
        ).catch(
          err => console.log(err)
          );
  }

  const postJob = () => {}
  const postJobAndAddAnother = () => {}
  const cancel = () => {}

  const submit = async (event) => {
    event.preventDefault();
    let missingField = 0;
    let canSubmit = 1;
    for (let i = 0; i < requiredJobField.length; i++) {
      if (typeof job[requiredJobField[i]] === typeof '' || typeof job[requiredJobField[i]] === typeof []) {
        if (job[requiredJobField[i]].length > 0) {
          canSubmit++;
        } else {
          missingField = i+1;
          break;
        }
      }
    }
    if (canSubmit === requiredJobField.length) {
      //postForm(postJob);
      console.log(job);
    } else {
      checkMissingField(requiredJobField[missingField-1]);
    }
  }

  const checkMissingField = (missingField) => {
    let element = document.getElementById(missingField);
    element.classList.add('missing-field');
    window.scrollTo(0,element.offsetTop-5);
  }

  const updateForm = (str,value) => {
    let newJob = {...job};
    newJob[str] = value;
    setJob(newJob);
    if (document.getElementById(str).classList.contains('missing-field')) {
      document.getElementById(str).classList.remove('missing-field');
    }
  }

  const [job, setJob] = useState({...defaultJob});

  const requiredJobField = ['title', 'locations', 'categories', 'tags'];

  return (
    <form>
      <h4>Basic Details</h4>
      <div id='title' className="required">
        <label><b>*</b>Job title: </label>
        <UsualInput 
          type='text' 
          placeholder='Write a title that appropriately describes the job' 
          valueFunc = {updateForm} 
          jobKey='title'
        />
      </div>
      <ListInput
        className="required"
        title='Locations' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        jobKey='locations'
      />
      <MinMaxInputs 
        title='Years of experience' 
        min={0}
        placeholder='year'
        valueFunc = {updateForm} 
        jobKey='yearsOfExperience'
      />
      <div id = 'jobDescription'>
        <label><b>*</b>Job description: </label>
        <TextAreaInput
          type='text' 
          placeholder='Describe the role and responsabilities, skills required for the job and help candidates understand their role better' 
          valueFunc = {updateForm} 
          jobKey='jobDescription'
        ></TextAreaInput>
      </div>
      <h4>Targeting</h4>
      <ListInput
        className="required"
        title='Categories' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        jobKey='categories'
      />
      <ListInput
        title='Functional area' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        jobKey='functionalAreas'
      />
      <MinMaxInputs 
        title='Graduating year' 
        min={1910}
        max={2050}
        placeholder='batch'
        valueFunc = {updateForm} 
        jobKey='graduatingYear'
      />
      <ListInput
        className="required"
        title='Tags' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        jobKey='tags'
      />
      <div>
        <button type="button" onClick={submit}>Post job</button>
        <button type="button">Post job and add another one</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  )
}

export default JobPoster