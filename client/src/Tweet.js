import styled from "styled-components";
import { format } from "date-fns";
import TweetAction from "./TweetActions";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FiRepeat } from "react-icons/fi";
import Error from "./Error";

const Tweet = ({ id, time, status, author, media }) => {
  let history = useHistory();
  const [retweet, setRetweet] = useState(null);
  const [numLikes, setNumLikes] = useState(0);
  const [error, setError] = useState(false);

  const handleProfileClick = (e) => {
    // Goes to profile of tweeter when clicked
    history.push(`/${author.handle}`);
    e.stopPropagation(); // Prevents default behaviour of then running handleTweetClick
  };

  const handleTweetClick = () => {
    history.push(`/tweet/${id}`);
  };

  useEffect(() => {
    fetch(`/api/tweet/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        data.tweet.retweetFrom && setRetweet(data.tweet.retweetFrom.handle);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <>
      {error === true ? (
        <Error />
      ) : (
        <>
          {retweet && (
            <StyledRetweet>
              <FiRepeat /> {retweet} Remeowed
            </StyledRetweet>
          )}
          <TweetStyled onClick={handleTweetClick}>
            <div className="avatar">
              <img src={author.avatarSrc} alt="avatar" />
            </div>
            <div>
              <div className="tweetInfo">
                <span onClick={handleProfileClick}>
                  <span className="displayName">{author.displayName}</span> @
                  {author.handle}
                </span>{" "}
                ‧ {format(new Date(time), "LLL do")}
              </div>
              <div className="tweetText">{status}</div>
              <div className="imgDiv">
                {/* If tweet contains an image, show it */}
                {media.length > 0 && (
                  <img className="tweetImg" src={media[0].url} alt="A Cat" />
                )}
              </div>
            </div>
          </TweetStyled>
          <ActionsStyled>
            <TweetAction numLikes={numLikes} setNumLikes={setNumLikes} />
          </ActionsStyled>
        </>
      )}
    </>
  );
};

const StyledRetweet = styled.div`
  padding: 10px 5px 0px 50px;
  color: grey;
  font-size: 0.9em;
`;

const TweetStyled = styled.div`
  display: flex;
  width: 700px;

  .avatar,
  .tweetInfo,
  .imgDiv {
    padding: 10px;
  }
  .avatar {
    img {
      width: 60px;
      border-radius: 100px;
    }
  }

  .tweetText {
    padding: 0 20px 0 10px;
  }

  .displayName {
    font-weight: 600;
  }

  .tweetImg {
    border-radius: 20px;
    width: 100%;
  }
`;

const ActionsStyled = styled.div`
  padding: 0px 80px 10px 10px;
  border-bottom: 3px solid hsl(0, 0%, 97%);
  padding-left: 90px;
`;

export default Tweet;
