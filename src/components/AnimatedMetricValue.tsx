"use client";

import CountUp from "react-countup";

interface AnimatedMetricValueProps {
  value: string;
}

const AnimatedMetricValue = ({ value }: AnimatedMetricValueProps) => {
  const numericValue = Number(value.replace(/,/g, ""));

  if (!Number.isFinite(numericValue)) {
    return <>{value}</>;
  }

  return (
    <CountUp
      start={0}
      end={numericValue}
      duration={1.4}
      separator=","
      preserveValue={false}
    />
  );
};

export default AnimatedMetricValue;
