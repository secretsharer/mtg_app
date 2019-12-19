import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 3,
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    marginLeft: 330,
    width: 260,
    height: 500,
  },
}));


export default class CardsGrid extends Component {
  constructor(props) {
    super(props);
}

render() {
  return (
    <div className={useStyles.root} style={{marginLeft: 330}}>
      <GridList cellHeight={465} cols={3} style={{ height: 'auto', width: 'auto' }} className={useStyles.gridList}>
          {this.props.cards.map(card => (
            <GridListTile key={card.id}>
              <img src={card.url} alt={""} />
              <GridListTileBar
                title={card.name}
                      subtitle={<span>by: {card.artist} {card.set} {card.originalType}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${card.name}`} className={useStyles.icon}>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
