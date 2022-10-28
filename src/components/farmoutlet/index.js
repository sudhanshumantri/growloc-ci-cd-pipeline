import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { menuItems } from "../shared/sidebar/config";
import { useParams } from 'react-router-dom';

const FarmOutlet = () => {
    const { farmId } = useParams();
  useEffect(() => {
    const formChildren = menuItems.filter((menu) => menu.isChildToFarmId);
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
