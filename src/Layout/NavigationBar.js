import { useParams, useLocation, Link } from "react-router-dom";
import React from "react";


const NavigationBar = ({deckTitle}) => {

    let currentPath = '';
    const url = useLocation();
    const pages = url.pathname.split('/')
        .filter((page) => page !== '');

    const study = pages.includes('study');
    const newCard = pages.includes('new');
    const editDeck = pages.includes('edit') && pages.includes('decks');
    const { deckId, cardId } = useParams();
    const editCard = pages.includes('edit') && pages.includes('cards');

    
    return (
      <nav class="mb-4">
        <ul className="horizontal-nav">

          <li>
            <Link to="/">Home &gt; </Link>
          </li>

          {deckTitle && (
          <li>
            <Link to={`/decks/${deckId}`}>{deckTitle}  </Link>
          </li>)}

          {editDeck && !editCard && (
          <li>
            <Link to={`/decks/${deckId}/edit`}> &gt; Edit Deck {} </Link>
          </li>)}

          {study && (
          <li>
            <Link style={{ color: "gray" }} to={`/decks/${deckId}/study`}> &gt; Study </Link>
          </li>)}

          {newCard && (
          <li>
            <Link style={{ color: "gray" }} to={`/decks/${deckId}/cards/new`}> Add Card </Link>
          </li>)}

          {editCard && (
          <li>
            <Link style={{ color: "gray" }} to={`/decks/${deckId}/cards/${cardId}`}> Edit Card </Link>
          </li>)}

        </ul>
      </nav>
    );
  };

  export default NavigationBar;






