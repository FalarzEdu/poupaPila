import Regular from "./Regular";
import WithLink from "./WithLink";

export interface CardDisplayProps {
  text: string;
  value: number;
  iconDirection: "left" | "right";
  icon?: any;
  iconColour?: string;
  iconSize?: number;
}

interface CardDisplayComponent extends React.FC<CardDisplayProps> {
  WithLink: typeof WithLink;
}

const CardDisplay: CardDisplayComponent = Regular as CardDisplayComponent;
CardDisplay.WithLink = WithLink;

export default CardDisplay;
