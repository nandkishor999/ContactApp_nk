import React from 'react';
import leaflet from 'leaflet';
import markerIcon from '../img/marker_icon.png';
import { Marker, Popup } from 'react-leaflet';

export default function WorldMap({ countriesData }) {
  const icon = leaflet.icon({
    iconUrl: markerIcon,
    iconSize: [20, 25],
    iconAnchor: [15, 30],
  });

  return (
    <>
      {countriesData?.map((item) => (
        <Marker
          icon={icon}
          key={item.countryInfo._id}
          position={[item.countryInfo.lat, item.countryInfo.long]}
        >
          <Popup>
            <div>
              <h2>{item.country}</h2>
              <p>
                Active Cases: {item.active} <br />
                Recovered Cases: {item.recovered} <br />
                Deaths: {item.deaths}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
