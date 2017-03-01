import moment from 'moment';

export const URLREGEXP = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/

export const isUrl = text => URLREGEXP.test(text)


moment.locale('zh-cn')

export const timeAgo = date => {
  date = moment(date);
  return date.fromNow();
};

export const formatDate = date => {
  date = moment(date);
  return date.format('YYYY-MM-DD HH:mm');
};