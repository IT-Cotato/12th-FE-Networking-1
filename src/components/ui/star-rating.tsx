import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

export default function StarRating({ value, onChange }: StarRatingProps) {
  const handleClick = (clickedStarIndex: number) => {
    const starNumber = clickedStarIndex + 1;
    const fullStarValue = starNumber * 2;
    const halfStarValue = fullStarValue - 1;

    if (value === fullStarValue) {
      onChange(halfStarValue);
    } else {
      onChange(fullStarValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span>별점 : </span>
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => {
          const starDisplayValue = value / 2;
          const starIndexNumber = i + 1;

          let starIcon = <FaRegStar />;
          if (starDisplayValue >= starIndexNumber) {
            starIcon = <FaStar />;
          } else if (starDisplayValue >= starIndexNumber - 0.5) {
            starIcon = <FaStarHalfAlt />;
          }
          return (
            <span
              key={i}
              className="cursor-pointer text-2xl text-yellow-400"
              onClick={() => handleClick(i)}
            >
              {starIcon}
            </span>
          );
        })}
      </div>

      <span className="font-bold text-lg w-10 text-center">{value}</span>
    </div>
  );
}
