import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import FeedbackItem from "./FeedbackItem";
import FeedbackContext from "../context/FeedbackContext";

/**
 * Component for displaying the list of feedback items.
 *
 * Features:
 * - Animated feedback items using Framer Motion
 * - Drag-to-reorder functionality
 * - Empty state handling
 * - Initial load animations
 *
 * Context Used:
 * - FeedbackContext for feedback data
 *
 * Dependencies:
 * - Framer Motion for animations
 */
function FeedbackList() {
  const { feedback, setFeedback } = useContext(FeedbackContext);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Set isFirstLoad to false after initial render
    setIsFirstLoad(false);
  }, []);

  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>;
  }

  return (
    <div className="feedback-list">
      <Reorder.Group axis="y" values={feedback} onReorder={setFeedback}>
        <AnimatePresence>
          {feedback.map((item, index) => (
            <Reorder.Item
              key={item.id}
              value={item}
              initial={isFirstLoad ? { y: 100, opacity: 0 } : false}
              animate={isFirstLoad ? { y: 0, opacity: 1 } : false}
              exit={isFirstLoad ? { y: -100, opacity: 0 } : false}
              transition={
                isFirstLoad ? { duration: 1, delay: index * 0.2 } : {}
              }
              whileDrag={{
                scale: 1.05,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.25)",
              }}
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <FeedbackItem key={item.id} item={item} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}

export default FeedbackList;
