import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavigationBar from "../Layout/NavigationBar.js";

const StudyDeck = () => {

    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [error, setError]  = useState(null);
    const abortController = new AbortController();
    const [currentCard, setCurrentCard] = useState(0); 
    const [isFlipped, setIsFlipped] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cardDisplay, setCardDisplay] = useState("");


    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const deckData = await readDeck(deckId, abortController.signal);
                setDeck(deckData);
                setIsLoading(false);
                if (deckData) {
                    setCardDisplay(deckData.cards[currentCard].front)};
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }

        fetchDeck();

        return () => {abortController.abort()}
    }, [deckId]);

    if (error) {return <div>Error: {error.message}</div>}
    if (isLoading) {return <div>Loading...</div>;}

    const handleFlip = () => {
        setIsFlipped(true);
        console.log(deck);
        setCardDisplay(deck.cards[currentCard].back);
    }

    const handleNextCard = () => {
        setIsFlipped(false);
        const nextCard = currentCard +1;
        setCurrentCard(nextCard);
        setCardDisplay(deck.cards[nextCard].front);
    }

    const identifyButton = () => {
        if (currentCard === deck.cards.length -1 && isFlipped) {return <button onClick={handleRestart}>restart</button>}
        if (currentCard === deck.cards.length -1 && !isFlipped) {return <button onClick={handleFlip}>Flip </button>}
        if (isFlipped && currentCard != deck.cards.length -1) {return <button onClick={handleNextCard}>Next </button>}
        if (!isFlipped) {return <> <button onClick={handleFlip}>Flip </button> </>}
    }

    const handleRestart = () => {
        setCurrentCard(0);
        setCardDisplay(deck.cards[0].front);
    }

    return (
        <div>
             <NavigationBar deckDescription={deck.name} deckId={deckId} />
        <div>
            <h2>Study:  {deck.name}</h2>
        </div>
        <div>
            <h3>Card {currentCard +1} of {deck.cards.length} </h3>
            {identifyButton()}
            <p>{cardDisplay}</p>
        </div>
        </div>
    )
}

export default StudyDeck;