import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

 
export default function CardsGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Cards</ListSubheader>
        </GridListTile>
        {this.props.cards.map(card => (
          <GridListTile key={card.id}>
            <img src={card.url} alt={""} />
            <GridListTileBar
              title={card.name}
                    subtitle={<span>by: {card.artist} {card.set} {card.originalType}</span>}
              actionIcon={
                  <IconButton aria-label={`info about ${card.name}`} className={classes.icon}>
                  {/* <InfoIcon /> */}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

//  {this.props.cards.map(card => (
//             <Grid key={card.id}>
//               <Grid item xs={12} sm={6}>
//                 <h6 data-tooltip={card.name}>
//                   <img href="#" src={card.url} alt={""} />
//                 </h6>
//               </Grid>
//             </Grid>