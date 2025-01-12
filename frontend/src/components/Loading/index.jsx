import { Spin } from "antd";
import "./style.css"

function Loading() {
  return (
    <div className="loader-overlay">
      <Spin />
    </div>
  );
}

export default Loading;
