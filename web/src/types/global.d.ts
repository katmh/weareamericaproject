declare module "*.css";
declare module "*.scss";
declare module "*.sass";

declare module "react-twitter-widgets";
declare module "react-svg-map";
declare module "@svg-maps/usa";

declare namespace React {
  interface Attributes {
    sx?: any;
  }

  interface HTMLAttributes<T> {
    sx?: any;
  }

  interface ImgHTMLAttributes<T> {
    sx?: any;
  }

  interface AudioHTMLAttributes<T> {
    sx?: any;
  }

  interface InputHTMLAttributes<T> {
    sx?: any;
  }
}
