import { createSelector } from "reselect";
const selectSensorData = (state)=> state.get("pusherData");

export const selectSensorDataPusher = () =>
  createSelector(selectSensorData, (services) => {
    console.log('selector========',services.toJS()["sensorData"])
    return services.toJS()["sensorData"]
  });
  