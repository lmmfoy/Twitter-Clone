import { COLORS } from "./constants";
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
  return <BallTriangle color={COLORS.primary} width="100%" height="80px" />;
};

export default Loading;
