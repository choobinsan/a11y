type CarouselControlsProps = {
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
};

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}) => (
  <ul className="gallery-controls">
    <li>
      <button
        className="previous"
        aria-label="previous artwork"
        onClick={onPrev}
        disabled={disablePrev}
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <path d="M18,2 2,10 18,18" />
        </svg>
      </button>
    </li>
    <li>
      <button
        className="next"
        aria-label="next artwork"
        onClick={onNext}
        disabled={disableNext}
      >
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20">
          <path d="M2,2 18,10 2,18" />
        </svg>
      </button>
    </li>
  </ul>
);
