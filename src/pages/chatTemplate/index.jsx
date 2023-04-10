import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment, IconButton, Grid, List, ListItem, Avatar, ListItemAvatar, ListItemText, Paper } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  chat: {
    flexGrow: 1,
    minHeight: '0',
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  input: {
    flexGrow: 1,
  },
}));

function ChatTemplate() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  function handleSend() {
    if (input.trim()) {
      setMessages([...messages, { text: input }]);
      setInput('');
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <Grid container component={Paper} elevation={0} className={classes.root}>
      <Grid item xs={12}>
        <List className={classes.chat}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
          <TextField
            className={classes.input}
            variant="outlined"
            margin="dense"
            placeholder="Type a message"
            value={input}
            onKeyDown={handleInputKeyDown}
            onChange={(event) => setInput(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="send message" color="primary" onClick={handleSend}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </Grid>
  );
}

export default ChatTemplate;