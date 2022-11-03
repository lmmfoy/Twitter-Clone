import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { format } from "date-fns";
import Error from "./Error";

import Loading from "./Loading";
import { FiMapPin } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";

import Tweet from "./Tweet";

const Profile = () => {
  let { profileId } = useParams();

  const [user, setUser] = useState({});
  const [status, setStatus] = useState("loading");
  const [profileTweets, setProfileTweets] = useState({});
  const [profileTweetIds, setProfileTweetIds] = useState([]);
  const [profileTweetsStatus, setProfileTweetsStatus] = useState("loading");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.profile);
        setStatus("loaded");
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/${user.handle}/feed`)
      .then((res) => res.json())
      .then(({ tweetsById, tweetIds }) => {
        setProfileTweets(tweetsById);
        setProfileTweetIds(tweetIds);
        setProfileTweetsStatus("loaded");
      })
      .catch((err) => console.log(err));
  }, [user]);

  return (
    <>
      {error === true ? (
        <Error />
      ) : (
        <StyledProfile>
          {status !== "loaded" ? (
            <Loading />
          ) : (
            <div>
              <StyledHeader>
                <img className="banner" src={user.bannerSrc} alt="banner" />
                <img className="avatar" src={user.avatarSrc} alt="avatar" />
                {user.isBeingFollowedByYou ? (
                  <button className="follow">Following</button>
                ) : (
                  <button className="follow">Follow</button>
                )}
                <h1>{user.displayName}</h1>
                <div className="handle-follow">
                  <h2 className="grey-text">@{user.handle}</h2>
                  {user.isFollowingYou && <span>Follows you</span>}
                </div>
                <p className="bio">{user.bio}</p>
                <p className="location-joined">
                  {user.location && (
                    <span className="location grey-text">
                      <FiMapPin /> {user.location}
                    </span>
                  )}
                  <span className="joined grey-text">
                    <FiCalendar /> Joined{" "}
                    {format(new Date(user.joined), "MMMM' 'yyyy")}
                  </span>
                </p>
                <p className="follows">
                  <span className="follow-numbers ">{user.numFollowing} </span>
                  <span className="grey-text">Following</span>
                  <span className="follow-numbers">{user.numFollowers} </span>
                  <span className="grey-text">Followers</span>
                </p>
              </StyledHeader>
              <StyledSectionBar>
                <button className="section-button">Tweets</button>
                <button className="section-button">Media</button>
                <button className="section-button">Likes</button>
              </StyledSectionBar>
              <div>
                {profileTweetsStatus !== "loaded" ? (
                  <Loading />
                ) : (
                  <div>
                    {profileTweetIds.map((id) => {
                      return (
                        <Tweet
                          time={profileTweets[id].timestamp}
                          status={profileTweets[id].status}
                          author={profileTweets[id].author}
                          media={profileTweets[id].media}
                          id={id}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </StyledProfile>
      )}
    </>
  );
};

const StyledProfile = styled.div`
  border: 3px solid hsl(0, 0%, 97%);
  width: 700px;
`;
const StyledHeader = styled.header`
  width: 700px;
  display: flex;
  flex-direction: column;

  .banner {
    width: 700px;
  }

  .avatar {
    width: 130px;
    border-radius: 100px;
    position: absolute;
    left: 310px;
    top: 170px;
    border: 3px solid white;
  }

  .follow {
    align-self: flex-end;
    width: 130px;
    margin: 20px 15px;
  }

  h1 {
    margin: 0px 20px;
    font-size: 1.2em;
  }

  .handle-follow {
    margin: 0px 20px;
    display: flex;
    align-items: center;

    h2 {
      margin: 0;
      font-size: 0.9em;
      font-weight: 100;
    }
    span {
      font-size: 0.8em;
      margin-left: 6px;
      background-color: ${COLORS.highlightBackground};
      border-radius: 3px;
      padding: 3px;
    }
  }

  .bio {
    margin: 20px 0px 0px 20px;
  }

  .location-joined {
    margin: 10px 20px;
    display: flex;
    gap: 15px;
  }

  .follows {
    margin: 0px;
  }

  .follow-numbers {
    margin-left: 20px;
    font-weight: 600;
  }
`;
const StyledSectionBar = styled.div`
  width: 700px;
  margin: 30px 0px 10px;
  display: flex;
  border-bottom: 3px solid hsl(0, 0%, 97%);

  .section-button {
    all: unset;
    width: 30%;
    text-align: center;
    font-weight: 600;
    padding: 15px;

    :hover {
      color: ${COLORS.primary};
      border-bottom: 2px solid ${COLORS.primary};
    }
  }
`;

export default Profile;
