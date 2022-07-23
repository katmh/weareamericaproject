import React from "react";
import Layout from "../components/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <h1 className="heading large_heading">Contact Us</h1>
      <p>
        Would you like to learn more about the We Are America National Project?
        Are you a teacher interested in applying to be considered for the next
        cohort? Are you a teacher interested in buying the books for your
        classroom? Are you a member of the press interested in learning more
        about the project? We would love to hear from you!
      </p>
      <form action="https://formspree.io/f/xnqoojjv" method="POST">
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" />

        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />

        <label htmlFor="message">Message: </label>
        <textarea name="message" id="message"></textarea>

        <br />
        <button>Submit</button>
      </form>
    </Layout>
  );
};

export default ContactPage;
