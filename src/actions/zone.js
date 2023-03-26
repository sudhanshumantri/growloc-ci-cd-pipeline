import {
    FETCH_ALL_FARM_ZONE_REQUEST,
    FETCH_ALL_FARM_ZONE_SUCCESS,
    FETCH_ALL_FARM_ZONE_FAILURE,
    FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST,
    FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS,
    FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS,
    FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE,
    ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST,
    ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS,
    ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS,
    ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE,
    FETCH_RECENT_ZONE_SENSOR_DATA_REQUEST,
    FETCH_RECENT_ZONE_SENSOR_DATA_SUCCESS,
    FETCH_RECENT_ZONE_SENSOR_DATA_FAILURE,
    FETCH_ZONE_DASHBOARD_ZONE_INFO_REQUEST,
    FETCH_FARM_DASHBOARD_ZONE_INFO_SUCCESS,
    FETCH_FARM_DASHBOARD_ZONE_INFO_FAILURE,
    FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_REQUEST,
    FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_SUCCESS,
    FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_FAILURE,
    FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_REQUEST,
    FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_SUCCESS,
    FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_FAILURE,
    FETCH_ZONE_DASHBOARD_ZONE_SENSOR_REQUEST,
    FETCH_ZONE_DASHBOARD_ZONE_SENSOR_SUCCESS,
    FETCH_ZONE_DASHBOARD_ZONE_SENSOR_FAILURE,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_REQUEST,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_SUCCESS,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_FAILURE,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_REQUEST,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_SUCCESS,
    FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_FAILURE,
    FETCH_ALL_ZONE_TASKS_REQUEST,
    FETCH_ALL_ZONE_TASKS_SUCCESS,
    FETCH_ALL_ZONE_TASKS_FAILURE,
    ADD_ZONE_TASK_COMMENT_REQUEST,
    ADD_ZONE_TASK_COMMENT_SUCCESS,
    ADD_ZONE_TASK_COMMENT_FAILURE,
  
 } from "./actionTypes";
  
  export function fetchFarmZoneRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_REQUEST,
      data
    };
  };
  export function fetchFarmZoneSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_FAILURE,
      error,
    };
  };
  //

  export function fetchFarmZoneDashboardRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_REQUEST,
      data
    };
  };
  export function fetchFarmZoneDashboardSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneDashboardFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_FAILURE,
      error,
    };
  };
  //
  export function fetchFarmZoneDashboardHarvestRequest(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_REQUEST,
      data
    };
  };
  export function fetchFarmZoneDashboardHarvestSuccess(data) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_SUCCESS,
      data,
    };
  };
  export function fetchFarmZoneDashboardHarvestFailure(error) {
    return {
      type: FETCH_ALL_FARM_ZONE_DASHBOARD_HARVEST_FAILURE,
      error,
    };
  };

  //

  export function addFarmDashboardZoneTaskRequest(data) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_REQUEST,
      data,
    };
  }
  export function addFarmDashboardZoneTaskSuccess(data) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_SUCCESS,
      data,
    };
  }
  export function addFarmDashboardZoneTaskFailure(error) {
    return {
      type: ADD_FARM_DASHBOARD_ZONE_TASK_FAILURE,
      error,
    };
  }
  
  //
  
  export function addFarmDashboardZoneTaskCommentRequest(data) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_REQUEST,
      data,
    };
  }
  export function addFarmDashboardZoneTaskCommentSuccess(data) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_SUCCESS,
      data,
    };
  }
  export function addFarmDashboardZoneTaskCommentFailure(error) {
    return {
      type: ADD_FARM_DASHOBARD_ZONE_TASKS_COMMENT_FAILURE,
      error,
    };
  }

  export function getRecentZoneSensorDataRequest(data) {
    
    return {
      type: FETCH_RECENT_ZONE_SENSOR_DATA_REQUEST,
      data,
    };
  }
  export function getRecentZoneSensorDataSuccess(data) {
   
    return {
      type: FETCH_RECENT_ZONE_SENSOR_DATA_SUCCESS,
      data,
    };
  }
  export function getRecentZoneSensorDataFailure(error) {
   
    return {
      type: FETCH_RECENT_ZONE_SENSOR_DATA_FAILURE,
      error,
    };
  }
