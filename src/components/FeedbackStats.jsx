import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";
import { motion } from "framer-motion";

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  // Calculate Ratings Average
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[.,]0$/, "");

  return (
    <div className="feedback-stats">
      <motion.h4
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {feedback.length} Reviews
      </motion.h4>
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
