import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Grid,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Paper,
  Icon,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Configuration, OpenAIApi } from "openai";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 80,
    marginTop: 20,
  },
  chat: {
    flexGrow: 1,
    minHeight: "0",
    overflow: "auto",
    padding: theme.spacing(2),
    height: 500,
    backgroundColor: "#f5f5f5",
  },
  prompt: {
    height: 200,
    width: 400,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  button: {
    marginTop: 5,
    width: "100%",
    height: 60,
  },
}));

const Index = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(
    "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"
  );
  const [model, setModel] = React.useState({
    value: "",
    label: "hai",
  });
  const [modelList, setModelList] = useState([]);

  async function handleSend() {
    if (input.trim()) {
      let messageTem = [...messages, { role: "user", content: input }];
      const configuration = new Configuration({
        organization: "org-cVpKYRewPA62Y2WwxybTaBbS",
        apiKey: key,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: model,
        messages: messageTem,
        max_tokens: 200,
        temperature: 0.9,
        stream: true,
        // stop: ["Human:", "AI:"],
      });
      let str = response.data.split(/\n\n/);
      let role = "";
      let strNew = str.map((item) => {
        if (item.length > 20) {
          let delta = JSON.parse(item.substring(5).trim()).choices[0].delta;
          if (delta.role) {
            role = delta.role;
          }
          if (delta.content && delta.content != null) {
            return delta.content;
          }
        }
      });
      let content = strNew.join("")
      messageTem = [...messageTem, { role: role, content: content }];
      setMessages(messageTem);
      setInput("");
      console.log(strNew, str, "消息");
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    console.log(event);
    setModel(event.target.value);
  };

  const linkOpenAI = async () => {
    if (key) {
      const configuration = new Configuration({
        organization: "org-cVpKYRewPA62Y2WwxybTaBbS",
        apiKey: key,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.listEngines();
      const data = response.data.data;
      let modelListTmp = data.map((item) => {
        return { label: item.id, value: item.id };
      });
      console.log(modelListTmp);
      setModelList(modelListTmp);
    } else {
      let str =
        'data: {"id":"chatcmpl-73SgO5r1sKvPRJ27qqBTqprXxJKkt","object":"chat.completion.chunk","created":1681059596,"model":"gpt-3.5-turbo-0301","choices":[{"delta":{"role":"assistant"},"index":0,"finish_reason":null}]}';

      console.log(
        str.substring(5).trim(),
        "测试",
        JSON.parse(str.substring(5).trim())
      );
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={7}>
            <TextField
              fullWidth={true}
              value={key}
              id="outlined-basic"
              label="openAI Key"
              variant="outlined"
              onChange={(event) => setKey(event.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={linkOpenAI}
              style={{ height: "50px", marginTop: "2px" }}
            >
              连接
            </Button>
            <Snackbar
              open={open}
              onClose={handleClose}
              message="请输入key后再连接!!!"
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Model</InputLabel>
              <Select
                native
                value={model}
                onChange={handleChange}
                inputProps={{
                  name: "age",
                  id: "age-native-simple",
                }}
              >
                <option aria-label="None" value="" />
                {modelList.map((item) => (
                  <option value={item.value}>{item.label}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <List className={classes.chat}>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={message.content} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={10}>
            <Paper className={classes.paper} elevation={0}>
              <TextField
                fullWidth={true}
                multiline
                maxRows={6}
                minRows={2}
                value={input}
                id="outlined-basic"
                label="prompt"
                variant="outlined"
                onKeyDown={handleInputKeyDown}
                onChange={(event) => setInput(event.target.value)}
              />
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper} elevation={0}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                onClick={handleSend}
              >
                发送
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // <Grid container elevation={0} className={classes.root}>
    //   <Grid item xs={9}>
    //     <List className={classes.chat}>
    //       {/* {messages.map((message, index) => (
    //         <ListItem key={index}>
    //           <ListItemAvatar>
    //             <Avatar>
    //               <AccountCircleIcon />
    //             </Avatar>
    //           </ListItemAvatar>
    //           <ListItemText primary={message.text} />
    //         </ListItem>
    //       ))} */}
    //     </List>
    //   </Grid>
    //   <Grid item xs={9}>
    //     <form
    //       className={classes.form}
    //       onSubmit={(event) => event.preventDefault()}
    //     >
    //       <Grid item xs={12} style={{backgroundColor:'red'}}>
    //         <TextField
    //           className={classes.prompt}
    //           variant="outlined"
    //           margin="dense"
    //           placeholder="Type a message"
    //           value={input}
    //           // onKeyDown={handleInputKeyDown}
    //           // onChange={(event) => setInput(event.target.value)}
    //           // InputProps={{
    //           //   endAdornment: (
    //           //     <InputAdornment position="end">
    //           //       <IconButton aria-label="send message" color="primary" onClick={handleSend}>
    //           //         <SendIcon />
    //           //       </IconButton>
    //           //     </InputAdornment>
    //           //   ),
    //           // }}
    //         />
    //       </Grid>
    //       <Grid item xs={1}>
    //         <IconButton
    //           aria-label="send message"
    //           color="primary"
    //           onClick={handleSend}
    //         >
    //           <SendIcon />
    //         </IconButton>
    //       </Grid>
    //     </form>
    //   </Grid>
    // </Grid>
  );
};

export default Index;
