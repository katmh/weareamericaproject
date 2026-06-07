import React from "react";
import Layout from "../components/Layout";
import { PortableText } from "@portabletext/react";

import BackToAll from "../components/BackToAll";

const ConversationGuide = ({ pageContext }) => {
  const { title, content } = pageContext;
  return (
    <Layout>
      <BackToAll name="guides" path="/resources" />
      <h1 className="heading large_heading">{title}</h1>
      <PortableText value={content} />
    </Layout>
  );
};

export default ConversationGuide;
