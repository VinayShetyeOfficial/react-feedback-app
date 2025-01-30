import React from "react";
import PropTypes from "prop-types";

/**
 * Application header component.
 *
 * Props:
 * - text: string - Header text content
 * - bgColor: string - Background color
 * - textColor: string - Text color
 *
 * Default Props:
 * - text: "Feedback UI"
 * - bgColor: "rgba(0,0,0, 1)"
 * - textColor: "#ff6a95"
 */
function Header({ text, bgColor, textColor }) {
  const headerStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <header style={headerStyles}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0, 1)",
  textColor: "#ff6a95",
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
