export const padNum = (num) => (num <= 9 ? `0${num}` : `${num}`);

export const toDate = (date) => new Date(date);

export const getDateShort = (date) => {
  const months = padNum(toDate(date).getMonth() + 1);
  const days = padNum(toDate(date).getDate());
  const year = padNum(toDate(date).getFullYear()).slice(-2);
  return `${months}.${days}.${year}`;
};

export const getDefaultTitle = (track) =>
  track.device
    ? `${track.device?.slug} on ${getDateShort(track.createdAt)}`
    : `${track?.station?.name} on ${getDateShort(track.createdAt)}`;

export const getTrackTitle = (track) => track.title || getDefaultTitle(track);

export const getTrackDuration = (seconds) => {
  if (seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = Math.floor(seconds - hours * 3600 - minutes * 60);
    return `${padNum(hours)}:${padNum(minutes)}:${padNum(remainingSeconds)}`;
  }

  return "00:00:00";
};
