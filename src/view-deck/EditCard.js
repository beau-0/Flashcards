import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";
import { updateCard } from "../utils/api";


const EditCard = () => {

    const { deckId, cardId } = useParams();
    const [ newCard, setNewCard] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [front, setFront] = useState();
    const [back, setBack] = useState();
    const history = useHistory();
    const [newDeck, setNewDeck] = useState();
    const [deckDescription, setDeckDescription] = useState();


    useEffect(() => {
        const getDeckandCard = async () => {
            try{
                const deckData = await readDeck(deckId);
                const cardData = await readCard(cardId);
                console.log(deckData)
                setNewDeck(deckData);
                setNewCard(cardData);
                setIsLoading(false);
                setFront(cardData.front);
                setBack(cardData.back);
                setDeckDescription(deckData.name)

            }
            catch (error) {console.error(error)}
        }

        getDeckandCard();
    }, [deckId])

    if(isLoading){return <p>Loading..</p>}

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!front || !back) {
            // Display an error message or prevent submission
            console.log("Please fill in both front and back fields.");
            return;
        }
        
        try {
            const updatedCard = {...newCard, front: front, back: back};
            await updateCard(updatedCard);
            history.push(`/decks/${deckId}`);
            }
            catch (error) {console.error(error)};
        }
    

    return (
        <div>
            <NavigationBar deckTitle={deckDescription}/>
            <h4>Edit Card</h4>
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label >Front: &nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" id="front" value={front} placeholder="Card Front" onChange={(e) => {setFront(e.target.value) }} ></input>
                </div>
                <div>
                <label >Back: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <textarea id="description" value={back} placeholder="Card Back" onChange={(e) => {setBack(e.target.value)}}></textarea>
                </div>
                <div>
                <button type="submit" class="btn btn-success btn-sm">Submit</button>
                <Link to={`/decks/${deckId}`}> <button class="btn btn-warning btn-sm">Cancel</button> </Link>
                </div>
            </form>
    </div>
        </div>
        )

}

export default EditCard;