import { useEffect, useState } from "react";

export const useItemsPerGroup = () => {
  const getItemsPerGroup = () => {
    const width = window.innerWidth;
    if (width < 768) return 4;
    return 8;
  };

  const [itemsPerGroup, setItemsPerGroup] = useState(getItemsPerGroup);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerGroup(getItemsPerGroup());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerGroup;
};
