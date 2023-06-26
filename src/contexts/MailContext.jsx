import { createContext, useReducer } from "react";
import { mails } from "../mails";

export const MailContext = createContext();
const MailProvider = ({ children }) => {
  const mailReducer = (state, action) => {
    switch (action.type) {
      case "unreadMails":
        return { ...state, unread: !state.unread };
      case "starredMails":
        return { ...state, isStarred: !state.isStarred };
      case "starMail":
        return {
          ...state,
          mailData: state.mailData.map((mail) =>
            mail.mId === action.payload
              ? { ...mail, isStarred: !mail.isStarred }
              : mail
          )
        };
      case "markAsRead":
        return {
          ...state,
          mailData: state.mailData.map((mail) =>
            mail.mId === action.payload
              ? { ...mail, unread: !mail.unread }
              : mail
          )
        };
      case "deleteMail":
        return {
          ...state,
          mailData: state.mailData.filter(
            (mail) => mail.mId !== action.payload
          ),
          deleteMails: [
            ...state.deletedMails,
            state.mailData.find((mail) => mail.mId === action.payload)
          ]
        };
      case "spamMail":
        const mailToSpam = state.mailData.find(
          (mail) => mail.mId === action.payload
        );
        return {
          ...state,
          mailData: state.mailData.filter(
            (mail) => mail.mId !== action.payload
          ),
          spam: [...state.spam, mailToSpam]
        };
      default:
        return state;
    }
  };
  const intialState = {
    mailData: mails,
    unread: false,
    isStarred: false,
    spam: [],
    deletedMails: []
  };
  const [state, dispatch] = useReducer(mailReducer, intialState);
  let filteredMails = state.mailData;
  if (state.unread) {
    filteredMails = filteredMails.filter(({ unread }) => unread);
  }
  if (state.isStarred) {
    filteredMails = filteredMails.filter(({ isStarred }) => isStarred);
  }
  const unreadMails = () => {
    dispatch({ type: "unreadMails" });
  };
  const starredMails = () => {
    dispatch({ type: "starredMails" });
  };
  const toggleStarMail = (id) => {
    dispatch({ type: "starMail", payload: id });
  };
  const toggleReadMail = (id) => {
    dispatch({ type: "markAsRead", payload: id });
  };
  const deleteMail = (id) => {
    dispatch({ type: "deleteMail", payload: id });
  };
  const spamMail = (id) => {
    dispatch({ type: "spamMail", payload: id });
  };
  const mailContext = {
    ...state,
    starredMails,
    unreadMails,
    toggleStarMail,
    toggleReadMail,
    deleteMail,
    spamMail,
    filteredMails
  };
  return (
    <MailContext.Provider value={mailContext}>{children}</MailContext.Provider>
  );
};

export default MailProvider;
