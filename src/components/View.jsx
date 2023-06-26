import { useContext } from "react";
import { useParams } from "react-router-dom";
import { MailContext } from "../contexts/MailContext";

const View = () => {
  const { mailId } = useParams();
  const { mailData } = useContext(MailContext);
  const findMail = mailData.find((mail) => mail.mId === +mailId);
  return (
    <>
      <h1>{findMail.subject}</h1>
      <p>{findMail.content}</p>
    </>
  );
};
export default View;
