import React from "react";
import "./index.css";

const Message = ({user, username, message}) => {
  const prefix = user.username !== username ? username + ": ": "";

  return (
    <li>
      <span className={`${user.username === username ? "left" : "right"}`}>
        {username}: {message}
      </span>
    </li>
  );
};

export default Message;
