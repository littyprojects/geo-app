//################################################################################
//  Filename: ChartPanel.tsx
//  Description: For displaying scatter chart for the data input.
//###############################################################################
import type React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export interface DataPoint {
  x: number;
  y: number;
  z: number;
}

interface ChartProps {
    data: DataPoint[]
}

const ChartPanel:React.FC<ChartProps> = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="stature" unit="cm" />
        <YAxis type="number" dataKey="y" name="weight" unit="kg" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default ChartPanel