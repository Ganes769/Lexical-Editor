// import React, { useCallback } from "react";
// import PopupMenu from "../PopupMenu";
// import { $getSelection } from "lexical";
// import {
//   $getSelectionStyleValueForProperty,
//   $isParentElementRTL,
//   $patchStyleText,
//   $setBlocksType,
// } from "@lexical/selection";
// const FONT_FAMILY_OPTIONS: [string, string][] = [
//   ["Arial", "Arial"],
//   ["Courier New", "Courier New"],
//   ["Georgia", "Georgia"],
//   ["Times New Roman", "Times New Roman"],
//   ["Trebuchet MS", "Trebuchet MS"],
//   ["Verdana", "Verdana"],
// ];

// export default function FontPlugin() {
//   const handleClick = useCallback(
//     (option: string) => {
//       editor.update(() => {
//         const selection = $getSelection();
//         if (selection !== null) {
//           $patchStyleText(selection, {
//             [style]: option,
//           });
//         }
//       });
//     },
//     [editor, style]
//   );

//   return (
//     <div>
//       <PopupMenu className="">
//         <button className="toolbar-item ">
//           {FONT_FAMILY_OPTIONS.map(([option, text]) => (
//             <button
//               className="toolbar-item spaced"
//               onClick={() => handleClick(option)}
//               key={option}
//             >
//               <span className="text">{text}</span>
//             </button>
//           ))}
//         </button>
//       </PopupMenu>
//     </div>
//   );
// }
