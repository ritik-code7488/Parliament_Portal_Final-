import { useEffect, useState } from "react";
import "./Attendance.css";
import API_BASE_URL from "../api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/attendance/attendance/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load attendance data");
        }
        return response.json();
      })
      .then((data) => {
        setAttendance(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch =
      record.member_name.toLowerCase().includes(search.toLowerCase()) ||
      record.member_id.toLowerCase().includes(search.toLowerCase()) ||
      record.house.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalRecords = attendance.length;
  const presentCount = attendance.filter(
    (record) => record.status === "Present"
  ).length;
  const absentCount = attendance.filter(
    (record) => record.status === "Absent"
  ).length;
  const leaveCount = attendance.filter(
    (record) => record.status === "Leave"
  ).length;

  if (loading) {
    return (
      <div className="attendance-page">
        <div className="attendance-loading">
          Loading attendance records...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="attendance-page">
        <div className="attendance-error">
          <h2>Unable to load attendance</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="attendance-page">
      <div className="attendance-header">
        <div>
          <span className="attendance-eyebrow">PARLIAMENT PORTAL</span>
          <h1>Attendance</h1>
          <p>
            View and monitor member attendance records.
          </p>
        </div>
      </div>

      <div className="attendance-summary">
        <div className="attendance-card">
          <div className="attendance-card-title">Total Records</div>
          <div className="attendance-card-number">{totalRecords}</div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-title">Present</div>
          <div className="attendance-card-number">{presentCount}</div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-title">Absent</div>
          <div className="attendance-card-number">{absentCount}</div>
        </div>

        <div className="attendance-card">
          <div className="attendance-card-title">Leave</div>
          <div className="attendance-card-number">{leaveCount}</div>
        </div>
      </div>

      <div className="attendance-toolbar">
        <input
          type="text"
          placeholder="Search member, ID or house..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Member ID</th>
              <th>Member Name</th>
              <th>House</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length > 0 ? (
              filteredAttendance.map((record) => (
                <tr key={record.id}>
                  <td>{record.member_id}</td>
                  <td className="member-name">
                    {record.member_name}
                  </td>
                  <td>{record.house}</td>
                  <td>{record.attendance_date}</td>
                  <td>
                    <span
                      className={`attendance-status ${record.status.toLowerCase()}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td>{record.remarks || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-attendance">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;