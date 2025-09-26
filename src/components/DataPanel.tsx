import React, { useState, useEffect, useRef } from 'react';
import { useEarthquakeData } from '../hooks/useEarthquakeData';

const PAGE_SIZE = 10;

const EarthquakeTable = () => {
  const { data, isLoading, error } = useEarthquakeData();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const containerRef = useRef<HTMLDivElement>(null);


  const flattenedData = data?.features.map((event: any) => ({
    id: event.id,
    ...event.properties,
    latitude: event.geometry.coordinates[1],
    longitude: event.geometry.coordinates[0],
  })) ?? [];

  const columns = flattenedData.length > 0 ? Object.keys(flattenedData[0]) : [];

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

    // If scrolled to bottom, load more
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      setVisibleCount((prev) =>
        Math.min(prev + PAGE_SIZE, flattenedData.length)
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm max-h-[600px]"
    >
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-medium text-gray-700 uppercase tracking-wider"
              >
                {col.replace(/_/g, ' ')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {flattenedData.slice(0, visibleCount).map((row: any) => (
            <tr
              key={row.id}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {columns.map((col) => (
                <td key={col} className="px-3 py-1 text-gray-800">
                  {col === 'time'
                    ? new Date(row[col]).toLocaleString()
                    : row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {visibleCount < flattenedData.length && (
        <div className="p-2 text-center text-gray-500">Loading more...</div>
      )}
    </div>
  );
};

export default EarthquakeTable;
