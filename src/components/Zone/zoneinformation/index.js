import React from "react";

const ZoneInformation = ({farmZoneList}) => {
    const { name, farmArea, systemType, zoneType } = farmZoneList;
        return (
          <>
            {name && farmArea && systemType && zoneType && (
              <div>
                <p className="section-title">
                  Zone Name : <span>{name}</span>
                </p>
                <p className="section-title">
                  Farm Area:
                  <span>{farmArea}</span>
                </p>
                <p className="section-title">
                  System Type :<span>{systemType}</span>
                </p>
                <p className="section-title">
                  Zone Type :<span>{zoneType}</span>
                </p>
              </div>
            )}
          </>
    );
  };

  export default ZoneInformation;
