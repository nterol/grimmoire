import React, { useState, useEffect } from "react";

function ResponsiveView(heritedProps, ref) {
  const [width, setWidth] = useState(ref.clientWidth);

  useEffect(() => {
    window.addEventListener("resize", setWidth);
    return window.removeEventListener("resize", setWidth);
  }, []);

  const setWidth = () => {
    const currentWidth = ref.clientWidth;
    console.log(currentWidth);
  };

  return width;
}

export default ResponsiveView;
