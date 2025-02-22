import PropTypes from "prop-types";

/**
 * Reusable button component.
 *
 * Props:
 * - children: node - Button content
 * - version: string - Button style variant
 * - type: string - HTML button type
 * - isDisabled: boolean - Disabled state
 *
 * Default Props:
 * - version: "primary"
 * - type: "button"
 * - isDisabled: false
 */
function Button({ children, version, type, isDisabled }) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Button;
