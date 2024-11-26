import React, { useEffect } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { colors } from '@mui/material';

export function MaliciousGauge({ jsonData }) {
  
  const stats = jsonData?.data?.attributes?.last_analysis_stats || {};
  const malicious = stats.malicious || 0;
  const suspicious = stats.suspicious || 0;
  const timeout = stats.timeout || 0;
  const failure = stats.failure || 0;
  const typeunsupported = stats['type-unsupported'] || 0;
  const totalValue = malicious + suspicious;
  const maxValue = totalValue + timeout + failure + typeunsupported;

  useEffect(() => {

  }, [malicious, suspicious, totalValue, maxValue]);

  return (
    <div className="w-full h-full  bg-gray-800 relative flex items-center border border-gray-600 rounded-lg">
      <Gauge
        value={totalValue}
        max={maxValue} 
        startAngle={-110}
        endAngle={110}
        thickness={20} 
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            fill: '#f8f8ff',
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: '#52b202',
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
          [`& .${gaugeClasses.maxArc}`]: {
            fill: '#f8f8ff',
          },
        })}
        text={({ value }) => `${value} / ${maxValue}`}
        
     />
    </div>
  );
}
