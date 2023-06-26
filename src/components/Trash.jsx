import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";

const Trash = () => {
  const { deletedMails } = useContext(MailContext);
  return (
    <>
      <h1>Spam</h1>
      <div className="card">
        {deletedMails.map((mail) => (
          <div>
            <h1>{mail.subject}</h1>
            <p>{mail.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Trash;
