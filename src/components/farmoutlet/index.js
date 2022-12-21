import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { farmMenuItems, zoneMenuItems } from "../shared/sidebar/config";
import { useParams } from "react-router-dom";

const FarmOutlet = ({ isFromZone }) => {
  const { farmId, zoneId } = useParams();
  useEffect(() => {
    const formChildren = isFromZone ? zoneMenuItems : farmMenuItems;
    formChildren.forEach((items) => {
      if (items.subMenu) {
        items.subMenu.forEach((item) => {
          item.navigation = isFromZone
            ? "farm/" + farmId + "/zone/" + zoneId + item.link
            : "farm/" + farmId + item.link;
        });
      } else {
        items.navigation = isFromZone
          ? "farm/" + farmId + "/zone/" + zoneId + items.link
          : "farm/" + farmId + items.link;
      }
    });
  }, [isFromZone]);
  return <Outlet />;
};
export default FarmOutlet;
