import './App.css';
import Interval from './components/Interval';
import Input from './components/Input';
import Output from './components/Output';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import { useState,useEffect } from "react";



function App() {

    const title = 'FTR Developer Coding Test Challenge'
    const [halted, setHalted] = useState(true)
    const [m_interval, setMInterval] = useState(0)
    const [childInterval, setChildInterval] = useState(0)
    const [backup, setBackup] = useState("00:00:00")
    const [info, setInfo] = useState(false)

const haltHandler = ({status}) =>{
  if(status=='halt'){
    setMInterval(0)
    setHalted(true)
  }
  else{
    setMInterval(childInterval)
    setHalted(false)
  }
}


const disable = () =>{
  setTimeout(() => {
    //setOnFire(false)        
    //props.fireworkCallback(false)
    console.log('ended after 20 seconds ')
    setMInterval(childInterval)
    setHalted(false)
    setInfo(false)
  }, 2000)
}


function miliseconds(hrs,min,sec)
{
    return((hrs*60*60+min*60+sec)*1000);
}


const intervalHandler = (data) =>{
  
  let hrs = parseInt(data.split(":")[0])
  let minutes = parseInt(data.split(":")[1])
  let seconds = parseInt(data.split(":")[2])
  setBackup(data)
  const result = miliseconds(hrs, minutes, seconds);
  setChildInterval(result)
  setMInterval(result)
  
}


  return (    
    <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        //justifyContent="center"
        style={{ minHeight: '100vh' }}
     >

  <Grid item xs={3}>
    <div className="App">
       <div className="content">
       <h1>{title}</h1>
       <h2>Candidate : {process.env.REACT_APP_CANDIDATE}</h2>
       <Interval intervalCallback={intervalHandler} haltCallback={haltHandler} backup={backup}/> 
       <Box sx={{ m: 2 }} /> 
       <Input /> 
       <Box sx={{ m: 2 }} /> 
       { info == false ?  <Output interval={m_interval} />  : <></> }
       <Box sx={{ m: 2 }} /> 
     </div>
    </div>
    </Grid>   
   
   </Grid> 
  );
}

export default App;
