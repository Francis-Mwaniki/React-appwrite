import  { useState, useEffect } from 'react';

const ClockTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const eatTime = new Date(time.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }));
  const hours = formatTime(eatTime.getHours());
  const minutes = formatTime(eatTime.getMinutes());
  const seconds = formatTime(eatTime.getSeconds());

  return (
    <div className="flex items-center justify-center  bg-gray-100 p-3 rounded">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">EAT</h1>
        <div className="flex justify-center">
          <div className="mx-2 text-6xl font-bold">
            <div>{hours}</div>
            <div className="text-sm font-normal">Hours</div>
          </div>
          <div className="mx-2 text-6xl font-bold">
            <div>:</div>
          </div>
          <div className="mx-2 text-6xl font-bold">
            <div>{minutes}</div>
            <div className="text-sm font-normal">Minutes</div>
          </div>
          <div className="mx-2 text-6xl font-bold">
            <div>:</div>
          </div>
          <div className="mx-2 text-6xl font-bold">
            <div>{seconds}</div>
            <div className="text-sm font-normal">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockTime;