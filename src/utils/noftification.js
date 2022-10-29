import { Store } from "react-notifications-component";

export const addNotification = (error, duration = 1000, onScreen = true) => {
  Store.addNotification({
    title: error.message ? error.message : "Something went wrong",
    type: "danger",
    insert: "top",
    container: "bottom-center",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration,
      onScreen,
    },
  });
};
