import { useState } from "react";
import ClickAwayListener from "./ClickAwayListners";
import useColorPicker from "../hooks/useColorPicker";
import ColorPicker from "./ColorPicker/ColorPicker";

export default function TextColorPicker() {
  const { onFontColorSelect } = useColorPicker();
  const [textColor, setTextColor] = useState(false);
  const [color, setColor] = useState<string>("#000000");
  function handleColorChanage(color: string) {
    onFontColorSelect(color);
    setColor(color);

    console.log("setcolor", color);
  }
  console.log(color);

  return (
    <ClickAwayListener onClickAway={() => setTextColor(false)}>
      <button
        onClick={() => setTextColor(!textColor)}
        className={`toolbar-item spaced ${textColor && "active"}`}
        aria-label="Left Align"
      >
        <i className="format font-color" />
        <i className="format arrowDown" />
      </button>

      {textColor && (
        <ColorPicker
          color={color}
          onChange={(color) => handleColorChanage(color)}
        />
      )}
    </ClickAwayListener>
  );
}
