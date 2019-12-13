import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

import "../App.css";

const mtg = require( "mtgsdk" );

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      name: null,
      url: null,
      card: null,
      cardError: false
    };
  }

  getCardsByName = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    if (name) {
        mtg.card.where({ name: name, types: 'creature', pageSize: 1 })
        .then(res => {
          if (res[0] === undefined) {
              this.setState({ name, cardError: true });
              this.errorMessage(); 
          } else {
        this.setState({ name, url: res[0].imageUrl, cardError: false });
        }
      }) 
    }
    return;
  }

  errorMessage = () => {
    console.log("Sorry, I can't seem to find that card :(");
  }
 
  render () {
      return (
        <Container className="search-box" maxWidth="sm">
          <form onSubmit={this.getCardsByName}>
            <input name="name" />
            <button>Search Cards</button>
            <h4>{this.state.name}</h4>
            {this.state.cardError ? (
              <h5>I can't seem to find that card :(</h5>
            ) : (
              <h6 data-tooltip={this.state.name}>
                <img
                  src={this.state.url}
                  alt={this.state.name}
                  style={{ margin: "20px auto", display: "block" }}
                />
              </h6>
            )}
          </form>
        </Container>
      );
    
    }
  }
