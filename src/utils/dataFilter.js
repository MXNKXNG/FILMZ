import dayjs from "dayjs";

export const date = {
  upComing: {
    minDate: dayjs().startOf("day").format("YYYY-MM-DD"),
    maxDate: dayjs().add(3, "month").endOf("day").format("YYYY-MM-DD"),
  },
  nowPopular: {
    minDate: dayjs().subtract(4, "month").startOf("day").format("YYYY-MM-DD"),
    maxDate: dayjs().endOf("day").format("YYYY-MM-DD"),
  },
};
