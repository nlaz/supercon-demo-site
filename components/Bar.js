import { useState, useRef, MouseEvent } from "react";
import cx from "clsx";

const Bar = (props) => {
  const progressBarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { variant = "default", currentTime, duration, setClickedTime } = props;
  const progress = duration ? (currentTime / duration) * 100 : 0;
  const width = `${progress}%`;

  const handleMouseDragStart = (event) => {
    setIsDragging(true);
    updateProgressByMouse(event);
  };

  const handleMouseDrag = (event) => {
    if (isDragging) {
      updateProgressByMouse(event);
    }
  };

  const handleMouseDragEnd = () => {
    setIsDragging(false);
  };

  const handleTouchDragStart = (event) => {
    setIsDragging(true);
    updateProgressByTouch(event);
  };

  const handleTouchMove = (event) => {
    if (isDragging) {
      updateProgressByTouch(event);
    }
  };

  const handleTouchDragEnd = () => {
    setIsDragging(false);
  };

  const updateProgressByMouse = (event) => {
    const target = event.target;
    const percent = event.nativeEvent.offsetX / target.offsetWidth;
    setClickedTime(duration * percent);
  };

  const updateProgressByTouch = (event) => {
    const target = progressBarRef.current;
    const clientX = event.nativeEvent.touches[0].clientX;
    const rect = target.getBoundingClientRect();
    const percent = (clientX - rect.left) / rect.width;
    setClickedTime(duration * Math.min(Math.max(percent, 0), 1));
  };

  return (
    <div
      ref={progressBarRef}
      className={cx("absolute overflow-hidden top-0 left-0 right-0 bottom-0 w-100 cursor-pointer", {
        "rounded-full": variant === "rounded",
        "rounded-lg": variant === "default",
      })}
      onMouseDown={handleMouseDragStart}
      onMouseMove={handleMouseDrag}
      onMouseUp={handleMouseDragEnd}
      onTouchStart={handleTouchDragStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchDragEnd}
    >
      <div
        className={cx("bg-white h-full mix-blend-difference pointer-events-none", {
          "rounded-full": variant === "rounded",
          "rounded-lg": variant === "default",
        })}
        style={{ width }}
      />
    </div>
  );
};

export default Bar;
