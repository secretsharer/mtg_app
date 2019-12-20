import React, { Component } from "react";
import { debounce } from "lodash";
import SearchForm from "./components/SearchForm";
import CardsGrid from "./components/CardsGrid";
import Chips from "./components/Chips";
import "./App.css";
import ScrollingCards from "./components/ScrollingCards";

const mtg = require("mtgsdk");

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      cards: [],
      url: "",
      nextPage: 1,
      currentSort: "default"
    };

    window.onscroll = debounce(() => {
      const {
        loadNextCards,
        state: { error, isLoading, hasMore }
      } = this;
      console.log(hasMore, isLoading);
      if (error || isLoading || !hasMore) return;
      console.info({
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
    }, 50);
  }

  UNSAFE_componentWillMount() {
    this.loadNextCards();
  }

  loadNextCards = () => {
    this.setState({ isLoading: true }, () => {
      mtg.card
        .where({
          types: "creature",
          contains: "imageUrl",
          contains: "originalType",
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
            originalType: card.originalType
          }));

          this.setState({
            hasMore: this.state.cards.length < 100,
            isLoading: false,
            cards: [...this.state.cards, ...nextCards],
            nextPage: this.state.nextPage + 1
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
    const cardsBySet = [...this.state.cards].sort((a, b) => {
      return a.set.localeCompare(b.set, "en", { sensitivity: "base" });
    });
    const cardsByArtist = [...this.state.cards].sort((a, b) => {
      return a.artist.localeCompare(b.artist, "en", { sensitivity: "base" });
    });
    const cardsByOriginalType = [...this.state.cards].sort((a, b) => {
      return a.originalType.localeCompare(b.originalType, "en", {
        sensitivity: "base"
      });
    });
    // considering putting sort within the if else to pass only a single array at a time
    let { cards, currentSort } = this.state;
    if (currentSort === "sets") {
      cards = cardsBySet;
    }
    if (currentSort === "artist") {
      cards = cardsByArtist;
    }
    if (currentSort === "originalType") {
      cards = cardsByOriginalType;
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">.:| Creatures Cards |:.</h1>
        </header>
        
        <Chips
          names={this.handleSubmit}
          onClick={sort => {
            this.setState({ currentSort: sort });
          }}
        />

        <SearchForm getCardsByName={this.getCardsByName} />
        {this.state.name ? (
          <p> Name of card : {this.state.name} </p>
        ) : (
          <React.Fragment>
            <ScrollingCards cards={cards} />
          </React.Fragment>
        )}
        {error && <div style={{ color: "#900" }}>{error}</div>}
        {isLoading && <div style={{ margin: "20px auto" }}>Loading...</div>}
        {!hasMore && <div style={{ margin: "20px auto" }}>The end!</div>}
      </div>
    );
  }
}
