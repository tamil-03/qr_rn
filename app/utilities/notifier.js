import { ToastAndroid } from "react-native";
var i = 1;

const toastShort = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const toastLong = (message) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};

const log = (message) => console.log("LOG ", i++, ": ", message);

const debug = (message) => console.debug("DEBUG ", i++, ": ", message);

export default {
  toastShort,
  toastLong,
  log,
  debug,
};
