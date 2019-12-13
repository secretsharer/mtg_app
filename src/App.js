import React, { Component } from "react";
// import Grid from "@material-ui/core/Grid";
import debounce from "lodash.debounce";

import SearchForm from "./components/SearchForm";
import ScrollingCards from "./components/ScrollingCards";
// import FilterChip from "./FilterChip";
import "./App.css";

const mtg = require("mtgsdk");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      cards: [],
      url: '',
      nextPage: 1,
    };
  
    window.onscroll = debounce(() => {
      const {
        loadNextCards,
        state: { error, isLoading, hasMore }
      } = this;
      console.log(hasMore, isLoading);
      if (error || isLoading || !hasMore) return;
        console.log({
          innerHeight: window.innerHeight,
          scrollTop: document.documentElement.scrollTop,
          party: window.innerHeight + document.documentElement.scrollTop,
          noParty: document.documentElement.offsetHeight
        });
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        loadNextCards();
        console.log("scrolling api call has fired");
      }
    }, 100);
  }

  // UNSAFE_componentWillMount() { 
  //   this.loadNextCards();
  // }

  handleSubmit = () => {
    this.loadNextCards();
  };


  loadNextCards = () => {
    this.setState({ isLoading: true }, () => {
      mtg.card
        .where({
          types: "creature",
          contains: "imageUrl",
          page: this.state.nextPage,
          pageSize: 20
        })
        .then(cards => {
          const nextCards = cards.map(card => ({
            name: card.name,
            url: card.imageUrl,
            artist: card.artist,
            set: card.set,
            type: card.types,
            id: card.id,
            originalType: card.originalType,
          }));

          this.setState({
            hasMore: this.state.cards.length < 100,
            isLoading: false,
            cards: [...this.state.cards, ...nextCards],
            nextPage: this.state.nextPage + 1,
            // ScrollingCards: this.state,
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };

  render() {
    const { error, hasMore, isLoading } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">| Creatures Cards |</h1>
        </header>
        <button style={{ margin: "20px auto" }} onClick={this.handleSubmit}>
          Display Creature Cards
        </button>

        <SearchForm getCardsByName={this.getCardsByName} />

        {this.state.name ? (
          <p> Name of card : {this.state.name} </p>
        ) : (
          <React.Fragment>
            <ScrollingCards cards={this.state.cards} />
          </React.Fragment>
        )}
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div style={{ margin: "20px auto" }}>Loading...</div>}
        {!hasMore && <div style={{ margin: "20px auto" }}>The end!</div>}
      </div>
    );
    }
  }











