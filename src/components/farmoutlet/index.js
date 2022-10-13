import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { menuItems } from "../shared/sidebar/config";
import { useParams } from 'react-router-dom';

const FarmOutlet = () => {
    const { farmId } = useParams();
  useEffect(() => {

    console.log(menuItems, "111");
    menuItems[1].subMenu.forEach((item) => {
      item.navigation = "farm/" + farmId + item.link;
    });
  }, []);
  return <Outlet />;
};
export default FarmOutlet;
