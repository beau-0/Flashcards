import React, { useState, useEffect } from "react";
import { useParams, Switch, Route, Link, NavLink } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar.js";
import CardTile from "../view-deck/CardTile";


const ViewDeck = () => {

const { deckId } = useParams();
const [deck, setDeck] = useState(null);
const [error, setError]  = useState(null);
const abortController = new AbortController();
const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

    if (error) {return <div>Error: {error.message}</div>}
    if (isLoading) {return <div>Loading...</div>;}

    const cardsDisplay = deck.cards.map((cards) => {
        return <CardTile cardFront={cards.front} cardBack={cards.back} />
    })

return (
    <>
    <div>
        <NavigationBar deckDescription={deck.name} deckId={deckId} />
    </div>
    <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <button>Edit</button>
        <button>Study</button>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>+ Add Cards</button>
        </Link>
        <button>Delete</button>
    </div>
    <div>
        <h2>Cards</h2>
        {cardsDisplay}

    </div>
    </>
)}



export default ViewDeck;