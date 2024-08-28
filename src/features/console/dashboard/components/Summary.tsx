import { InputSwitch } from 'primereact/inputswitch';
import React, { useState } from 'react';
import { Chart } from 'primereact/chart';
import dayjs from 'dayjs';

const summaryData = [
  { title: 'TOTAL SUCCESSFUL CALLS', data: 0 },
  { title: 'TOTAL ERROR CALLS', data: 0 },
  { title: 'TOTAL API CALL CALLS', data: 0 },
  { title: 'SUCCESS % (LAST 24 H)', data: 0 },
];

const chartLabels = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.unshift(dayjs(new Date()).add(-i, 'day').format('MMMM D'));
  }
  return dates;
};

const Summary = () => {
  const [showChart, setShowChart] = useState(false);

  const basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: '#b3b3b3',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#b3b3b3',
        },
      },
      y: {
        ticks: {
          color: '#b3b3b3',
        },
        grid: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="summaryWrap">
      <div className="top">
        <span className="switchText">Chart</span>
        <InputSwitch
          checked={showChart}
          onChange={(e) => setShowChart(e.value)}
        />
      </div>
      <div className="boxWrap">
        {summaryData.map((v, i) => {
          return (
            <dl key={`${v.title}${i}`}>
              <dt>{v.title}</dt>
              <dd>
                {v.data}
                {i === 3 && <span style={{ marginLeft: 4 }}>%</span>}
              </dd>
            </dl>
          );
        })}
      </div>
      {showChart && (
        <div className="chartWrap">
          <h1>SERVER - CLIENT API CALLS</h1>
          <div className="chart">
            <Chart
              type={'line'}
              data={{
                labels: chartLabels(),
                datasets: [
                  {
                    label: 'TOTAL SUCCESSFUL CALLS',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#4ef500',
                    tension: 0.4,
                  },
                  {
                    label: 'TOTAL ERROR CALLS',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    borderColor: '#f53b00',
                    tension: 0.4,
                  },
                  {
                    label: 'TOTAL API CALL CALLS',
                    data: [93, 97, 91, 96, 98, 99, 92],
                    fill: true,
                    borderColor: '#fff',
                    tension: 0.4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                ],
              }}
              options={basicOptions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
