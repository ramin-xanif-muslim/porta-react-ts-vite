// import useStore from "../store/useStore";

// const SelectBrandColor = () => {
//     const brandColor = useStore((state) => state.brandColor);
//     const setBrandColor = useStore((state) => state.setBrandColor);

//     const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const newColor = event.target.value;
//         setBrandColor(newColor);
//         document.documentElement.style.setProperty("--brand-color", newColor);
//     };

//     return (
//         <div>
//             <label htmlFor="colorPicker">Select a color:</label>
//             <input
//                 type="color"
//                 id="colorPicker"
//                 value={brandColor}
//                 onChange={handleColorChange}
//             />
//         </div>
//     );
// };

// export default SelectBrandColor;

import { ColorPicker } from "antd";
import useStore from "../store/useStore";

const BrandColorSelector = () => {
  const brandColor = useStore((state) => state.brandColor);
  const setBrandColor = useStore((state) => state.setBrandColor);

  const handleColorChange = (color: string | { toHexString: () => string }) => {
    const newColor = typeof color === "string" ? color : color.toHexString();
    document.documentElement.style.setProperty("--brand-color", newColor);
    setBrandColor(newColor);
  };

  return (
    <div>
      <ColorPicker
        value={brandColor}
        onChange={handleColorChange}
        format="hex"
        size="small"
        showText
      />
    </div>
  );
};

export default BrandColorSelector;
