import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";
import { Link } from "react-router-dom";

const Inbox = () => {
  const {
    filteredMails,
    unreadMails,
    starredMails,
    toggleStarMail,
    toggleReadMail,
    deleteMail,
    spamMail
  } = useContext(MailContext);

  const unRead = filteredMails.reduce(
    (acc, curr) => (curr.unread ? acc + 1 : acc),
    0
  );
  return (
    <div>
      <h1>Inbox</h1>
      <fieldset>
        <legend>Filter</legend>
        <input type="checkbox" onChange={() => unreadMails()} />
        Show unread
        <input type="checkbox" onChange={() => starredMails()} />
        show starred
      </fieldset>
      <h2>Unread Mails:{unRead}</h2>
      {filteredMails.map((mail) => {
        const { mId, subject, content, isStarred, unread } = mail;
        return (
          <div
            key={mId}
            className="card"
            style={{ backgroundColor: unread ? "rgb(236,240,248)" : "" }}
          >
            <div className="card-heading">
              <h5>
                Subject:{subject}
                <button
                  className="star"
                  onClick={() => toggleStarMail(mId)}
                  style={{ cursor: "pointer" }}
                >
                  {isStarred ? "unStar" : "Star"}
                </button>
              </h5>
              <p className="card-description">{content}</p>
              <Link className="details" to={`/view/${mId}`}>
                View Details
              </Link>

              <button
                style={{ cursor: "pointer" }}
                className="card-button-read"
                onClick={() => toggleReadMail(mId)}
              >
                {unread ? "mark as read" : "mark as unread"}
              </button>
              <button
                style={{ cursor: "pointer" }}
                className="card-button-spam"
                onClick={() => spamMail(mId)}
              >
                spam
              </button>
              <button
                style={{ cursor: "pointer" }}
                className="card-button-delete"
                onClick={() => deleteMail(mId)}
              >
                delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Inbox;
