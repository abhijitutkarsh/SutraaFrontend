import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { Typography } from '@mui/material';
import RightComp from './Component/RightComp';
import React,{useState,useEffect,useRef} from 'react'
import { isDisabled } from '@testing-library/user-event/dist/utils';
import UpdateComp from './Component/UpdateComp';



function App() {
  // const refNext = useRef();
  
  const [count,setCount] = useState(0);

  const [backForButton,setBackForButton] = useState(0)
  const [forButton,setForButton] = useState(0)
const [item,setItem] = useState();
const [startFrom , setStartFrom] = useState(0);
// var startFrom = 5
var limit = 5;
// const [children, setChildren] = useState([]);

function load(e){
  
  e.preventDefault();
  // console.log(startFrom + limit)
  setCount((state)=>{
      state = count+1;
      if(state ==0) setBackForButton(1)
  else
  setBackForButton(0)
      return state;
  })
  console.log(count)
  let values = startFrom + limit
  // setStartFrom(values);
  setStartFrom((state) => {
    state = values
    console.log(state) 
  var data = {
    text: state
  }
  // console.log(data.text)
  fetch('http://localhost:3001/moreData', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
     .then((response) => response.json())
     .then((data) => {
      
        if(data.length === 5)
         { setItem(data)
          setBackForButton(0);
          
          console.log(data)
         }
         else{
          setForButton(1);
          setBackForButton(0);
          setItem(data)
          console.log(1)

         }
       
        

     })
     .catch((err) => {
        console.log(err.message +"hello");
     });
     return state
});


}


function load1(e){
  
  
  setCount((state)=>{
    state = count-1;
    if(state ==0) setBackForButton(1)
  else
  setBackForButton(0)
    return state;
  })
  // console.log(count)
  e.preventDefault();
 
  let values = startFrom - limit
  // setStartFrom(values);
 
  setStartFrom((state) => {
    state = values;
  
    var data = {
      text: state
    }
  fetch('http://localhost:3001/moreData', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
     .then((response) => response.json())
     .then((data) => {
      
        if(data.length === 5)
        { 
          setItem(data)
          setForButton(0);
          // console.log(data)
         }
         else{
          setItem(data)
          // console.log(1)
          setForButton(0);

         }
       
        

     })
     .catch((err) => {
        console.log(err.message +"hello");
     });
    //  console.log(state) 
     return state
 });
}


const handleKeyUp = (event) => {

  // console.log(event.target.value);
  fetch("http://localhost:3001/search", {
      method: "POST",
      body: JSON.stringify({payload: event.target.value}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    }).then(res=> res.json())
    .then(data=>{
      let payload = data.payload;
      console.log(payload)
      setItem(payload)
    })
  // console.log(event.code);
};


useEffect(()=>{
  if(count ==0) setBackForButton(1)
  fetch("http://localhost:3001/seeAll")
  .then(res => res.json())
  .then(
    (result) => {
      
      setItem(result);
    // console.log(result)
    },
    (error) => {

    }
  )

 },[])
//  const Navigate = useNavigate();
  return (
    <div className="App">
<Router>

      <div className="myDivContainer">
      <div className='item'>
        <div id="headleft">
        <Typography variant="h5">
            Dishes
        </Typography>
      <Button variant="contained" startIcon={<AddIcon />} id="createButton" onClick={()=> window.location.href = "/"}>Create</Button>
        </div>
        <br/>
        <TextField placeholder='Search' onChange={handleKeyUp} />

<form>

      {item && item.map((todo,index) => (
        <div>
          <a href={`/dish/${todo.dish}`}>
        <Button varient="text" 
        // onClick={()=>{
        //               Navigate(`/dish/${todo.dish}`)
        //             }}
        
                     >{todo.dish}</Button></a>
        
        </div>
         ))}
         <Button variant="text" id="previousButton" type="submit" onClick={load1} disabled={backForButton} >Previous</Button>
         <Button  variant="text" id="nextButton" type='submit' onClick={load} disabled={forButton} >Next</Button>

         </form>

      </div>
      <div className='item'>
      <Routes>
      {/* Exact match to avoid 
          overriding other routes */}
      <Route exact path="/" element={<RightComp />}/>
      <Route path="/dish/:dish" element={<UpdateComp/>}/>
     
      
    </Routes>
      </div>
      </div>
  </Router>
    </div>
  );
}

export default App;
