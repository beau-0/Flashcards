import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";
import { updateDeck } from "../utils/api";

const EditDeck = () => {

    const { deckId } = useParams();
    const [deck, setDeck] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [deckTitle, setDeckTitle] = useState(true);
    const [deckDescription, setDeckDescription] = useState(true);
    const history = useHistory();
    
    useEffect(() => {

        const getDeckData = async () => {
            try {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
            setIsLoading(false);
            setDeckTitle(deckData.name)
            setDeckDescription(deckData.description)
            }
            catch (error) {console.error(error)}
        }
        getDeckData();

    }, [deckId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDeck = {
            ...deck,
            name: deckTitle,
            description: deckDescription,
        };

        try {
            await updateDeck(updatedDeck);
            history.goBack();
            console.log(updatedDeck)
        } catch (error) {
            console.error(error);
        }
    };

    if(isLoading){return <p>Loading.. </p>}
    

    return (
        <div>
            <NavigationBar deckTitle={deck.name}/>
            <h4>Edit Deck</h4>
            <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="title">Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                <input type="text" id="title" value={deckTitle} placeholder="Enter deck name" onChange={(e) => {setDeckTitle(e.target.value) }} ></input>
                </div>
                <div>
                <label htmlFor="description">Description:&nbsp;</label>
                <textarea id="description" rows="5" columns="3" value={deckDescription} placeholder="Enter a brief description" onChange={(e) => {setDeckDescription(e.target.value)}}></textarea>
                </div>
                <div>
                <button type="submit" class="btn btn-success">Submit</button>
                <Link to="/"> <button class="btn btn-warning">Cancel</button> </Link>
                </div>
            </form>
            </div>
        </div>
        )
}

export default EditDeck;