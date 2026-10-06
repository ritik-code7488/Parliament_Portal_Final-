import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./CommitteeDetails.css";
import API_BASE_URL from "../api";

function CommitteeDetails() {
  const [searchParams] = useSearchParams();
  const committeeId = searchParams.get("committee");

  const [committee, setCommittee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `${API_BASE_URL}/api/committees/committees/${committeeId}/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Committee details could not be loaded.");
        }

        return response.json();
      })
      .then((data) => {
        setCommittee(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load committee details.");
        setLoading(false);
      });
  }, [committeeId]);

  if (loading) {
    return (
      <div className="committee-details-page">
        <div className="committee-loading">
          Loading committee details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="committee-details-page">
        <div className="committee-error">
          {error}
        </div>
      </div>
    );
  }

  if (!committee) {
    return (
      <div className="committee-details-page">
        <div className="committee-error">
          Committee not found.
        </div>
      </div>
    );
  }

  return (
    <div className="committee-details-page">

      <div className="committee-details-header">
        <div>
          <span className="committee-label">
            PARLIAMENTARY COMMITTEE
          </span>

          <h1>{committee.name}</h1>

          <p>
            Detailed information about the parliamentary committee.
          </p>
        </div>

        <Link to="/committees" className="back-button">
          ← Back to Committees
        </Link>
      </div>

      <div className="committee-info-grid">

        <div className="committee-info-card">
          <span>Chairperson</span>
          <strong>{committee.chairperson}</strong>
        </div>

        <div className="committee-info-card">
          <span>Department</span>
          <strong>{committee.department}</strong>
        </div>

        <div className="committee-info-card">
          <span>House</span>
          <strong>{committee.house}</strong>
        </div>

        <div className="committee-info-card">
          <span>Member Count</span>
          <strong>{committee.member_count}</strong>
        </div>

        <div className="committee-info-card">
          <span>Established Date</span>
          <strong>{committee.established_date}</strong>
        </div>

        <div className="committee-info-card">
          <span>Status</span>
          <strong className="status-active">
            {committee.status}
          </strong>
        </div>

      </div>

      <div className="committee-description-card">

        <h2>About the Committee</h2>

        <p>
          {committee.description || "No description available."}
        </p>

      </div>

      <div className="committee-members-section">

        <div className="section-heading">
          <div>
            <span>COMMITTEE MEMBERS</span>
            <h2>Members of the Committee</h2>
          </div>

          <div className="member-count-badge">
            {committee.members?.length || 0} Members
          </div>
        </div>

        {committee.members && committee.members.length > 0 ? (
          <div className="committee-members-grid">

            {committee.members.map((member) => (
              <div
                className="committee-member-card"
                key={member.id}
              >

                <div className="member-avatar">
                  {member.name
                    ? member.name.charAt(0).toUpperCase()
                    : "M"}
                </div>

                <div className="member-content">

                  <h3>{member.name}</h3>

                  <p className="member-id">
                    {member.member_id}
                  </p>

                  <div className="member-details">

                    <div>
                      <span>House</span>
                      <strong>{member.house}</strong>
                    </div>

                    <div>
                      <span>State</span>
                      <strong>{member.state}</strong>
                    </div>

                    <div>
                      <span>Constituency</span>
                      <strong>{member.constituency}</strong>
                    </div>

                    <div>
                      <span>Party</span>
                      <strong>{member.party}</strong>
                    </div>

                  </div>

                  <span className="member-status">
                    {member.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        ) : (
          <div className="no-members">
            No members are currently assigned to this committee.
          </div>
        )}

      </div>

    </div>
  );
}

export default CommitteeDetails;