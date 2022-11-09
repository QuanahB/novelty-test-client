import React, {useEffect,useState,useRef} from 'react'
import './App.css';
import RecordList from './recordList';
import {motion} from 'framer-motion';
import ParticleBackground from './particleBackground';

export default function Activity() {
  
  const [form, setForm] = useState({
    activity: "",
    type: "",
    participants: "",
  });

  const activity2 = useRef()
  const type2 = useRef()
  const participants2 = useRef()

  function getData(){
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(json => {
        //Second Inputs 
        activity2.current.value = json.activity
        type2.current.value = json.type
        participants2.current.value = json.participants
        setForm({activity: json.activity, type: json.type, participants: json.participants});
      })
  }

  async function onSubmit(){

    const newActivity = {...form};

    await fetch("https://novelty-test.herokuapp.com/record/add", {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    })
    .catch(error => {
      window.alert(error);
      return;
    })
    setForm({activity: "", type: "", participants: ""});
    console.log("Succesfully added")
    //navigate("/")
  }

  return (
    <>
    <div className='jon'>
        <form name="Hello" onSubmit={onSubmit}>
          <label className='actLabel'>Activity Name: </label>
          <input id='activity' className='actInput' ref={activity2} />
          <br></br>
          <label className='actLabel'>Type: </label>
          <input id='type' className='actInput' ref={type2} />
          <br></br>
          <label className='actLabel'>Participants: </label>
          <input id='participants' className='actInput' ref={participants2} />
          <br></br>
          <input type="submit" value="Add" className='buttonTest'></input>
        </form>
        <button onClick={() => getData()} className='buttonTest'>Refresh</button>
        <RecordList />
        <br></br>
        <ParticleBackground />
    </div>
    {/*<motion.div className='morty' animate={{y: -100, x: 20}}></motion.div>*/}
    </>
  );
}