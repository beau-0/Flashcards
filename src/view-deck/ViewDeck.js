import React, { useState, useEffect } from "react";
import { useParams, Switch, Route, Link, NavLink, useLocation } from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";
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
        return <CardTile cardFront={cards.front} cardBack={cards.back} cardId = {cards.id} setDeck={setDeck}/>
    })


return (
    <>
    <div>
        <NavigationBar deckTitle={deck.name} deckId={deckId} />
    </div>
    <div>
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link to={`/decks/${deckId}/edit`} >
        <button class="btn btn-info btn-sm m-1 btn3d">Edit</button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
        <button class="btn btn-success btn-sm m-1 btn3d">Study</button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button class="btn btn-warning btn-sm m-1 btn3d">+ Add Cards</button>
        </Link>
        <button class="btn btn-danger btn-sm m-1 btn3d">Delete Deck</button>
    </div>
    <div class="m-4">
        <h4 class="m-2">Cards: </h4>
        {cardsDisplay}
    </div>
    </>
)}

export default ViewDeck;