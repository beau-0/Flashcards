import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";  
import DeckTile from "./DeckTile"  
import { NavLink } from "react-router-dom";


const GetDecks = () => {

    const [decks, setDecks] = useState([]);
    const abortController = new AbortController();
    const [error, setError] = useState();

    useEffect(() => {
        const fetchDataAndSet = async () => {
            try {
                const decks = await listDecks();
                setDecks(decks);
            }
            catch (error) {
                setError(error); 
            }
        }
        
        fetchDataAndSet();
        return () => abortController.abort(); 
        }, []);

    if (error) {console.log("Fetch data error:", error)}

    const decksDisplay = decks.map((deck) => {
        const length = deck.cards.length;
        return <DeckTile id={deck.id} description={deck.description} numberOfCards={length} />
    })

    return (
        <main >
            <section >
                <NavLink to="/create-deck"><button>Create New Deck</button></NavLink>
                {decksDisplay}
            </section>
        </main>
    )
}

export default GetDecks;