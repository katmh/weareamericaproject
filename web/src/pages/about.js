import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <h1 className="heading large_heading">About</h1>
      <p>
        We are eighteen students from Lowell High School, located in Lowell
        Massachusetts, working together with our teacher, Jessica Lander. 
        During the 2018-2019 school year, we learned together with Ms. Lander in
        a course called the <i>Seminar on American Diversity</i>. Over the
        course of a semester, we set out to together define what we thought it
        meant to be American. We analyzed key laws and Supreme Court cases,
        studied famous movements and changemakers who fought for social justice,
        and also looked at our own personal histories and worked to set them
        within the larger framework of American history.
      </p>
      <p>
        We wrote and edited two books of personal stories. Each of us shared a
        story of self that we thought helped to define and answer the question:
        What does it mean to be American? We published our stories in two{" "}
        <Link to="books">books</Link>, <i>We Are America</i> and{" "}
        <i>We Are America Too</i>, recorded our stories, and put them up on a
        website we created. We wanted this project to help start a local
        conversation on identity and belonging.
      </p>
      <p>
        We believe that this conversation is critical now and that we — young
        people who are the future of America — should have a role in defining
        what being American means to us. That is why we created the national
        project <i>We Are America Project</i>. Our goal is to help spark a new
        national conversation around what it means to be American, and we want
        that conversation to be led by our generation. We want to take what we
        started in our classroom in Lowell, Massachusetts and work to include
        the voices of more young people across our nation. We believe that we
        all have an important story to tell that needs to be heard.
      </p>
      <p>
        We are excited to be working with <Link to="/teachers">teachers</Link>{" "}
        across our country, who in turn are working with more than 1500
        students. We are now working with our second cohort of teachers and each
        class will be writing a book composed of the personal stories of
        identity of the students in their class, stories that together will give
        us a richer and deeper understanding of what it means to be American.
        And these stories will be recorded here on our website to listen and
        learn from!
      </p>
      <p>
        We are partnering with three leading national partners: Facing History
        and Ourselves, Re-Imagining Migration, and New York’s Tenement Museum.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <a href="https://www.tenement.org/">
          <img
            width="200"
            src="/tenement-museum.jpg"
            alt="Tenement Museum logo"
          />
        </a>

        <a href="https://reimaginingmigration.org/">
          <img
            width="200"
            src="/reimagining-migration.jpg"
            alt="Tenement Museum logo"
          />
        </a>

        <a href="https://www.facinghistory.org/">
          <img
            width="200"
            src="/facing-history.jpg"
            alt="Tenement Museum logo"
          />
        </a>

        <a href="https://glcfoundation.org">
          <img
            width="200"
            src="/glcf.jpg"
            alt="Greater Lowell Community Foundation logo"
          />
        </a>
      </div>
    </Layout>
  );
};

export default AboutPage;
