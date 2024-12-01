import React from 'react';
import { useSnapshot } from 'valtio';

import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  
  const colors = ["#28282B", "#9B0821", "#DCCCDF", "#E7D0AB","#FFFFFF",  "#1B1925", "#FBF18C", "#DEAFB1"];

  const handleColorChange = (color) => {
    state.color = color;
  };

  return (
    <div className="filepicker-container w-full h-full p-4 flex items-center justify-center bg-gray-50">
      <div className="flex flex-wrap justify-center gap-2 max-w-sm">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorChange(color)}
            style={{
              backgroundColor: color,
            }}
            className="w-12 h-12 rounded-full cursor-pointer transform hover:scale-110 transition-all"
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
