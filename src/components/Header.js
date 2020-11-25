/** @jsx jsx */
import { jsx } from "theme-ui"
import Nav from "./Nav"
import Container from "./Container"

const styles = {
  header: {
    width: "100%",
    fontFamily: "heading",
    py: 5,
    mb: [4, 5],
    backgroundImage: `url('/header.jpg')`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",

    color: "#eee",
  },
  a: {
    textDecoration: "none",
  },
  h1: {
    fontSize: 6,
    fontWeight: 700,
    color: "#eee",
    letterSpacing: "0px",
    display: "inline-block",
    textTransform: "uppercase",
  },
  h2: {
    fontSize: 3,
    fontFamily: "body",
    fontWeight: 400,
    fontStyle: "italic",
    mb: 4,
    letterSpacing: "-.25px",
  },
}

const Header = () => (
  <header sx={styles.header}>
    <Container width="medium">
      <a sx={styles.a} href="/">
        <h1 sx={styles.h1}>We Are America</h1>
      </a>
      <h2 sx={styles.h2}>Voices of the Nation's Future</h2>
      <Nav />
    </Container>
  </header>
)

export default Header
