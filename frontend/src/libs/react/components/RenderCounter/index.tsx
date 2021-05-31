import {useRef} from "react";

const SHOW_RENDER_COUNTERS = true;

export const RenderCounter = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  if (SHOW_RENDER_COUNTERS) {
    return (
      <div style={{backgroundColor: "red", padding: 5}}>{ renderCount.current }</div>
    )
  }
  return null;
};