//

export function fetchFarmDashboardZoneInfoRequest(data) {
  return {
    type: FETCH_ZONE_DASHBOARD_ZONE_INFO_REQUEST,
    data
  };
}
export function fetchFarmDashboardZoneInfoSuccess(data) {
  return {
    type: FETCH_FARM_DASHBOARD_ZONE_INFO_SUCCESS,
    data,
  };
}
export function fetchFarmDashboardZoneInfoFailure(error) {
  return {
    type: FETCH_FARM_DASHBOARD_ZONE_INFO_FAILURE,
    error,
  };
}


//
export function fetchZoneDashboardZoneCropScheduleRequest(data) {
  return {
    type: FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_REQUEST,
    data
  };
}
export function fetchZoneDashboardZoneCropScheduleSuccess(data) {
  return {
    type: FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_SUCCESS,
    data,
  };
}
export function fetchZoneDashboardZoneCropScheduleFailure(error) {
  return {
    type: FETCH_ZONE_DASHBOARD_CROP_SCHEDULES_FAILURE,
    error,
  };
}



export function fetchZoneDashboardZoneTaskScheduleRequest(data) {
  return {
    type: FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_REQUEST,
    data
  };
}
export function fetchZoneDashboardZoneTakScheduleSuccess(data) {
  return {
    type: FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_SUCCESS,
    data,
  };
}
export function fetchZoneDashboardZoneTaskScheduleFailure(error) {
  return {
    type: FETCH_ZONE_DASHBOARD_ZONE_TASK_SCHEDULES_FAILURE,
    error,
  };
}



    export function fetchZoneDashboardZoneSensorRequest(data) {
      return {
        type: FETCH_ZONE_DASHBOARD_ZONE_SENSOR_REQUEST,
        data
      };
    }
    export function fetchZoneDashboardZoneSensorSuccess(data) {
      return {
        type: FETCH_ZONE_DASHBOARD_ZONE_SENSOR_SUCCESS,
        data,
      };
    }
    export function fetchZoneDashboardZoneSensorFailure(error) {
      return {
        type: FETCH_ZONE_DASHBOARD_ZONE_SENSOR_FAILURE,
        error,
      };
    }
  // uti
  

  export function fetchZoneDashboardZoneUtilizationCropsRequest(data) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_REQUEST,
      data
    };
  }
  export function fetchZoneDashboardZoneUtilizationCropsSuccess(data) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_SUCCESS,
      data,
    };
  }
  export function fetchZoneDashboardZoneUtilizationCropsFailure(error) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_CROP_FAILURE,
      error,
    };
  }
  //
  export function fetchZoneDashboardZoneUtilizationStagesRequest(data) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_REQUEST,
      data
    };
  }
  export function fetchZoneDashboardZoneUtilizationStagesSuccess(data) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_SUCCESS,
      data,
    };
  }
  export function fetchZoneDashboardZoneUtilizationStagesFailure(error) {
    return {
      type: FETCH_ZONE_DASHBOARD_ZONE_UTILIZATION_STAGES_FAILURE,
      error,
    };
  }
// zone task
export function fetchZoneTaskRequest(data) {
  return {
    type: FETCH_ALL_ZONE_TASKS_REQUEST,
    data
  };
};
export function fetchZoneTaskSuccess(data) {
  return {
    type: FETCH_ALL_ZONE_TASKS_SUCCESS,
    data,
  };
};
export function fetchZoneTaskFailure(error) {
  return {
    type: FETCH_ALL_ZONE_TASKS_FAILURE,
    error,
  };
};


export function addZoneTaskCommentRequest(data) {
  return {
    type: ADD_ZONE_TASK_COMMENT_REQUEST,
    data,
  };
}
export function addZoneTaskCommentSuccess(data) {
  return {
    type: ADD_ZONE_TASK_COMMENT_SUCCESS,
    data,
  };
}
export function addZoneTaskCommentFailure(error) {
  return {
    type: ADD_ZONE_TASK_COMMENT_FAILURE,
    error,
  };
}




