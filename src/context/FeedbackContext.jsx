import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

/**
 * Context provider for managing feedback state across the application.
 *
 * Features:
 * - Manages feedback data with localStorage persistence
 * - Provides CRUD operations for feedback items
 * - Handles feedback edit state
 *
 * Context Values:
 * - feedback: array - Collection of feedback items
 * - feedbackEdit: object - Current feedback item being edited
 * - addFeedback: function(newFeedback) - Adds new feedback
 * - deleteFeedback: function(id) - Removes feedback by id
 * - updateFeedback: function(id, updItem) - Updates existing feedback
 * - editFeedback: function(item) - Sets feedback item for editing
 */
export const FeedbackProvider = ({ children }) => {
  // Initialize state with localStorage data or default
  const [feedback, setFeedback] = useState(() => {
    try {
      const savedFeedback = localStorage.getItem("feedback");
      return savedFeedback
        ? JSON.parse(savedFeedback)
        : FeedbackData.slice(0, 3);
    } catch (error) {
      console.error("Error loading feedback from localStorage:", error);
      return FeedbackData.slice(0, 3);
    }
  });

  // State for tracking feedback being edited
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // Persist feedback to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem("feedback", JSON.stringify(feedback));
    } catch (error) {
      console.error("Error saving feedback to localStorage:", error);
    }
  }, [feedback]);

  // Add new feedback with unique ID
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback with confirmation
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Update existing feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    // Reset edit mode
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        updateFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
