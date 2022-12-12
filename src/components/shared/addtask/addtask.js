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
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TASK_CATEGORY } from "../../../config";
import moment from "moment";

export default function AddTaskModal({
  open,
  handleSave,
  handleClose,
  usersList,
  farmInventoryList,
}) {
  const [taskData, setTaskData] = useState({
    category: null,
    taskName: null,
    description: null,
    createdFor: null,
    dueDate: moment(),
    startTime: null,
    endTime: null,
    itemName: null,
    qty: null,
  });
  const [dueDate, setDueDate] = React.useState(moment());
  const [unitErrorMessage, setUnitErrorMessage] = useState("");
  // const [endTime, setEndTime] = React.useState(
  //   dayjs("2018-01-01T00:00:00.000Z")
  // );
  const [validation, setValidation] = useState({
    category: false,
    taskName: false,
    createdFor: false,
    qty: false,
    unitErrorMessage: false,
  });
  const cleanObject = (obj) => {
    Object.keys(obj).forEach(
      (k) => !obj[k] && obj[k] !== undefined && obj[k] != 0 && delete obj[k]
    );
    return obj;
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setUnitErrorMessage(false);
    validation[name] && setValidation({ ...validation, [name]: false });
  };
  const validateTask = () => {
    let errors = { ...validation };
    let isValid = true;
    if (!taskData.category) {
      errors.category = true;
      isValid = false;
    }
    if (!taskData.createdFor) {
      errors.createdFor = true;
      isValid = false;
    }
    if (!taskData.taskName) {
      errors.taskName = true;
      isValid = false;
    }
    if (taskData.itemName) {
      if (!taskData.qty) {
        errors.qty = true;
        isValid = false;
        setUnitErrorMessage("Unit can't be empty ");
      } else {
        const targetUnits =
          farmInventoryList.find((k) => k.id == taskData.inventory) || {};
        if (parseInt(taskData.qty) > parseInt(targetUnits.qty)) {
          errors.units = true;
          setUnitErrorMessage("Unit can't be greater than " + targetUnits.qty);
          isValid = false;
        }
      }
    }
    setValidation(errors);
    return isValid;
  };
  const getUserListOptions = useCallback(() => {
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

  const handleTaskSave = () => {
    if (validateTask()) {
      let requestObject = cleanObject(taskData);
      handleSave(requestObject);
    }
  };
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className="input-label">Category*</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  name="category"
                  value={taskData.category}
                  isWhite={true}
                  options={TASK_CATEGORY}
                  handleChange={handleChange}
                  isError={validation.category}
                  errorMessage="Please select a category"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className="input-label">Task Name*</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="taskName"
                  value={taskData.taskName}
                  onChange={handleChange}
                  error={validation.taskName}
                  helperText={validation.taskName ? "Please provide name" : ""}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <span className="input-label">When is it due ?*</span>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <FormControl fullWidth>
                  <DatePicker
                    disablePast
                    name="dueDate"
                    // views={["day", "year"]}
                    inputFormat="MMMM DD"
                    disableMaskedInput={true}
                    value={dueDate}
                    onChange={(newValue) => {
                      setDueDate(newValue);
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
                Who would you want the task to be assigned to? *
              </span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  isError={validation.createdFor}
                  errorMessage="Please select a user"
                  labelKey="label"
                  valueKey="value"
                  name="createdFor"
                  isWhite={true}
                  value={taskData.createdFor}
                  options={getUserListOptions()}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Add inventory</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  name="itemName"
                  labelKey="name"
                  valueKey="id"
                  value={taskData.itemName}
                  isWhite={true}
                  options={farmInventoryList}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Units</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="qty"
                  value={taskData.qty}
                  onChange={handleChange}
                  error={validation.qty}
                  helperText={validation.qty ? unitErrorMessage : ""}
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
