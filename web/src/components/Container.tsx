/** @jsx jsx */
import { jsx } from "theme-ui"

type ContainerProps = {
  children: React.ReactNode
  width?: "thin" | "medium" | "wide"
}

const Container = ({ children, width }: ContainerProps) => {
  const WIDTHS = {
    thin: 700,
    medium: 900,
    wide: 1100,
  }
  return (
    <section
      sx={{
        width: "90%",
        maxWidth: `${width ? WIDTHS[width] : WIDTHS.wide}px`,
        m: "0 auto",
      }}
    >
      {children}
    </section>
  )
}

export default Container
