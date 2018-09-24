import moment from 'moment';

export const getFormattedDate = (date = Date.now()) => {
  const isValid = moment(date).isValid();

  return moment(isValid ? date : Date.now()).format('YYYY-MM-DD');
};

export default getFormattedDate;
