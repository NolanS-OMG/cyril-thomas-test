import { useEffect, useState } from "react";
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

  const postJob = () => {
    submit();
  }
  const postJobAndAddAnother = () => {
    submit();
    cancel();
  }
  const cancel = () => {
    setJob({...defaultJob});
  }

  const submit = () => {
    let missingField = 0;
    let canSubmit = 0;
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
          value = {job.title}
          jobKey='title'
        />
      </div>
      <ListInput
        className="required"
        title='Locations' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        value = {job.locations}
        jobKey='locations'
      />
      <MinMaxInputs 
        title='Years of experience'
        min={0}
        placeholder='year'
        valueFunc = {updateForm} 
        value = {job.graduatingYear}
        jobKey='yearsOfExperience'
      />
      <div id = 'jobDescription'>
        <label><b>*</b>Job description: </label>
        <TextAreaInput
          type='text' 
          placeholder='Describe the role and responsabilities, skills required for the job and help candidates understand their role better' 
          valueFunc = {updateForm} 
          value = {job.jobDescription}
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
        value = {job.categories}
        jobKey='categories'
      />
      <ListInput
        title='Functional area' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        value = {job.functionalAreas}
        jobKey='functionalAreas'
      />
      <MinMaxInputs 
        title='Graduating year' 
        min={1910}
        max={2050}
        placeholder='batch'
        valueFunc = {updateForm} 
        value = {job.graduatingYear}
        jobKey='graduatingYear'
      />
      <ListInput
        className="required"
        title='Tags' 
        type='text'
        placeholder='Press enter to add each category'
        valueFunc = {updateForm}
        value = {job.tags}
        jobKey='tags'
      />
      <div>
        <button type="button" onClick={submit}>Post job</button>
        <button type="button" onClick={postJobAndAddAnother}>Post job and add another one</button>
        <button type="button" onClick={cancel}>Cancel</button>
      </div>
    </form>
  )
}

export default JobPoster