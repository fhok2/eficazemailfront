// components/EmailList.js
import React from 'react';

const EmailList = ({ emails }) => (
  <div>
    <h2>Seus E-mails</h2>
    <ul>
      {emails.map((email, index) => (
        <li key={index}>{email}</li>
      ))}
    </ul>
  </div>
);

export default EmailList;
