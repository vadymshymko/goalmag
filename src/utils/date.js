export const monthsFullNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthsShortNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getMonthFullNameByIndex = (index = 0) => {
  if (
    (!index && parseInt(index, 10) !== 0)
    || parseInt(index, 10) > 11
  ) {
    return null;
  }

  return monthsFullNames[parseInt(index, 10)];
};

export const getMonthShortNameByIndex = (index = 0) => {
  if (
    (!index && parseInt(index, 10) !== 0)
    || parseInt(index, 10) > 11
  ) {
    return null;
  }

  return monthsShortNames[parseInt(index, 10)];
};

export const getTimestampByDatetime = datetime => (
  new Date(datetime).getTime()
);

export const getFormattedDatetimeByDatetime = (datetime = '') => {
  if (!datetime) {
    return null;
  }

  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = getMonthShortNameByIndex(date.getMonth());

  const dayNumber = date.getDate();
  const dayNumberToShow = dayNumber < 10
    ? `0${dayNumber}`
    : dayNumber;

  const hours = date.getHours();
  const hoursToShow = hours < 10
    ? `0${hours}`
    : hours;

  const minutes = date.getMinutes();
  const minutesToShow = minutes < 10
    ? `0${minutes}`
    : minutes;

  return `${year}-${month}-${dayNumberToShow} ${hoursToShow}:${minutesToShow}`;
};
