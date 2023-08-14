import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";


const AddCard = () => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");  
    const [deck, setDeck] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { deckId } = useParams();
    const [isSaving, setIsSaving] = useState(true);
    
    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async () => {
            try {
                const deckData = await readDeck(deckId, abortController.signal);
                setDeck(deckData);
                setIsLoading(false);
            }
            catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchDeck();
        return () => {abortController.abort()}
    }, [deckId]);

    if(isLoading) return (<div>Loading..</div>);
    if (error) {return <div>Error: {error.message}</div>};


    const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!front || !back) {
        alert("Please provide text for both front and back of the card.");
        return;
    }
    const newCard = {
        front,
        back,
        };

    setDeck((prevDeck) => ({
            ...prevDeck, cards:  [...prevDeck.cards, newCard],
        }));
    const updateNewDeck = async () => {
        const abortController = new AbortController();
        try {
            await createCard(deckId, newCard, abortController.signal);
            setFront(""); 
            setBack("");
            console.log(deck);
        }
        catch (error) {
            setError(error);
            setIsSaving(false);
            console.log(error);
        }
    }

    updateNewDeck();
    if (isSaving) return (<div>Saving..</div>);
    }

    return (
        <div>
        <NavigationBar deckTitle={deck.name}/>    
        <h4>{deck.name}: Create Card </h4>
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front:&nbsp;&nbsp;</label>
        <textarea

          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}/>
          <div>
            <label htmlFor="back">Back:&nbsp;&nbsp;&nbsp;</label>
            <textarea
   
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}/>
          </div>
          <button type="submit" class="btn btn-success btn-sm m-2">Save</button>
          <Link to={`/decks/${deckId}`}>
          <button class="btn btn-warning btn-sm m-2">Done</button>
          </Link>
          </form>
          </div>
    )
}

export default AddCard;