import { FiMessageCircle } from "react-icons/fi";
import { FiRepeat } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiShare } from "react-icons/fi";

import styled from "styled-components";
import { COLORS } from "./constants";

const TweetAction = ({ numLikes, setNumLikes }) => {
  const likeTweet = (e) => {
    e.target.classList.contains("clicked-heart")
      ? setNumLikes(numLikes - 1) // If has classname, click is an 'unlike'
      : setNumLikes(numLikes + 1); // If doesn't, click is a 'like'
    e.target.classList.toggle("clicked-heart");
  };

  return (
    <StyledDiv>
      <div className="icon-background">
        <FiMessageCircle />
      </div>
      <div className="icon-background">
        <FiRepeat />
      </div>
      <div className="icon-background">
        <FiHeart className="heart" onClick={likeTweet} />
        {/* If likes more than 0, show them */}
        {numLikes > 0 && <p className="num-likes">{numLikes}</p>}
      </div>
      <div className="icon-background">
        <FiShare />
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  color: grey;

  .icon-background {
    padding: 5px;
  }
  .icon-background:hover {
    background-color: ${COLORS.highlightBackground};
    border-radius: 100px;
  }
  .clicked-heart {
    color: pink;
  }
  .num-likes {
    font-size: 0.9em;
    position: absolute;
    right: 150px;
    top: -11px;
  }
`;
export default TweetAction;
