import React,{useRef,useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import './RightComp.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";


const UpdateComp = () => {
    const {dish} = useParams();
   
    var arr = [];
    
    const [dishName, setDishName] = useState();
    // const [dishIngredient,setDishIngredient] = useState([]);


    const [tags, setTags] = React.useState([]);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			// props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
    const [dataId,setDataId] = useState();
useEffect(() => {
   var data ={
    text: dish
   }
    fetch('http://localhost:3001/specificData', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
     .then((response) => response.json())
     .then((data) => {
      
        console.log(data)
        setDishName(data.dish)
        setTags(data.ingredient)
        setDataId(data._id)
        // console.log(data)

     })
     .catch((err) => {
        console.log(err.message +"hello");
     });

}, [dish])

function dataUpdate(e){
    e.preventDefault();
    var data = {
        id: dataId,
        dish: dishName,
        ingredient: tags
    }
    console.log(data)
    fetch('http://localhost:3001/updateData', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
         .then((response) => response.json())
         .then((data) => {
    // window.location.href='/login';
    console.log(data)
            
                             })
         .catch((err) => {
            console.log(err);
         });
}


  return (
    <div className="rightContainer">
        <form onSubmit={dataUpdate}>
            <Typography>
                Dish
            </Typography>
            <TextField  placeholder='Name' onChange={(e) => {
            setDishName(e.target.value);
          }} defaultValue={dish}/>
           
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							<Button color="primary" varient="outlined">x</Button>
						</span>
					</li>
				))}
			</ul>
			<TextField
				type="text"
				onKeyUp={event => event.keyCode === 32 ? addTags(event) : null}
				placeholder="Press Space to add ingredient" 
			/>
		{/* </div> */}
        <br/><br/>
            <Button type='submit' variant="outlined" >Update</Button>
        </form>
    </div>
  )
}

export default UpdateComp
