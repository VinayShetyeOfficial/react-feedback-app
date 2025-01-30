import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { motion } from "framer-motion";

/**
 * Component for displaying feedback statistics.
 *
 * Features:
 * - Shows total number of reviews
 * - Calculates and displays average rating
 * - Animated statistics using Framer Motion
 *
 * Context Used:
 * - FeedbackContext for feedback data
 *
 * Calculations:
 * - Average rating with decimal handling
 */
function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  // Calculate average rating with decimal handling
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  // Format average to remove trailing zeros
  average = average.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      {/* Animated review count */}
      <motion.h4
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {feedback.length} Reviews
      </motion.h4>

      {/* Animated average rating display */}
      <motion.h4
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Average Rating: {isNaN(average) ? 0 : average}
      </motion.h4>
    </div>
  );
}

export default FeedbackStats;
