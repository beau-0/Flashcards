import React from "react";
import { NavLink } from 'react-router-dom';

export function DeckTile ({id, description, numberOfCards}) {

    const handleDeleteClick = () => {
    }

    return (
        <div className="deck-tile">
            <h2>{id}</h2>
            <p>{description}</p>
            <p>Number of Cards: {numberOfCards}</p>
            <NavLink to={`/decks/${id}`}><button>View</button></NavLink>
            <NavLink to={`/decks/${id}/study`}><button>Study</button></NavLink>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    );
}

export default DeckTile;