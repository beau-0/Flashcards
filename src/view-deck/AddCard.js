import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar";
import InputForm from "./InputForm";


const AddCard = () => {

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");  
    const [deck, setDeck] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { deckId } = useParams();
    const [isSaving, setIsSaving] = useState(true);
    
    useEffect(() => {
        const abortController = new AbortController();
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

    if(isLoading) return (<div>Loading..</div>);
    if (error) {return <div>Error: {error.message}</div>};


    const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handleSubmit - Start");
    if (!front || !back) {
        alert("Please provide text for both front and back of the card.");
        return;
    }
    const newCard = {
        front,
        back,
        };


    const updateNewDeck = async () => {
        const abortController = new AbortController();
        try {
            await createCard(deckId, newCard, abortController.signal);
            
            setFront(""); 
            setBack("");
            
            setDeck((prevDeck) => ({
                ...prevDeck, cards:  [...prevDeck.cards, newCard],
            }));
        }
        catch (error) {
            setError(error);
            setIsSaving(false);
        }
    }

    updateNewDeck();
    console.log("handleSubmit - End");
    if (isSaving) return (<div>Saving..</div>);
    }

    return (
        <div>
        <NavigationBar deckTitle={deck.name}/>    
        <h4>{deck.name}: Create Card </h4>
        <InputForm 
            handleSubmit={handleSubmit} 
            deckId={deckId} 
            setFront={setFront} 
            setBack={setBack} 
            parent={"add"}/>
          </div>
    )
}

export default AddCard;