import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'
import Confetti from 'react-dom-confetti';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';


const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };



const Input = (props) => {

    const[nextNumber, setNextNumber] = useState("")
    const[isFibonacci, setFibonacci] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [onFire, setOnFire] = useState(false)
    

    let fxProps = {
        count: 2,
        interval: 4000,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
          ...props,
          x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
          y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
      }

      const isInTheFirstThousandFibonacci = n => {
        let n1 = 0, n2 = 1, nextTerm;

        let series = []
        for (let i = 1; i <= 1000; i++) {
            series.push(n1)
            nextTerm = n1 + n2;
            n1 = n2;
            n2 = nextTerm;
        }
        return { 'isIt': series.includes(parseInt(n)) } 
        
      }; 
   


    const objectToJSON = async ({data}) =>{
        return await JSON.parse(JSON.stringify(data).slice(1, -1))
    }

    //will return positions (id) of a given number
    //Give - numbers[id]
    //Get - positions[id]
    //Format => {'was': boolean, 'position': number }
    const isLast = async({to_find}) => {
        let positionInfo = await fetch(process.env.REACT_APP_DATA+'/positions?numberId='+to_find,{
            method: 'GET', headers: { "Content-Type": "application/json" }

        })
        let posAnswer = await positionInfo.json()
        //[ { "id": 2, "numberId": xxxxxx } ]
        if(posAnswer.length == 0){
            return { 'was' : false }
        }
        else{
            //let info = await fetch('http://localhost:3400/numbers?value='+to_find)
            //let num_answer = await info.json()
            //[ { "id": xxxx, "value": x, "count": x } ]
            let answer = JSON.parse(JSON.stringify(posAnswer).slice(1, -1))
            return { 'was': true, 'position': answer['id']}
        }
    }

    //Format = [ numberId, numberId ]
    const whichAreLast = async() =>{
        let posInfo = await fetch(process.env.REACT_APP_DATA+'/positions',{
            method: 'GET', headers: { "Content-Type": "application/json" }

        })
        let pos_answer = await posInfo.json()

        
        if(pos_answer.length ==0 ){
            return []
        }
        let theyAre = []
        pos_answer.forEach((i)=>{
            console.log(i)
            theyAre.push(i['numberId'])
        })
        return theyAre
    }

     //Give - Value
     const whichIs = async({number_value}) =>{
        let numberInfo = await fetch(process.env.REACT_APP_DATA+'/numbers?value='+ number_value,{
            method: 'GET', 
            headers: { "Content-Type": "application/json" }
        })
        let numberAnswer = await numberInfo.json()
        
        
        if(numberAnswer.length == 0){
            return { 'whichis': 'nobody'}
        }else{
            let answer = JSON.parse(JSON.stringify(numberAnswer).slice(1, -1))
        
            return { 'whichis': 'somebody','id': answer['id'], 'count': answer['count'] }} 
        }
    

    const savePosition1 = async ({value_id}) =>{
        let positionInfo = await fetch(process.env.REACT_APP_DATA+'/positions', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
        let positionAnswer = await positionInfo.json()
        if(positionAnswer.length == 0) {
            let savePosition = await fetch(process.env.REACT_APP_DATA+'/positions', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({"id": 1, "numberId": value_id})        
                })
                let savedInfo = await savePosition.json()
                return savedInfo
        }
        //have at least one
        
        else{
            console.log('here')
            let savePosition = await fetch(process.env.REACT_APP_DATA+'/positions', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    //body: JSON.stringify({"id": 1, "numberId": value_id})        
                })
            let savedInfo = await savePosition.json()
            let pureObject = await JSON.parse(JSON.stringify(savedInfo))
            let existing = []

                pureObject.forEach((i)=>{
                    //console.log(i.numberId)
                    existing.push(i.numberId)
                })
           

            //if existing is one
                //if it is same id
                    //=> do nothing
                //if it isn't same id
                    //=>go to the first (update)
                    //=> move the first to second(update)
            if(existing.length == 1){
                /* if(existing[0] == value_id){
                    console.log('already no 1')
                    return {'status': 'ok'}
                }else{ */
                if(existing[0] !== value_id){
                    let toSecond = existing[0] 
                    let toFirst = value_id

                    let firstUpdate = await fetch(process.env.REACT_APP_DATA+'/positions/1', {
                                    method: 'PATCH', headers: { "Content-Type": "application/json",  }, 
                                    body: JSON.stringify({
                                        "numberId": toFirst
                                    })
                                })
                    let firstUpdatedInfo = await firstUpdate.json()

                    let secondUpdate = await fetch(process.env.REACT_APP_DATA+'/positions/', {
                                    method: 'POST', headers: { "Content-Type": "application/json",  }, 
                                    body: JSON.stringify({
                                        "numberId": toSecond
                                    })
                                })
                    let secondUpdatedInfo = await secondUpdate.json()
                    return secondUpdatedInfo 
                    //return await swipe({toFirst: toFirst, toSecond: toSecond})

                }
            }
            
            //if existing is two
                //if it is in that two 
                    //if 1st 
                        //==> do nothing
                    //if 2nd
                        //=> go to the first (update)
                        //=> move the first to the second (update)
                //if it is not in that two
                    //=> go the the first (update)
                    //=> move the first to the second (update)
            if(existing.length == 2){
                if(existing.includes(value_id)){
                    /* if(value_id == existing[0]){
                        console.log('let do nothing')
                        return{ 'status': 'ok'}
                    } */
                    if(value_id == existing[1]){
                        let toSecond = existing[0] 
                        let toFirst = value_id
                        return await swipe({toFirst: toFirst, toSecond: toSecond})
                    }
                }else{
                    let toSecond = existing[0] 
                    let toFirst = value_id
                    return await swipe({toFirst: toFirst, toSecond: toSecond})

                }
        }
    }
}
   

    const swipe = async ({toFirst, toSecond})=>{
        let firstUpdate = await fetch(process.env.REACT_APP_DATA+'/positions/1', {
            method: 'PATCH', headers: { "Content-Type": "application/json",  }, 
            body: JSON.stringify({
                "numberId": toFirst
            })
        })
        let firstUpdatedInfo = await firstUpdate.json()

        let secondUpdate = await fetch(process.env.REACT_APP_DATA+'/positions/2', {
            method: 'PATCH', headers: { "Content-Type": "application/json",  }, 
            body: JSON.stringify({
                "numberId": toSecond
            })
        })
        let secondUpdatedInfo = await secondUpdate.json()
        return firstUpdatedInfo
    }


    const disable = () =>{
        setTimeout(()=> {
            setOnFire(false)
        }, 1000)
    }

    const saveNumber = async ({value}) => {
        let numberId = uuidv4()
        let anInput = { "id" : numberId, "value": value, "count": 1 }
        let number_info = await whichIs({number_value:value})
    
        if(number_info['whichis'] == 'nobody'){
            let saveNumber = await fetch(process.env.REACT_APP_DATA+'/numbers', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(anInput)        
                })
            let savedInfo = await saveNumber.json()
            return savedInfo
        }
        //willl update
        else if(number_info['whichis'] == 'somebody'){
            let upateNumber = await fetch(process.env.REACT_APP_DATA+'/numbers/'+number_info['id'], {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",

                }, 
                body: JSON.stringify({
                    "count": number_info['count'] + 1
                })
            })
            let updatedInfo = await upateNumber.json()
            return updatedInfo
        }else{
            console.log('Do Nothing')
        }
              
    }
    const handler = async (event) =>{
        event.preventDefault();
        let number_info = await saveNumber({value: parseInt(nextNumber)})
        let number_answer = await JSON.parse(JSON.stringify(number_info))
        let savedOrUpdatedNumberID = await number_answer['id']
        //console.log(savedOrUpdatedNumberID)
        //let position_info = await savePosition1({value_id: savedOrUpdatedNumberID})    
        //let position_answer = await JSON.parse(JSON.stringify(position_info))
        //console.log(position_answer)
        
        let fib = await Promise.resolve(isInTheFirstThousandFibonacci(nextNumber))
        let isFab = await JSON.parse(JSON.stringify(fib))
        console.log(isFab)
        //console.log(await fib)
        if(isFab['isIt'] == true){
            console.log('ok')
            setOnFire(true)
            disable()
        }       
        setNextNumber("")
      
        

     
    }

    return ( 
    <>
    {console.log('Input Rerender')}
    <form action="" onSubmit={handler}>
    <Stack direction="row" spacing={2}>
        {/* <label>{`Enter ${data && data.length > 0 ? 'Next' : 'First'} Number`}: 
            <input type="text" value={nextNumber} onChange={(e)=> setNextNumber(e.target.value)}/>
        </label> */}
        {/* <label>{`Enter Next Number`}: 
            <input type="text" value={nextNumber} onChange={(e)=> setNextNumber(e.target.value)}/>
        </label> */}
        <TextField value={nextNumber} label="Enter Number" type="number" InputLabelProps={{
            shrink: true,
          }}
          onChange={(e)=> setNextNumber(e.target.value)}
        />
       {/*  <input type="submit" /> */}
         { !isPending &&  <Button onClick={handler} variant="contained" endIcon={<SendIcon />}>Add</Button> }
        { isPending && <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SendIcon />}
        variant="outlined"
      >
        Adding...
      </LoadingButton> } 
        
        <Confetti config={config} active={onFire} />
        </Stack>
    </form> 
   
    </>
    );
}

 
export default Input;




