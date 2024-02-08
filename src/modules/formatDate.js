// DateFormatUtils.js
import { format } from "date-fns";
import { sk } from "date-fns/locale";

const formatDate = (date, dateFormat = "PP") => {
  return date && format(new Date(date), dateFormat, { locale: sk });
};

const formatYear = (date) => {
  return date && format(new Date(date), "yyyy");
};

const formatTime = (date) => {
  return date && format(new Date(date), "HH:mm:ss");
};

const formatFullDate = (date) => {
  return (
    date && format(new Date(date), "do MMMM yyyy, H:mm:ss", { locale: sk })
  );
};

const formatCustom = (date, formatString) => {
  return date && format(new Date(date), formatString, { locale: sk });
};

export { formatDate, formatYear, formatTime, formatCustom, formatFullDate };
