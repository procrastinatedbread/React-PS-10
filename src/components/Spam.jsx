import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";

const Spam = () => {
  const { spam } = useContext(MailContext);
  return (
    <>
      <h1>Spam</h1>
      <div className="card">
        {spam.map((spamMail) => (
          <div>
            <h1>{spamMail.subject}</h1>
            <p>{spamMail.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Spam;
