import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import "../App.css";

export default class ScrollingCards extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <div className="party">
        <Grid container spacing={3}>
          <p>{console.log(this.props.cards)}</p>
          {this.props.cards.map(card => (
            <Grid key={card.id}>
              <Grid item xs={12} sm={6}>
                <h6 data-tooltip={card.name}>
                  <img href="#" src={card.url} alt={""} />
                </h6>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    );}
  
}



