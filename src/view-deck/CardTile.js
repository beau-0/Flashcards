import React, { useState, useEffect } from "react";
import { deleteCard } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom";

const CardTile = ({cardFront, cardBack, cardId, setDeck}) => {

    const { deckId } = useParams();

    const handleDelete = async (cardId) => {
        const abortController = new AbortController();
        try {
            await deleteCard (cardId, abortController.signal);
            setDeck(prevDeck => {
                const updatedCards = prevDeck.cards.filter(card => card.id !== cardId);
                return { ...prevDeck, cards: updatedCards }});
        }
        catch (error) {return <div>`Error: ${error}`</div>}
    }

    return (
        <div key={cardId} class="shadow p-3 mb-5 bg-white rounded m-2">
            <div >
            <div class="m-1"><h6>Front: </h6> {cardFront}</div>
            <div class="m-1"><h6>Back: </h6>{cardBack}</div>
            </div>
            <div> 
            <Link to={`/decks/${deckId}/cards/${cardId}/edit`}>
            <button class="btn btn-info btn-sm m-1">
            Edit
            </button>
            </Link>
            <button class="btn btn-danger btn-sm m-1" onClick={() => handleDelete(cardId)}>
            Delete
            </button>
            </div>
        </div>
    )
}

export default CardTile;