import PropTypes from "prop-types";

function Wrapper({children}) {
  return (
    <div>{children}</div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

export default Wrapper;