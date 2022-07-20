/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import SEO from "./SEO";
import theme from "./theme";
import "../styles/global.scss";

const Layout = ({ children, width }) => (
  <ThemeProvider theme={theme}>
    <SEO />
    <Header />
    <Container width={width}>{children}</Container>
    <Footer />
  </ThemeProvider>
);

export default Layout;
