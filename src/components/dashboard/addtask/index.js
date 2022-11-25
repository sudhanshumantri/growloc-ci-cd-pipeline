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
import { addTask } from "../../../config";
import dayjs from "dayjs";
export default function AddTaskModal({
  open,
  handleSave,
  handleClose,
  usersList,
}) {
  const [taskData, setTaskData] = useState({
    category: "",
    taskName: "",
    desCription: "",
    assignTask: "",
  });
  const [value, setValue] = React.useState(dayjs("2018-01-01T00:00:00.000Z"));
  const [endTime, setEndTime] = React.useState(
    dayjs("2018-01-01T00:00:00.000Z")
  );
  const [date, setDate] = React.useState(dayjs());
  const handleChange = (e) => {
    const { value, name } = e.target;
    setTaskData({ ...taskData, [name]: value });
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
  const handleTaskSave = () => {
    let payload = {
      category: taskData.category,
      taskName: taskData.taskName,
      desCription: taskData.desCription,
      assignTask: taskData.assignTask,
    };
    handleSave(payload);
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
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Category</span>
              <FormControl fullWidth>
                <SingleCustomSelect
                  name="category"
                  value={taskData.category}
                  isWhite={true}
                  options={addTask}
                  handleChange={handleChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <span className="input-label">Task Name</span>
              <FormControl fullWidth>
                <TextBox
                  isWhite={true}
                  name="taskName"
                  value={taskData.taskName}
                  onChange={handleChange}
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
                  name="desCription"
                  value={taskData.desCription}
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
                  name="assignTask"
                  isWhite={true}
                  value={taskData.assignTask}
                  options={getOptions()}
                  handleChange={handleChange}
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
