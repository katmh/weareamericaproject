import React from "react";
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import ContactForm from "../components/ContactForm";
import Subscribe from "../components/Subscribe";

const ContactPage = () => {
  return (
    <Layout>
      <Heading>Contact Us</Heading>
      <p>
        Would you like to learn more about the We Are America National Project?
        Are you a teacher interested in applying to be considered for the next
        cohort? Are you a teacher interested in buying the books for your
        classroom? Are you a member of the press interested in learning more
        about the project? We would love to hear from you!
      </p>
      <ContactForm />
      <Heading>Newsletter</Heading>
      <p>
        Subscribe to our newsletter for updates on the We Are America Project.
      </p>
      <Subscribe />
    </Layout>
  );
};

export default ContactPage;
