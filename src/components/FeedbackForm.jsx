import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import { motion } from "framer-motion";

/**
 * Form component for submitting and editing feedback.
 *
 * Features:
 * - Rating selection (1-10)
 * - Text input with validation
 * - Auto-resizing textarea
 * - Submit/Edit functionality
 *
 * State:
 * - text: string - Feedback text content
 * - rating: number - Selected rating value
 * - btnDisabled: boolean - Submit button state
 * - message: string - Validation message
 *
 * Context Used:
 * - FeedbackContext for CRUD operations
 */
function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  // Effect hook to handle editing mode
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  // Handle text input changes and validation
  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);

    // Validate minimum text length
    if (value.trim().length >= 10) {
      setBtnDisabled(false);
      setMessage(null);
    } else {
      setBtnDisabled(true);
      setMessage(
        value.trim().length === 0 ? null : "Text must be at least 10 characters"
      );
    }

    // Dynamic textarea height adjustment
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    // Toggle multiline class based on content height
    const isMultiline = e.target.scrollHeight > 40;
    e.target.parentElement.classList.toggle("multiline", isMultiline);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check
    if (text.trim().length < 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
      return;
    }

    // Prepare feedback object
    const newFeedback = {
      text,
      rating,
    };

    // Update or add feedback based on edit mode
    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }

    // Reset form state
    setText("");
    setBtnDisabled(true);
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Card>
        <form onSubmit={handleSubmit}>
          <h2>How would you rate your service with us?</h2>
          <RatingSelect select={(rating) => setRating(rating)} />
          <div className="input-group">
            <textarea
              onChange={handleTextChange}
              placeholder="Write a review..."
              value={text}
              rows="3"
            />
            <Button type="submit" isDisabled={btnDisabled}>
              Send
            </Button>
          </div>
          {message && <div className="message">{message}</div>}
        </form>
      </Card>
    </motion.div>
  );
}

export default FeedbackForm;
