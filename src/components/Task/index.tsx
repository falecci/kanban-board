import { ArrowButton } from "../ArrowButton";

import "./styles.css";

type Props = {
  isNextEnabled: boolean;
  isPreviousEnabled: boolean;
  onPreviousClick: () => void;
  onNextClick: () => void;
  description: string;
};

function Task({
  description,
  isNextEnabled,
  isPreviousEnabled,
  onNextClick,
  onPreviousClick,
}: Props) {
  return (
    <div className="task">
      <ArrowButton
        direction="prev"
        disabled={!isPreviousEnabled}
        onClick={onPreviousClick}
      />

      <p style={{ textAlign: "center" }}>{description}</p>

      <ArrowButton
        direction="next"
        disabled={!isNextEnabled}
        onClick={onNextClick}
      />
    </div>
  );
}

export { Task };
