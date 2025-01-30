import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import FeedbackContext from "../context/FeedbackContext";
import RatingSelect from "./RatingSelect";
import { motion } from "framer-motion";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);

    // Check text length and update button state
    if (value.trim().length >= 10) {
      setBtnDisabled(false);
      setMessage(null);
    } else {
      setBtnDisabled(true);
      setMessage(
        value.trim().length === 0 ? null : "Text must be at least 10 characters"
      );
    }

    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";

    // Check if content exceeds single line height (40px)
    const isMultiline = e.target.scrollHeight > 40;
    e.target.parentElement.classList.toggle("multiline", isMultiline);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 10) {
      setMessage("Text must be at least 10 characters");
      setBtnDisabled(true);
      return;
    }

    const newFeedback = {
      text,
      rating,
    };

    if (feedbackEdit.edit === true) {
      updateFeedback(feedbackEdit.item.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }

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
