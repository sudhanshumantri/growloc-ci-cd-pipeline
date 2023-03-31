import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material/";
import { useParams } from "react-router-dom";
import TextBox from "../../shared/text-box";
import CustomButton from "../../shared/button";
import SingleCustomSelect from "../../shared/select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TASK_CATEGORY, SEVERITY_LEVEL } from "../../../config";
import moment from "moment";

export default function AddTaskModal({
  open,
  handleSave,
  handleClose,
  usersList,
  farmInventoryList,
  fetchFarmInventory,
  fetchUsers
}) {
  const { farmId } = useParams();

  const [taskData, setTaskData] = useState({
    category: null,
    taskName: null,
    description: null,
    createdFor: null,
    dueDate: moment(),
    startTime: null,
    endTime: null,
    itemName: "",
    qty: null,
    severity:1,
  });
  const [dueDate, setDueDate] = React.useState(moment());
  const [unitErrorMessage, setUnitErrorMessage] = useState("");
  const [validation, setValidation] = useState({
    category: false,
    taskName: false,
    createdFor: false,
    qty: false,
    severity: false,
    itemName:false,
    units:false
  });
  const cleanObject = (obj) => {
    Object.keys(obj).forEach(
      (k) => !obj[k] && obj[k] !== undefined && obj[k] != 0 && delete obj[k]
    );
    return obj;
  };

  useEffect(()=>{
    fetchFarmInventory(farmId);
         fetchUsers(farmId);
  },[])

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
    if (taskData.severity < 0) {
      errors.severity = true;
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
    if (!taskData.itemName) {
      errors.itemName = true;
      isValid = false;
    }
    if (taskData.itemName) {
      if (!taskData.qty) {
        errors.qty = true;
        isValid = false;
        setUnitErrorMessage("Unit can't be empty ");
      } else {
        const targetIdx = farmInventoryList.findIndex((item) => item.name == taskData.itemName);
        if (parseInt(taskData.qty) > parseInt(farmInventoryList[targetIdx].qty)) {
          errors.qty = true;
          setUnitErrorMessage("Unit can't be greater than " + farmInventoryList[targetIdx].qty);
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

  const getInventoryOptions = useCallback(() => {
    const options = [];
    if (farmInventoryList.length) {
      farmInventoryList.forEach((inventory) => {
        if (inventory?.name) {
          const { id, name } = inventory;
          options.push({ label: name, value: name});
        }
      });
    }
    return options;
  }, [farmInventoryList]);

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
              <span className="input-label">Category</span>
              <span className="label-light">*</span>
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
            <Grid item xs={12} sm={12} md={12}>
              <FormControl>
                <span className="input-label">Severity Level</span>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="severity"
                  value={taskData.severity}                 
                   onChange={({ target }) =>
                    handleChange({
                      target: {
                        value: parseInt(target.value),
                        name: "severity",
                      },
                    })
                  }
                  row
                >
                  {SEVERITY_LEVEL.map((o) => (
                    <FormControlLabel
                      key={o.name}
                      value={o.value}
                      control={<Radio />}
                      label={o.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className="input-label">Task Name</span>
              <span className="label-light">*</span>
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
              <span className="input-label">When is it due ?</span>
              <span className="label-light">*</span>
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
                      setTaskData({ ...taskData, dueDate: newValue });
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
              <span className="label-light">*</span>
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
                  labelKey="label"
                  valueKey="value"
                  value={taskData.itemName}
                  options={getInventoryOptions()}
                  isWhite={true}
                  handleChange={handleChange}
                  isError={validation.itemName}
                  errorMessage="Please select a invertory"
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
