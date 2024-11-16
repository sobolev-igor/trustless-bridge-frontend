import React from 'react';

export const useCurrentDate = (interval = 1000) => {
  const [date, setDate] = React.useState(
    parseInt((new Date().getTime() / 1000).toString(), 10)
  );
  React.useEffect(() => {
    const timer = setInterval(
      () => setDate(parseInt((new Date().getTime() / 1000).toString(), 10)),
      interval
    );

    return () => {
      clearInterval(timer);
    };
  }, [date, interval]);

  return date;
};
