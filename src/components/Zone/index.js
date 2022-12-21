import React from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../shared/page-header'

export default function ZoneDashboard({fetchFarmZone,farmZoneList}) {
 
  const { farmId, zoneId } = useParams();
  console.log(farmZoneList);
  React.useEffect(() => {
    fetchFarmZone(zoneId)
  }, []);

  return (
    <div>
        <PageHeader
        title="Zone Details"
      />
    </div>
  )
}
