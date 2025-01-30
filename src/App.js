import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import { FeedbackProvider } from "./context/FeedbackContext";

import "./index.css";

/**
 * Main App component that serves as the root of the application.
 * Handles routing and layout structure of the application.
 *
 * Components:
 * - Header: Displays the application header
 * - FeedbackForm: Form for submitting feedback
 * - FeedbackStats: Shows statistics about feedback
 * - FeedbackList: Displays list of feedback items
 * - AboutIconLink: Link to about page
 *
 * Routes:
 * - /: Home page with feedback functionality
 * - /about: About page
 * - *: Redirects to home page
 */
function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList />
                  <AboutIconLink />
                </>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
