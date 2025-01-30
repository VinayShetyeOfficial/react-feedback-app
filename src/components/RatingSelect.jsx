import { useState, useEffect } from "react";

/**
 * Component for selecting numerical ratings.
 *
 * Props:
 * - select: function(rating) - Callback for rating selection
 *
 * Features:
 * - 1-10 rating scale
 * - Radio button implementation
 * - Controlled component
 * - Default selection of 10
 *
 * State:
 * - selected: number - Currently selected rating
 */
function RatingSelect({ select }) {
  const [selected, setSelected] = useState(10);

  // Set default rating on mount
  useEffect(() => {
    setSelected(10);
  }, []);

  // Handle rating selection
  const handleChange = (e) => {
    // Convert string value to number with unary plus
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  return (
    <ul className="rating">
      {/* Generate rating options dynamically */}
      {Array.from({ length: 10 }, (_, i) => (
        <li key={`rating-${i + 1}`}>
          <input
            type="radio"
            id={`num${i + 1}`}
            name="rating"
            value={i + 1}
            onChange={handleChange}
            checked={selected === i + 1}
          />
          <label htmlFor={`num${i + 1}`}>{i + 1}</label>
        </li>
      ))}
    </ul>
  );
}

export default RatingSelect;
