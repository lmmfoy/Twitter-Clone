import { useContext, useEffect, useState } from "react";
import Tweet from "./Tweet";
import Loading from "./Loading";
import { CurrentUserContext } from "./CurrentUserContext";
import NewTweet from "./NewTweet";
import styled from "styled-components";
import Error from "./Error";

const HomeFeed = () => {
  const currentUserData = useContext(CurrentUserContext);

  const [tweetIds, setTweetIds] = useState([]);
  const [tweets, setTweets] = useState({});
  const [tweetStatus, setTweetStatus] = useState("loading");
  const [reloadNeeded, setReloadNeeded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setTweetIds(data.tweetIds);
        setTweets(data.tweetsById);
        setTweetStatus("loaded");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [reloadNeeded]);

  return (
    <>
      {error === true ? (
        <Error />
      ) : (
        <StyledHomeFeed>
          {currentUserData.status !== "idle" ? (
            <Loading />
          ) : (
            <NewTweet
              reloadNeeded={reloadNeeded}
              setReloadNeeded={setReloadNeeded}
            />
          )}
          <div>
            {tweetStatus !== "loaded" ? (
              <Loading />
            ) : (
              tweetIds.map((id) => {
                return (
                  <Tweet
                    id={id}
                    time={tweets[id].timestamp}
                    status={tweets[id].status}
                    author={tweets[id].author}
                    media={tweets[id].media}
                  />
                );
              })
            )}
          </div>
        </StyledHomeFeed>
      )}
    </>
  );
};

const StyledHomeFeed = styled.div`
  border: 3px solid hsl(0, 0%, 97%);
  width: 700px;
`;

export default HomeFeed;
