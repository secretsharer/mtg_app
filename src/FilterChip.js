import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useEffect } from 'react';
// import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 5,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function OutlinedChips(props) {

    const classes = useStyles();

    const handleNameClick = () => {
        console.info('Filtering cards by name.');
        props.cardsByName();
    }
    const handleArtistClick = () => {
        console.info('Filtering cards by artist.');
        props.cardsByArtist();
    };
    const handleSetClick = () => {
        console.info('Filtering cards by set.');
        props.cardsBySet();
    };
    const handleOriginalTypeClick = () => {
        console.info('Filtering cards by original type.');
        props.cardsByOriginalType();
    };

    return (
        <div className={classes.root}>
            <Chip
                avatar={<Avatar>N</Avatar>}
                label="Name"
                onClick={handleNameClick}
                variant="outlined"
            />
            <Chip
                avatar={<Avatar>A</Avatar>}
                label="Artist"
                onClick={handleArtistClick}
                variant="outlined"
            />
            <Chip
                avatar={<Avatar>S</Avatar>}
                label="Set"
                onClick={handleSetClick}
                variant="outlined"
            />
            <Chip
                avatar={<Avatar>O</Avatar>}
                label="Original Type"
                onClick={handleOriginalTypeClick}
                variant="outlined"
            />
        </div>
    );

}



    // const [cards, setCards] = useState(cards, setCards);

    // useEffect(() => {
    //     props.loadNextCards(cards)
    // }, [cards]
    // );