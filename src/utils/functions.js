const calculateElapsedSeconds = ({startAt, finishAt}) => {
  return Math.abs(finishAt - startAt);
};

export { calculateElapsedSeconds }