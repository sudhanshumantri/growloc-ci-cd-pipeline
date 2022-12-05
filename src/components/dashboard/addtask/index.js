import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material/";
import TextBox from "../../shared/text-box";
import CustomButton from "../../shared/button";
import SingleCustomSelect from "../../shared/select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addTask} from "../../../config";
import dayjs from "dayjs";
export default function AddTaskModal({
  open,
  handleSave,
  handleClose,
  usersList,
  FarmInventoryList,

}) {
  const [taskData, setTaskData] = useState({
    category: "",
    taskname: "",
    description: "",
    assigntask: "",
    inventory:"",
    units:"",
  });

  const [value, setValue] = React.useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [unitErrorMessage, setUnitErrorMessage] = useState("");
  const [endTime, setEndTime] = React.useState(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [date, setDate] = React.useState(dayjs());
  const [validation, setValidation] = useState({
    category: false,
    taskname: false,
    description: false,
    assigntask: false,
    units: false,
    unitErrorMessage:false,

    
  });
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setUnitErrorMessage(false)
    validation[name] && setValidation({ ...validation, [name]: false });
  };
  
  const validateTask = () => {
    let errors = {...validation};
    let isValid = true;
    if (!taskData.category) {
      errors.category = true;
      isValid = false;
    }
    if (!taskData.taskname) {
      errors.taskname = true;
      isValid = false;
    }
    if(!taskData.units) {
      errors.units =true;
      isValid = false;
    } else {
      const targetUnits = FarmInventoryList.find(
        (k) => k.id == taskData.inventory
      ) || {};
          if (parseInt(taskData.units) > parseInt(targetUnits.qty)) {
            errors.units =true;
            setUnitErrorMessage("Unit can't be greater than " + targetUnits.qty);
            isValid = false;
          }
        }
    setValidation(errors);
    return isValid;
  };


  const getOptions = useCallback(() => {
    const options = [];
    if (usersList.length) {
      usersList.forEach((list) => {
        if (list?.user?.profile?.name) {
          const { userId, name } = list.user.profile;
          options.push({ label: name, value: userId });
        }
      });
    }
    return options;
  }, [usersList]);

  const getInventoryOptions = useCallback(() => {
    const options = [];
    if (FarmInventoryList.length) {
      FarmInventoryList.forEach((inventory) => {
        if (inventory?.name) {
          const { id, name } = inventory;
          options.push({ label: name, value: id});
        }
      });
    }
    return options;
  }, [FarmInventoryList]);

  const handleTaskSave = () => {
    let payload = {
      category: taskData.category,
      taskName: taskData.taskname,
      description: taskData.description,
      assignTask: taskData.assigntask,
      inventory:taskData.inventory,
      qty:parseInt(taskData.units),
    };
    if(validateTask()) {
      handleSave(payload);
    }
    }
  const renderActionButton = () => {
    return (
      <>
        <div className="flex-row-justify-center-container">
          <DialogActions>
            <CustomButton
              isLight={true}
              handleButtonClick={handleClose}
              title="Cancel"
            />
            <CustomButton title="Save" handleButtonClick={handleTaskSave} />
          </DialogActions>
        </div>
      </>
    );
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-title-container">
          Add a new Task
        </DialogTitle>
        <DialogContent sx={{ paddingTop: "10px" }}>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Category</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  name="category"
                  value={taskData.category}
                  isWhite={true}
                  options={addTask}
                  handleChange={handleChange}
                  isError={validation.category}
                  errorMessage="Please select a category"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Task Name</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="taskname"
                  value={taskData.taskname}
                  onChange={handleChange}
                  error={validation.taskname}
                  helperText={validation.taskname ? "Please provide name" : ""}
    
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">When is it due ?</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DatePicker
                    disableFuture
                    views={["day", "year"]}
                    inputFormat="MMMM DD"
                    disableMaskedInput={true}
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextBox {...params} isWhite={true} />
                    )}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Start Time</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DesktopTimePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextBox {...params} isWhite={true} />
                    )}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">End Time</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl fullWidth>
                  <DesktopTimePicker
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                    renderInput={(params) => (
                      <TextBox {...params} isWhite={true} />
                    )}
                  />
                </FormControl>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">Description</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="description"
                  value={taskData.description}
                  onChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">
                Who would you want the task to be assigned to?
              </span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  labelKey="label"
                  valueKey="value"
                  name="assigntask"
                  isWhite={true}
                  value={taskData.assigntask}
                  options={getOptions()}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Add inventory</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  name="inventory"
                  labelKey="label"
                  valueKey="value"
                  value={taskData.inventory}
                  isWhite={true}
                  options={getInventoryOptions()}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Units</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="units"
                  value={taskData.units}
                  onChange={handleChange}
                  error={validation.units}
                  helperText={validation.units ? unitErrorMessage : ""}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        {renderActionButton()}
      </Dialog>
    </>
  );
}
