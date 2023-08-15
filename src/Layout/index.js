import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import GetDecks from "../home/GetDecks";
import CreateDeck from "../create-deck/CreateDeck";
import StudyDeck from "../study-deck/StudyDeck";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavigationBar from "../Layout/NavigationBar";
import ViewDeck from "../view-deck/ViewDeck.js";
import AddCard from "../view-deck/AddCard.js"
import EditDeck from "../view-deck/EditDeck.js"
import EditCard from "../view-deck/EditCard.js"

function Layout() {

  return (
    <div>
      <Header />
      <div className="container">
        <div>
        <Switch>
        <Route exact path='/'>
          <GetDecks />
        </Route>
        <Route path='/decks/new'>
          <CreateDeck />
        </Route>
        <Route exact path='/decks/:deckId'>
          <ViewDeck />
        </Route>
        <Route path='/decks/:deckId/study'>
          <StudyDeck />
        </Route>
        <Route path='/decks/:deckId/cards/new'>
          <AddCard />
        </Route>
        <Route path='/decks/:deckId/edit' >
          <EditDeck />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit' >
          <EditCard />
        </Route>
        <Route>
          <NotFound />
        </Route>
        </Switch>
        </div>
      </div>
    </div>
  );
}

export default Layout;
