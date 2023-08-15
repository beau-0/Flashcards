import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
        if (currentCard === deck.cards.length -1 && isFlipped) {return <button onClick={handleRestart} class="btn btn-success btn-circle btn-sm">restart</button>}
        if (currentCard === deck.cards.length -1 && !isFlipped) {return <button onClick={handleFlip} class="btn btn-warning btn-circle btn-sm">Flip </button>}
        if (isFlipped && currentCard != deck.cards.length -1) {return <button onClick={handleNextCard} class="btn btn-success btn-circle btn-sm">Next </button>}
        if (!isFlipped) {return <div> <button onClick={handleFlip} class="btn btn-warning btn-circle btn-sm">Flip </button> </div>}
    }

    const handleRestart = () => {
        setCurrentCard(0);
        setCardDisplay(deck.cards[0].front);
        setIsFlipped(false);
    }

    const NotEnoughCards = ({deckId}) => {
        return (<div>
            <h5>Not Enough cards.</h5>
            <p>Minimum three cards needed.</p>
            <div>
            <Link to={`/decks/${deckId}/cards/new`}>
            <button >Add Cards</button>
            </Link>
            </div>
        </div>)
    }

    console.log(deck.cards.length)

    return (
        <div>
             <NavigationBar deckTitle={deck.name} deckId={deckId} />
        <div class="container m-3">
            <h2>Study:  {deck.name}</h2>
        </div>
        <div class="shadow p-3 mb-5 bg-white rounded m-2" >
            
            {deck.cards && deck.cards.length > 2 ?
                <div>
                <p class="mb-2">Card {currentCard +1} of {deck.cards.length} </p>
                <p class="mt-2 mt-2 display-4">{cardDisplay}</p>
                <div class="container mt-3">{identifyButton()}</div>
                </div> 
                :<NotEnoughCards deckId={deckId}/>}
        </div>
        </div>
    )
}

export default StudyDeck;