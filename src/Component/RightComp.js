import React,{useRef,useState} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import './RightComp.css'

const RightComp = () => {
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
    

function dataSubmit(e){
    // e.preventDefault();
    var data = {
        dish: dishName,
        ingredient: tags
    }
    // console.log(data)

    fetch('http://localhost:3001/send', {
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
        <form onSubmit={dataSubmit}>
            <Typography>
                Dish
            </Typography>
            <TextField  placeholder='Name' required  onChange={(e) => {
            setDishName(e.target.value);
          }} />
           
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
            <Button type='submit' variant="outlined">Submit</Button>
        </form>
    </div>
  )
}

export default RightComp
