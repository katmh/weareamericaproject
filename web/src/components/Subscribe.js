/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"
import ButtonInput from "../components/ButtonInput"
import addToMailchimp from "gatsby-plugin-mailchimp"

const Subscribe = () => {
  const [email, setEmail] = useState({})

  const handleChange = (e) => {
    setEmail({
      [`${e.target.name}`]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addToMailchimp(email)
      .then(({ msg, result }) => {
        console.log("msg", `${result}: ${msg}`)

        if (result !== "success") {
          throw msg
        }
        alert(msg)
      })
      .catch((err) => {
        console.log("err", err)
        alert(err)
      })
  }

  return (
    <form
      sx={{
        display: "inline-block",
        mt: 2,
      }}
      onSubmit={handleSubmit}
    >
      <input
        sx={{
          variant: "body",
          padding: "7px 8px 6px",
          lineHeight: "1",
          fontSize: 1,
          mr: 2,
          display: "inline-block",
        }}
        type="email"
        onChange={handleChange}
        placeholder="name@email.com"
        name="email"
      />
      <ButtonInput type="submit" value="Submit" />
    </form>
  )
}

export default Subscribe
