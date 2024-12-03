import React, { useEffect } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { colors } from '@mui/material';

export function MaliciousGauge({ jsonData }) {
  const stats = jsonData?.data?.attributes?.last_analysis_stats || {};
  const malicious = stats.malicious || 0;
  const suspicious = stats.suspicious || 0;
  const undetected = stats.undetected || 0;
  const harmless = stats.harmless || 0;
  const totalValue = malicious + suspicious;
  const maxValue = totalValue + undetected + harmless;

  useEffect(() => {
    // Any side effects if necessary
  }, [malicious, suspicious, totalValue, maxValue]);

  return (
    <div className="w-60 h-64 bg-gray-800 relative flex items-center border border-gray-600 rounded-lg">
      <Gauge
        value={totalValue}
        max={maxValue} 
        startAngle={-110}
        endAngle={110}
        thickness={20} 
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            fill: '#ffffff',  // Text color set to white
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
