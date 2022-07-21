import React, { useState } from "react";
import ButtonInput from "../components/ButtonInput";
import addToMailchimp from "gatsby-plugin-mailchimp";

const Subscribe = () => {
  const [email, setEmail] = useState({});

  const handleChange = e => {
    setEmail({
      [`${e.target.name}`]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    addToMailchimp(email)
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`);

        if (result !== "success") {
          throw msg;
        }
        alert(msg);
      })
      .catch(err => {
        console.log("err", err);
        alert(err);
      });
  };

  return (
    <form
      style={{
        marginTop: "1rem",
        display: "flex",
        width: "100%",
        maxWidth: "22.5rem",
        gap: "0.75rem"
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        onChange={handleChange}
        placeholder="name@email.com"
        name="email"
        style={{ width: "100%" }}
      />
      <ButtonInput type="submit" value="Submit" />
    </form>
  );
};

export default Subscribe;
