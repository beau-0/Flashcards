import React, { useState } from "react";
import { Link} from "react-router-dom";

const InputForm = ({parent, deckId, handleSubmit, front, back, setFront, setBack}) => {

    console.log("Front prop value:", front);    
    const handleClear = () => {
        setFront("");
        setBack("");
        console.log("triggered")
      }; 

return (    

<div>
    <div>
    <form onSubmit={handleSubmit}>
        <div>
        <label >Front: &nbsp;&nbsp;&nbsp;&nbsp;</label>
        <textarea
            id="front"
            value={front}
            placeholder="Card Back"
            onChange={(e) => setFront(e.target.value)}/>
            
        </div>
        <div>
        <label >Back: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <textarea 
            id="description" 
            value={back} 
            placeholder="Card Front"
            onChange={(e) => {setBack(e.target.value)}}>
        </textarea>
        </div>
        { parent == "add"? 
        <div>
         <button 
         type="submit"  
         class="btn btn-success btn-sm m-2"  
        onClick={async () => {
        await handleSubmit(); 
        handleClear(); // 
        }}>
        
            Save</button>
         <Link to={`/decks/${deckId}`}>
         <button class="btn btn-warning btn-sm m-2" >Done</button>
         </Link>
         </div>
        :
        <div>
        <Link to={`/decks/${deckId}`}> <button class="btn btn-warning btn-sm">Cancel</button> </Link>
        <button type="submit" class="btn btn-success btn-sm" >Save</button>
        </div>
        }
    </form>
    </div>
</div>
)


}

export default InputForm;