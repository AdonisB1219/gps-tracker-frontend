import { StyledContainer } from "./styles";
import { ContainerProps } from "../../utils/types";

const Container = ({ border, children }: ContainerProps) => (
  <StyledContainer border={border}>{children}</StyledContainer>
);

export default Container;
