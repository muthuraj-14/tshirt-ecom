import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../config/config";
import state from "../store";
import { download, logoShirt, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import { ColorPicker, CustomButton, FilePicker, Tab } from "../components";


const Customizer = () => {

  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("colorpicker"); // Default tab
  const [selectedSize, setSelectedSize] = useState("M"); // Default size: Medium

  const generateTabContent = () => {
    if (!activeEditorTab) return null; // Return nothing if no tab is active

    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]; // Toggle the state
        break;
      case "stylishShirt":
        state.isStylishTexture = !activeFilterTab[tabName]; // Toggle the state
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
        break;
    }
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    alert(`Selected Size: ${size}`);
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    isActiveTab={activeEditorTab === tab.name} // Check if this tab is active
                    handleClick={() =>
                      setActiveEditorTab((prevTab) =>
                        prevTab === tab.name ? "" : tab.name
                      )
                    } // Toggle tab state
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* Size Selection Buttons */}
          <motion.div
            className="fixed bottom-16 left-5 z-10 flex flex-row space-x-4"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            {["S", "M", "L", "XL"].map((size) => (
              <CustomButton
                key={size}
                type={selectedSize === size ? "filled" : "outline"}
                title={size}
                handleClick={() => handleSizeSelect(size)}
                customStyles={`w-16 my-4 px-4 py-2.5 font-bold text-sm shadow-md transition-all ${
                  selectedSize === size
                    ? "bg-blue-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-transparent text-blue-500 border-blue-500 hover:bg-blue-100 hover:shadow-md"
                } rounded-lg mx-2`}
              />
            ))}
          </motion.div>

          {/* Buy Now Button */}
          <motion.div
            className="fixed bottom-5 left-5 z-10 w-fit flex justify-start"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80 }}
          >
            <CustomButton
              type="filled"
              title="Buy Now"
              customStyles="w-fit px-4 py-2.5 font-bold text-xl shadow-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
