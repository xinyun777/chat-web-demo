import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Chat from '../chat-gpt-dome'
import { Grid, Paper, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 700,
    marginTop: 20,
  },
}));

const Index = () => {
  const classes = useStyles();
  const navigate = useNavigate();


  const changePush =() => {
    navigate('/chatTemplate')
  }


  return (
    <div className={classes.root}>
      <Grid>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Button variant="contained" color="primary" onClick={changePush}>
                  模板
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <Chat/>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Index;
