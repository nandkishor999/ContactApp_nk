import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import WorldMap from '../Components/WordlMap';
import { MapContainer, TileLayer } from 'react-leaflet';
import {
  LineElement,
  Tooltip,
  Title,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Legend
} from 'chart.js';
ChartJS.register(
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,

);
const Charts = () => {
  const [data, setData] = useState([]);
  const [chart, setChart] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await axios.get('https://disease.sh/v3/covid-19/countries');
      setData(res.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const res = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const { cases } = res.data;
      setChart({
        labels: Object.keys(cases),
        datasets: [
          {
            label: 'Cases',
            data: Object.values(cases),
            borderColor: '#f50057',
            tension: 0.2,
            fill: false,
          },
        ],
      });
    };
    fetchHistoricalData();
  }, []);

  return (
    <div className="w-full pt-20 px-4 pb-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">Charts of all cases</h1>
      <div className="border-2 border-red-100 w-11/12 m-auto">
        {chart.datasets ? (
          <div className="chart-container">
            <Line data={chart} />
          </div>
        ) : (
          <h1 className="text-pink-600 mb-4 font-bold text-2xl">Loading Data</h1>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-4 text-blue-500">Corona Cases World Map</h1>
      <div className="border-2 border-blue-500 w-11/12 m-auto">
        <MapContainer
          className="map-container"
          bounds={[[-60, -180], [85, 180]]}
          zoom={2}
          center={[20, 40]}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
          <WorldMap countriesData={data} />
        </MapContainer>
      </div>
    </div>
  );
};

export default Charts;
