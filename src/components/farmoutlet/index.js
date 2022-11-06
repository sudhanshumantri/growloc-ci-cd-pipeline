import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { farmMenuItems } from "../shared/sidebar/config";
import { useParams } from 'react-router-dom';

const FarmOutlet = () => {
  const { farmId } = useParams();
  useEffect(() => {
    //  const formChildren = farmMenuItems.filter((menu) => menu.isChildToFarmId);
    const formChildren = farmMenuItems;
    formChildren.forEach((items) => {
      if (items.subMenu) {
        items.subMenu.forEach((item) => {
          item.navigation = "farm/" + farmId + item.link;
        });
      } else {
        items.navigation = "farm/" + farmId + items.link;
      }
    });
  }, []);
  return <Outlet />;
};
export default FarmOutlet;
