import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api";   
import { NavLink } from "react-router-dom";
import DeckTile from "./DeckTile" 
import NavigationBar from "../Layout/NavigationBar.js";


const GetDecks = () => {

    const [decks, setDecks] = useState([]);
    const abortController = new AbortController();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataAndSet = async () => {
            try {
                const decks = await listDecks();
                setDecks(decks);
                setLoading(false);
            }
            catch (error) {
                setError(error); 
            }
        }
        
        fetchDataAndSet();
        return () => abortController.abort(); 
        }, []);

    if (error) {console.log("Fetch data error:", error)}
    if (loading) {return <p>Loading.. </p>}

    const decksDisplay = decks.map((deck) => {
        const length = deck.cards.length;
        return <DeckTile id={deck.id} name={deck.name} description={deck.description} numberOfCards={length} setDecks={setDecks}/>
    })

    return (
        <main >
            <NavigationBar />
            <section >
                <div class="container mb-2">
                <h2 class="cursive-text">Decks</h2>
                <NavLink to="/decks/new"><button type="button" class="btn btn-success mb-4">Create New Deck +</button></NavLink>
                </div>
                {decksDisplay}
            </section>
        </main>
    )
}

export default GetDecks;