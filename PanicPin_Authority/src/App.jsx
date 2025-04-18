import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowUpRight, Bell, User } from "lucide-react";
import ExpandedReports from "./ExpandedReports";
import "./App.css"; // Import the CSS file

function App() {
  // Content variables for easier connection to the database
  const responsesThisMonth = 40;
  const averageResponseTime = "00:04:39";
  const falseAlertsToday = 40;
  const resolvedAlertsToday = 40;

  const liveAlerts = [
    {
      id: "001",
      distance: "2 km",
      time: "00:38:00 ago",
      status: "Pending",
      action: "Dispatch",
    },
    {
      id: "002",
      distance: "3 km",
      time: "00:38:00 ago",
      status: "Resolved",
      action: "See details",
    },
    {
      id: "003",
      distance: "500 m",
      time: "00:38:00 ago",
      status: "Ongoing",
      action: "Resolved",
    },
  ];

  const mostReportedLocations = [
    { location: "Barangay 700", reports: 4 },
    { location: "Barangay 700", reports: 2 },
    { location: "Barangay 700", reports: 1 },
  ];

  const LiveAlertsTable = () => {
    const navigate = useNavigate();

    const handleViewDetails = (alert) => {
      navigate(`/expanded-reports`, { state: { alert } });
    };

    return (
      <div className="live-alerts">
        <h2>Live Alerts Feed</h2>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Distance</th>
              <th>Alert time</th>
              <th>Status</th>
              <th>Respond</th>
            </tr>
          </thead>
          <tbody>
            {liveAlerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td>{alert.distance}</td>
                <td>{alert.time}</td>
                <td className={alert.status.toLowerCase()}>{alert.status}</td>
                <td>
                  <button
                    className={`button ${
                      alert.action === "Dispatch"
                        ? "button-dispatch"
                        : alert.action === "Resolved"
                        ? "button-resolved"
                        : "button-default"
                    }`}
                  >
                    {alert.action}
                  </button>
                  <button
                    className="button button-details"
                    onClick={() => handleViewDetails(alert)}
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <header className="header">
                <div>
                  <h1 className="title">Welcome, Police!</h1>
                  <p className="subtitle">
                    Today is Sunday, 18th of November 2022.
                  </p>
                </div>
              </header>

              <div className="stats">
                <div className="stat-card">
                  <div className="stat-text">
                    <h2>Responses for this month</h2>
                    <p>{responsesThisMonth}</p>
                  </div>
                  <div className="stat-change">
                    <ArrowUpRight size={100} color="green" />
                    <span>+15.5s%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-text">
                    <h2>Average response time</h2>
                    <p>{averageResponseTime}</p>
                  </div>
                  <div className="stat-change">
                    <ArrowUpRight size={100} color="green" />
                    <span>+15.5s%</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-text">
                    <h2>False Alerts Today</h2>
                    <p>{falseAlertsToday}</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-text">
                    <h2>Resolved Alerts Today</h2>
                    <p>{resolvedAlertsToday}</p>
                  </div>
                </div>
              </div>

              <div className="tables">
                <LiveAlertsTable />
                <div className="most-reported">
                  <h2>Most reported locations (Monthly)</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>No. Reports</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mostReportedLocations.map((location, index) => (
                        <tr key={index}>
                          <td>{location.location}</td>
                          <td>{location.reports}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="map">
                <h2>Alerts Map</h2>
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
          }
        />
        <Route path="/expanded-reports" element={<ExpandedReports />} />
      </Routes>
    </Router>
  );
}

export default App;
