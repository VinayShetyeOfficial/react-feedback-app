import PropTypes from "prop-types";

/**
 * Reusable card component for content containers.
 *
 * Props:
 * - children: node - Card content
 * - reverse: boolean - Reverse color scheme
 *
 * Features:
 * - Conditional styling based on reverse prop
 * - Consistent card layout and styling
 *
 * Default Props:
 * - reverse: false
 */
function Card({ children, reverse }) {
  return (
    // Conditional Styling
    <div
      className="card"
      style={{
        backgroundColor: reverse ? "rgba(0,0,0,.4)" : "rgba(255, 255, 255)",
        color: reverse ? "#fff" : "#000",
      }}
    >
      {children}
    </div>
  );
}

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
};

export default Card;
