import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";

const JobPoster = () => {

  const {register, handelSubmit} = useForm()

  const [job, setJob] = useState({})

  useEffect( () => {
    console.log(setJob);
  }, [job] )

  const onSubmit = (values) => {
    setJob(values);
  }

  return (
    <form onSubmit={handelSubmit( onSubmit )}>
      <h4>Basic details</h4>
      <label>Job: </label>
      <input {...register('student', {required: true} ) }/>
      <h4>Targeting</h4>
    </form>
  )
}

export default JobPoster