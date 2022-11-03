import { useParams } from "react-router-dom";
// import { formatTime, TweetContext } from "./TweetContext";
import TweetAction from "./TweetActions";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Error from "./Error";

const TweetDetails = () => {
  let history = useHistory();

  const [tweetInfo, setTweetInfo] = useState({});
  const [status, setStatus] = useState("loading");
  const [numLikes, setNumLikes] = useState(0);
  const [error, setError] = useState(false);

  let { tweetId } = useParams();

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tweet }) => {
        setStatus("loaded");
        setTweetInfo(tweet);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  const handleProfileClick = (e) => {
    // Goes to profile of tweeter when clicked
    history.push(`/${tweetInfo.author.handle}`);
  };

  return (
    <>
      {error === true ? (
        <Error />
      ) : (
        <div>
          {status !== "loaded" ? (
            <Loading />
          ) : (
            <TweetStyled>
              <div>
                <div className="tweetInfo">
                  <img
                    className="avatar"
                    src={tweetInfo.author.avatarSrc}
                    alt="avatar"
                  />
                  <div>
                    <div onClick={handleProfileClick}>
                      <div className="displayName">
                        {" "}
                        {tweetInfo.author.displayName}
                      </div>
                      @{tweetInfo.author.handle}
                    </div>
                  </div>
                </div>
                <div className="tweetText">{tweetInfo.status}</div>
                <div className="imgDiv">
                  {/* If tweet contains an image, show it */}
                  {tweetInfo.media.length > 0 && (
                    <img
                      className="tweetImg"
                      src={tweetInfo.media[0].url}
                      alt="A Cat"
                    />
                  )}
                </div>
                <div className="actions">
                  <TweetAction numLikes={numLikes} setNumLikes={setNumLikes} />
                </div>
                <div className="dateTime">
                  {format(
                    new Date(tweetInfo.timestamp),
                    "p' ‧ 'LLL' 'd' 'yyyy"
                  )}{" "}
                  ‧ Critter web app
                </div>
              </div>
            </TweetStyled>
          )}
        </div>
      )}
    </>
  );
};

const TweetStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  border: 3px solid hsl(0, 0%, 97%);
  padding: 10px;

  .avatar,
  .imgDiv {
    padding: 10px;
  }

  .tweetInfo {
    display: flex;
    align-items: center;

    .avatar {
      width: 60px;
      border-radius: 100px;
    }
  }

  .tweetText {
    padding-left: 10px;
    font-size: 1.5em;
  }

  .displayName {
    font-weight: 600;
  }

  .tweetImg {
    border-radius: 20px;
    width: 100%;
  }

  .actions {
    padding: 0px 80px 10px 10px;
  }

  .dateTime {
    color: grey;
    padding: 0 10px 10px 10px;
  }
`;
export default TweetDetails;
