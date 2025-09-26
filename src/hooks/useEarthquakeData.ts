import { useQuery } from '@tanstack/react-query';

export const useEarthquakeData = () => {
  return useQuery({
    queryKey: ['earthquakeData'],
    queryFn: () =>
      fetch(
        'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2025-09-01&endtime=2025-09-25'
      ).then((r) => r.json()),
  });
};
