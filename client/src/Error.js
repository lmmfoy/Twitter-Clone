import { GiCat } from "react-icons/gi";
import { COLORS } from "./constants";
import styled from "styled-components";

const Error = () => {
  return (
    <StyledErrorPage>
      <GiCat className="cat" />
      <div className="error-text">
        <h1>An error has occured.</h1>
        <p>Guess the cat gods took a dislike to you.</p>
        <p>Try refreshing the page maybe?</p>
      </div>
    </StyledErrorPage>
  );
};

export default Error;

const StyledErrorPage = styled.div`
  display: flex;
  gap: 30px;
  margin: 70px auto;
  height: 150px;

  .cat {
    color: ${COLORS.primary};
    font-size: 10em;
    text-align: center;
  }

  h1 {
    font-size: 1.5em;
  }
  .error-text {
    font-size: 1.3em;
    text-align: center;
    align-self: center;
    font-weight: 600;
  }
`;
