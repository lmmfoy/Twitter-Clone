import { CurrentUserContext } from "./CurrentUserContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import Error from "./Error";

const characterLimit = document.querySelector(".characters");

const NewTweet = ({ setReloadNeeded }) => {
  const currentUserData = useContext(CurrentUserContext);
  const [inputText, setInputText] = useState("");
  const [remainingCharacters, setRemainingCharacters] = useState(280);
  const [error, setError] = useState(false);

  const submitTweet = (e) => {
    e.preventDefault();

    if (remainingCharacters > -1 && inputText !== "") {
      fetch("/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: inputText }),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setReloadNeeded(true); // Signal to homefeed useEffect that page needs to be reloaded
          setInputText(""); // Reset textarea
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });

      setReloadNeeded(false); // Reset reloadNeeded
      setRemainingCharacters(280); // Reset remainingCharacters
      characterLimit.style.color = "black"; // Reset remainingCharacters colour
    }
  };

  return (
    <>
      {error === true ? (
        <Error />
      ) : (
        <StyledNewTweet>
          <div className="first-row">
            <div>
              <img src={currentUserData.currentUserAvatar} alt="avatar" />
            </div>
            <textarea
              id="tweetBox"
              class="tweetBox"
              name="tweetBox"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setRemainingCharacters(280 - e.target.value.length);
                if (280 - e.target.value.length < 0) {// Using this rather than remainingCharacters to have more up-to-date number
                  characterLimit.style.color = "red";
                } else if (280 - e.target.value.length < 56) {
                  characterLimit.style.color = "yellow";
                } else {
                  characterLimit.style.color = "black";
                }
              }}
              placeholder="What's happening?"
              rows="5"
            ></textarea>
          </div>
          <div className="second-row">
            <p className="characters">{remainingCharacters}</p>
            <button onClick={submitTweet}>Meow</button>
          </div>
        </StyledNewTweet>
      )}
    </>
  );
};

export default NewTweet;

const StyledNewTweet = styled.form`
  width: 700px;
  display: flex;
  flex-direction: column;
  border-bottom: 10px solid hsl(0, 0%, 97%);

  .first-row {
    display: flex;

    img {
      width: 60px;
      border-radius: 100px;
      padding: 15px;
    }

    .tweetBox {
      box-sizing: border-box;
      width: 100%;
      border: none;
      font-size: 1.5em;
      margin: 0 70px 0 10px;
      resize: none;
      padding: 15px 0;
    }

    .tweetBox:focus {
      border: none;
      outline: none;
    }
  }

  .second-row {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 15px;

    button {
      padding: 10px 20px;
      border-radius: 25px;
    }
  }
`;
