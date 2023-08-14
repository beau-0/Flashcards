import React, { useState } from "react";
import NavigationBar from "../Layout/NavigationBar";
import { createDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

const CreateDeck = () => {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();

 const handleSubmit =  async (event) => {
    event.preventDefault();
    const abortController = new AbortController();

    const newDeck = {name: deckTitle, description: deckDescription,};

        try {
            const createdDeck = await createDeck(newDeck, abortController.signal);
            const deckId = createdDeck.id;
            setDeckDescription("");
            setDeckTitle("");

            history.push(`/decks/${deckId}`);
        }
        catch (error) {console.error("Error: ", error)};

    abortController.abort();
 }

    return (
    <div>
        <NavigationBar />
        <h4>Create Deck</h4>
        <div>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" id="title" value={deckTitle} placeholder="Enter deck name" onChange={(e) => {setDeckTitle(e.target.value) }} ></input>
            </div>
            <div>
            <label htmlFor="description">Description: &nbsp;</label>
            <textarea id="description" value={deckDescription} placeholder="Enter a brief description" onChange={(e) => {setDeckDescription(e.target.value)}}></textarea>
            </div>
            <div>
            <button type="submit" class="btn btn-success btn-sm">Submit</button>
            <Link to="/"> <button class="btn btn-warning btn-sm">Cancel</button> </Link>
            </div>
        </form>
        </div>
    </div>
    )
}

export default CreateDeck;