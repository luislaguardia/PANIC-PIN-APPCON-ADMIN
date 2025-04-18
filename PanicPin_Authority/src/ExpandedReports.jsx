import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ExpandedReports.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ExpandedReports() {
  const location = useLocation();
  const navigate = useNavigate();
  const alert = location.state?.alert;

  return (
    <div className="expanded-reports">
      <div className="sidebar">
        <button className="return-button" onClick={() => navigate("/")}>
          ⬅ Return
        </button>
        <h1 className="title">Report ID: {alert?.id || "N/A"}</h1>
        <p className="subtitle">Reported: {alert?.time || "N/A"}</p>
        <p className="subtitle">Distance: {alert?.distance || "N/A"}</p>
        <p className="subtitle">Status: {alert?.status || "N/A"}</p>
      </div>
      <div className="map-container">
        <div className="map">
          <MapContainer
            center={[14.554729, 121.024445]}
            zoom={13}
            className="map-placeholder"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ExpandedReports;
