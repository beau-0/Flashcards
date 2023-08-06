import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";


const AddCard = ({deckDescription}) => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");  
    const [deck, setDeck] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { deckId } = useParams();
    
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
    const newCard = {
        front,
        back,
        };

    setDeck({ ...deck, cards: [...deck.cards, newCard] });
    }

    return (
        <div>
            <h2>{deckDescription}</h2>
        <form onSubmit={handleSubmit}>
        <label htmlFor="front">Front:</label>
        <input
          type="text"
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}/>
          <div>
            <label htmlFor="back">Back:</label>
            <input
              type="text"
              id="back"
              value={back}
              onChange={(e) => setBack(e.target.value)}/>
          </div>
          <button type="submit">Save</button>
          <Link to={`/decks/${deckId}`}>
          <button>Done</button>
          </Link>
          </form>
          </div>
    )
}

export default AddCard;