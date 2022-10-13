import React, { useState } from "react";
import AddFarmModal from "../addfarm";
import FarmCard from "../card";
import PageHeader from "../shared/page-header";
import AutoGridNoWrap from "../card";
import { Link } from "react-router-dom";

export default function ManageFarm({
    fetchFarm,
    farmList,
    addFarm
    
  }) {
    const [open, setOpen] = useState(false);
    const handleModalToggle = (data) => {
      console.log(data, "data");
      setOpen(!open);
      if(data) {
        addFarm(data);
      }
    };
    let buttonArray = [
      {
        label: "Add New",
        handler: handleModalToggle,
      },
    ];
    React.useEffect(() => {
        fetchFarm();
        // addFarm()
      }, []);
    
    return (
      <div>
        <PageHeader title="Manage Farm" buttonArray={buttonArray} />
        <AddFarmModal
          open={open}
          handleClick={handleModalToggle}
        />
        <AutoGridNoWrap data ={farmList} />
      </div>
    );
  }
  