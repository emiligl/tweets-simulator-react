import React, { useState, useEffect } from "react";
import { Container, Snackbar } from "@material-ui/core";
import Header from "./components/Header";
import SentTweet from "./components/SendTweet";
import ListTweets from "./components/ListTweets";

import { TWEETS_STORAGE } from "./utils/constants";

function App() {
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null
  });

  const [allTweets, setAllTweets] = useState([]);
  const [reloadTweets, setReloadTweets] = useState(false);

  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEETS_STORAGE);
    const AllTweetsArray = JSON.parse(AllTweetsStorage);
    setAllTweets(AllTweetsArray);
    setReloadTweets(false);
  }, [reloadTweets]);

  const deleteTweet = index => {
    allTweets.splice(index, 1);
    setAllTweets(allTweets);
    localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweets));
    console.log(allTweets);
    setReloadTweets(true);
  };

  const handleClose = () => {
    setTimeout(() => {
      setToastProps({ ...toastProps, open: false });
    }, 3000);
  };

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header />
      <SentTweet setToastProps={setToastProps} allTweets={allTweets} />
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet} />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={toastProps.open}
        autoHideDuration={1000}
        message={<span id="message-id">{toastProps.text}</span>}
        onClose={handleClose}
      />
    </Container>
  );
}

export default App;
