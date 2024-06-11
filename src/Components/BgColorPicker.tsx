import React, { useCallback, useRef, useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import useColorPicker from "../hooks/useColorPicker";
import ClickAwayListener from "./ClickAwayListners";

export default function BgColorPicker() {
  const [iscolorBgPickerOpen, setisBgColorPickerOpen] = useState(false);
  const { onBgColorSelect } = useColorPicker();
  const [color, setColor] = useState<string>("#ffffff0");
  function handleColorChanage(color: string) {
    onBgColorSelect(color);
    setColor(color);

    console.log("setcolor", color);
  }

  return (
    <ClickAwayListener onClickAway={() => setisBgColorPickerOpen(false)}>
      <button
        onClick={() => setisBgColorPickerOpen(!iscolorBgPickerOpen)}
        className={`toolbar-item spaced ${iscolorBgPickerOpen && "active"}`}
        aria-label="Left Align"
      >
        <i className="format bg-color" />
        <i className="format arrowDown" />
      </button>

      {iscolorBgPickerOpen && (
        <ColorPicker
          color={color}
          onChange={(color: any) => handleColorChanage(color)}
        />
      )}
    </ClickAwayListener>
  );
}
