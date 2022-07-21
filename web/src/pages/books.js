import React from "react";
import Book from "../components/Book";
import Container from "../components/Container";
import Gallery from "../components/Gallery";
import Layout from "../components/Layout";

const BooksPage = () => {
  return (
    <Layout>
      <h1 className="heading large_heading">Books</h1>
      <p>
        The National We Are America Project started in a classroom at Lowell
        High School in August 2018. Over the 2018-2019 school year we — students
        and one teacher — in the Seminar on American Diversity set out together
        to try to answer the question: <i>What does it mean to be American?</i>
      </p>
      <p>
        In the winter and spring of 2019, our classes wrote two books:{" "}
        <i>We Are America</i>, and the sequel, <i>We Are America Too</i>. We
        filled the pages with stories of our American histories. In sharing the
        book, we realized that to truly answer the question, we needed to widen
        the conversation. And that is where the national project took form.
      </p>
      <p>
        Here you can purchase the two books that started the project. We hope
        you find these stories powerful and we encourage you to listen to the
        whole library of stories on our website. Proceeds will fund the
        continued support of teachers and students participating in the We Are
        America Project nationally.
      </p>
      <p>
        If you are interested in the books being created by our collaborating
        teachers across the country, each of whom is publishing with their
        students their own book of stories this year, please feel free to reach
        out to them directly or to us and we can connect you.
      </p>
      <br />
      <Container width="thin">
        <Gallery n={2}>
          <Book
            title="We Are America"
            image="/assets/cover-waa.jpg"
            url="https://glcf.fcsuite.com/erp/donate/list/event?event_date_id=1660"
          />
          <Book
            title="We Are America Too"
            image="/assets/cover-waatoo.jpg"
            url="https://glcf.fcsuite.com/erp/donate/list/event?event_date_id=1660"
          />
        </Gallery>
      </Container>
    </Layout>
  );
};

export default BooksPage;
