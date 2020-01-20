import React, { useState } from "react";
import "./SendTweet.scss";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import ModalContainer from "../ModalContainer";
import FormSendTwwet from "../FormSendTweet";
import { TWEETS_STORAGE } from "../../utils/constants";

export default function SendTweet(props) {
  const { setToastProps, allTweets } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const sendTweet = (event, formValue) => {
    event.preventDefault();
    const { name, tweet } = formValue;
    let allTweetsArray = [];

    if (allTweets) {
      allTweetsArray = allTweets;
    }

    if (!name || !tweet) {
      console.log("WARNING: Todos los campos deben estar informados!");
      setToastProps({
        open: true,
        text: "WARNING: Todos los campos deben estar informados!"
      });
    } else {
      formValue.time = moment();
      console.log(allTweetsArray);
      allTweetsArray.push(formValue);
      localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray));
      console.log("Tweet enviado correctamente!");
      setToastProps({
        open: true,
        text: "Tweet enviado correctamente!"
      });
      closeModal();
    }
    allTweetsArray = [];
  };

  return (
    <div className="send-tweet">
      <Fab
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
        onClick={openModal}
      >
        <AddIcon />
      </Fab>

      <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
        <FormSendTwwet sendTweet={sendTweet}></FormSendTwwet>
      </ModalContainer>
    </div>
  );
}
