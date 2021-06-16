/** @jsx jsx */
import { jsx } from "theme-ui"
import TwitterIcon from "./icons/twitter"

const tweetText = title =>
  `Listen to “${title}” — a powerful @WeAreAmericaPr1 story of American identity`

const ShareBtns = ({ title }) => {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://weareamericaproject.com"

  return (
    <div>
      <p
        sx={{
          fontFamily: "body",
          mr: 1,
          mb: 2,
        }}
      >
        Share this story:
      </p>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          tweetText(title)
        )}&url=${encodeURIComponent(url)}`}
      >
        <TwitterIcon width="3rem" />
      </a>
    </div>
  )
}

export default ShareBtns
