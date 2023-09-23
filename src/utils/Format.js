import { formatDistance } from "date-fns";
import { enUS } from "date-fns/locale";

export const FormatDate = (dateString) => {
  if (dateString !== undefined) {
    const date = new Date(dateString);
    return formatDistance(new Date(), date, { addSuffix: true, locale: enUS });
  }
  return "미정";
};
