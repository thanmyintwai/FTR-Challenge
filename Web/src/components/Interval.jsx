import { useState } from "react";
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const Interval = (props) => {
    const[interval, setInterval] = useState("00:00:10")
    const [con, setCon] = useState(true)

    const [hours, setHours] = useState('00')
    const [minues, setMinutes] = useState('00')
    const [seconds, setSeconds] = useState('00')

    let timeM = props.backup

    const hrsList = ['00', '01', '02', '03', '04', '05', '06','07', '08', '09', '10', 
                           '11', '12', '13', '14', '15', '16', '17', '18', '19','20',
                            '21', '22', '23']
    const min_sec_List = ['00', '01', '02', '03', '04', '05', '06','07', '08', '09', '10', 
    '11', '12', '13', '14', '15', '16', '17', '18', '19','20',
     '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35',
    '36','37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', 
    '49', '50', '51', '52', '52', '53', '55', '56', '57', '58', '59']
    
    const handler =(event)=>{
        
        setInterval(event.target.value)        
        props.intervalCallback(event.target.value)
        event.preventDefault();
    }

    const hourHandler = (event) =>{
      
        setHours(event.target.value)
        
        let old = timeM.split(':')
        let time = event.target.value+':'+old[1]+':'+old[2]
        timeM = time
        props.intervalCallback(time)
        event.preventDefault()
    }

    const minuteHandler = (event) =>{
        setMinutes(event.target.value)
        let old = timeM.split(':')
        let time = old[0]+':'+event.target.value+':'+old[2]
        timeM = time
        //let time = hours+':'+minues+':'+seconds
        props.intervalCallback(time)
        event.preventDefault()
    }
    const secondHandler = (event) =>{
        setSeconds(event.target.value)
        //let time = hours+':'+minues+':'+seconds
        let old = timeM.split(':')
        let time = old[0]+':'+old[1]+':'+event.target.value
        timeM = time
        props.intervalCallback(time)
        event.preventDefault()
    }
    const handler1 = (event) =>{
        if(con == true){
            setCon(false)
        }else{
            setCon(true)
        }
        //setCon(!con)
        if(con == true){
            props.haltCallback({'status': 'halt'})
            props.intervalCallback('00.00.00')

        }else{
            props.haltCallback({'status': 'recover'})
            let time = hours+':'+minues+':'+seconds
            props.intervalCallback(time)

         }
        
        event.preventDefault()
    }

    const inputProps = {
        size: 'large'
    }

    return ( 
        <>
        {/* <TextField      disabled={!con}
                        defaultValue={interval} 
                        //defaultChecked="true"
                       inputProps={inputProps} 
                       id="outlined-basic" 
                       label="Set Interval" 
                       variant="outlined" 
                       type="time"
                       step="3" 
                       onChange={(e)=> handler(e)} /> */}

        <Grid container spacing={0} direction="horizontal" alignItems="center">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="hr">Hours</InputLabel>
                <Select 
                        disabled={!con} 
                        inputProps={{ 'aria-label': 'Without label' }} 
                        displayEmpty 
                        labelId="hrs" 
                        id="hrs" 
                        value={hours} 
                        onChange={hourHandler} 
                        fullWidth label="Hours" >
                        { hrsList.map((i)=>(<MenuItem value={i}>{i}</MenuItem> ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="mi">Mins</InputLabel>
                <Select 
                    disabled={!con} 
                    labelId="mins" 
                    id="mins" 
                    value={minues} 
                    onChange={minuteHandler} 
                    fullWidth 
                    label="Mins" >
                    { min_sec_List.map((i)=>(<MenuItem value={i}>{i}</MenuItem> ))}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="mi">Secs</InputLabel>
                <Select 
                    disabled={!con} 
                    labelId="secs" 
                    id="secs" 
                    value={seconds} 
                    onChange={secondHandler} 
                    autoWidth 
                    label="Secs" >
                    { min_sec_List.map((i)=>(<MenuItem value={i}>{i}</MenuItem> ))}
                </Select> 
            </FormControl>
            <Switch checked={con} onChange={(e) => handler1(e)} /> 

        </Grid>
        </>
     );
}
 
export default Interval;