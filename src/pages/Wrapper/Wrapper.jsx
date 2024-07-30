import PropTypes from "prop-types";
import Tabbar from "../components/Tabbar/Tabbar";

function Wrapper({children}) {
  return (
    <div className="flex-1 w-full flex flex-col items-center px-20 bg-[#f0f2f5]">
      <Tabbar />
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

export default Wrapper;