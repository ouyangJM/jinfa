import PropTypes from "prop-types";
import Tabbar from "../components/Tabbar/Tabbar";

function Wrapper({children}) {
  return (
    <div className="flex-1 w-full flex flex-col items-center 1xl:px-20 px-5 bg-[#f0f2f5] pb-5">
      <Tabbar />
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node,
}

export default Wrapper;