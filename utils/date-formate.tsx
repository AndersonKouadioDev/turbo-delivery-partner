import dayjs from "dayjs";

export function formatDate(
  dateString: string | Date,
  format: string = "DD MMMM YYYY",
) {
  return dayjs(dateString).format(format);
}
