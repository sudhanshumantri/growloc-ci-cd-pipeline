import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../shared/page-header";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/loader";
export default function ZoneDashboard({
  fetchFarmZone,
  farmZoneList,
  isFarmZoneLoading,
}) {
  const { farmId, zoneId } = useParams();
  const navigate = useNavigate();
  console.log(farmZoneList.name);
  React.useEffect(() => {
    fetchFarmZone(zoneId);
  }, []);
  const handleBackButton = () => {
    navigate("/");
  };
  let showBackButton = [
    {
      handler: handleBackButton,
    },
  ];
  return (
    <div>
      {isFarmZoneLoading && <Loader title=" Feching zone" />}

      <PageHeader
        title={farmZoneList?.name || ""}
        showBackButton={showBackButton}
      />
    </div>
  );
}
