import React, { useState } from "react";
import NavigationBar from "../Layout/NavigationBar";
import { createDeck } from "../utils/api";

const CreateDeck = () => {

 const [deckTitle, setDeckTitle] = useState("");
 const [deckDescription, setDeckDescription] = useState("");
 const [newDeck, setNewDeck] = useState({});

 const handleSubmit = () => {

    setNewDeck({deckTitle, deckDescription});

    const createNewDeck = async () => {
        const abortController = new AbortController();

        try {
            await createDeck(newDeck, AbortController.signal);
        }
        catch (error) {return <div>`Error: ${error}</div>};

        setDeckDescription("");
        setDeckTitle("");
    }
 }

    return (
    <div>
        <NavigationBar />
        <h4>{deck.name}: Create Card </h4>
        <form onSubmit={handleSubnmit}>
            <label>Name</label>
            <input type="text" id="title" value={title} onChange={(e) => {setDeckTitle(e.target.value)}} >Deck Name</input>
            <label>Description</label>
            <input type="text" id="description" value={description} onChange={(e) => {setDeckDescription(e.target.value)}}>Brief Description  </input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}

export default CreateDeck;