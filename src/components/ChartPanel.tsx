import React, { useState, useEffect, useRef } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEarthquakeData } from '../hooks/useEarthquakeData';

const PAGE_SIZE = 10;

const ChartPanel = () => {
  const { data, isLoading, error } = useEarthquakeData();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [xKey, setXKey] = useState<string>('mag'); // default x axis
  const [yKey, setYKey] = useState<string>('depth'); // default y axis

  const containerRef = useRef<HTMLDivElement>(null);

  const flattenedData =
    data?.features.map((event: any) => ({
      id: event.id,
      ...event.properties,
      latitude: event.geometry.coordinates[1],
      longitude: event.geometry.coordinates[0],
      depth: event.geometry.coordinates[2],
    })) ?? [];

  const columns =
    flattenedData.length > 0 ? Object.keys(flattenedData[0]) : [];

  // Filter numeric columns only for dropdown options
  const numericColumns = columns.filter((col) =>
    flattenedData.every(
      (row: any) =>
        typeof row[col] === 'number' &&
        !Number.isNaN(row[col]) &&
        row[col] !== null
    )
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [flattenedData.length]);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  // Scroll handler for lazy loading
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 10
    ) {
      setVisibleCount((prev) =>
        Math.min(prev + PAGE_SIZE, flattenedData.length)
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Chart Controls */}
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">
          X-Axis:
          <select
            value={xKey}
            onChange={(e) => setXKey(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            {numericColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-gray-700">
          Y-Axis:
          <select
            value={yKey}
            onChange={(e) => setYKey(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            {numericColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Scatter Plot */}
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey={xKey}
            name={xKey}
            label={{ value: xKey, position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            type="number"
            dataKey={yKey}
            name={yKey}
            label={{ value: yKey, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            name="Earthquakes"
            data={flattenedData.slice(0, visibleCount)}
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartPanel;
