import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 9,
    paddingBottom: 7,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  }
}));

const Chips = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Chip
        avatar={<Avatar>N</Avatar>}
        label="Name"
        onClick={() => props.onClick("default")}
        variant="outlined"
      />
      <Chip
        avatar={<Avatar>A</Avatar>}
        label="Artist"
        onClick={() => props.onClick("artist")}
        variant="outlined"
      />
      <Chip
        avatar={<Avatar>S</Avatar>}
        label="Set"
        onClick={() => props.onClick("set")}
        variant="outlined"
      />
      <Chip
        avatar={<Avatar>O</Avatar>}
        label="Original Type"
        onClick={() => props.onClick("originalType")}
        variant="outlined"
      />
    </div>
  );
};

export default Chips;
