import React, { useEffect } from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { getDetectionValue } from './script/ExtractFileData';
import { extractAllData } from '../utils';

export function MaliciousGauge({ jsonData }) {
  
  const totalValue = getDetectionValue(jsonData);
  const {lastAnalysisStats} = extractAllData(jsonData);
  const undetected = lastAnalysisStats.undetected;
  const harmless = lastAnalysisStats.harmless;
  const maxValue = totalValue + undetected + harmless;

  useEffect(() => {

  }, [totalValue, maxValue])

  return (
    <div className="w-[13rem] h-[12.5rem] p-2 bg-gray-800 relative flex items-center border border-gray-600 rounded-lg">
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
        className='m-auto w-auto'
      />
    </div>
  );
}
