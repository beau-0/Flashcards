import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { deleteDeck } from "../utils/api"


export function DeckTile ({id, name, description, numberOfCards, setDecks}) {

    const handleDeleteClick = async () => {
        try {
        await deleteDeck (id);
        setDecks(prevDecks => prevDecks.filter((deck) => deck.id !== id));
        }
        catch (error) {console.error(error)};
    }

    return (
        <div className="deck-tile " class="shadow p-3 mb-5 bg-white rounded m-2">
            <h5>{name}</h5>
            <p>{numberOfCards} cards</p>
            <p>Description: {description}</p>
            <NavLink to={`/decks/${id}`}><button class="btn btn-info btn-sm m-1">View</button></NavLink>
            <NavLink to={`/decks/${id}/study`} ><button class="btn btn-warning btn-sm m-1 ">Study</button></NavLink>
            <button onClick={handleDeleteClick} type="btn" class="btn btn-danger btn-sm m-1">Delete</button>
        </div>
    );
}

export default DeckTile;