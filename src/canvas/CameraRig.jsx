import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);
  // set the model rotation

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    let targetPosition = [-0.4 , 0 ,2];
    if(snap.intro){
        if(isBreakpoint) targetPosition = [0,0,2];
        if(isMobile) targetPosition = [0,0.2,2.5];

    }else{
        if(isMobile) targetPosition = [0,0,2.5];
        else targetPosition = [0,0,2];


    }
    easing.damp3(state.camera.position , targetPosition , 0.25 ,delta)
    easing.dampE(
      group.current.rotation, // Target rotation (group's rotation)
      [state.pointer.y / 10, -state.pointer.x / 5, 0], // Target values
      0.25, // Easing factor
      delta // Delta time
    );
  });
  return <group ref={group}>{children}</group>;
};

export default CameraRig;
