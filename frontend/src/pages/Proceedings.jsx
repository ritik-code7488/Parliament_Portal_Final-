import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Proceedings.css";

function Proceedings() {
  const [proceedings, setProceedings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [houseFilter, setHouseFilter] = useState("All Houses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/proceedings/proceedings/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Proceedings API request failed");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProceedings(data);
        } else {
          setProceedings([]);
        }
      })
      .catch((error) => {
        console.error("Proceedings API error:", error);
        setProceedings([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredProceedings = useMemo(() => {
    return proceedings.filter((proceeding) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        proceeding.title?.toLowerCase().includes(searchText) ||
        proceeding.proceeding_type?.toLowerCase().includes(searchText) ||
        proceeding.description?.toLowerCase().includes(searchText);

      const matchesHouse =
        houseFilter === "All Houses" ||
        proceeding.house === houseFilter;

      const matchesType =
        typeFilter === "All Types" ||
        proceeding.proceeding_type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        proceeding.status === statusFilter;

      return (
        matchesSearch &&
        matchesHouse &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    proceedings,
    search,
    houseFilter,
    typeFilter,
    statusFilter,
  ]);

  const totalProceedings = proceedings.length;

  const publishedProceedings = proceedings.filter(
    (proceeding) => proceeding.status === "Published"
  ).length;

  const lokSabhaProceedings = proceedings.filter(
    (proceeding) => proceeding.house === "Lok Sabha"
  ).length;

  const rajyaSabhaProceedings = proceedings.filter(
    (proceeding) => proceeding.house === "Rajya Sabha"
  ).length;

  return (
    <div className="proceedings-page">

      {/* HERO */}
      <section className="proceedings-hero">
        <div className="proceedings-hero-content">

          <div className="proceedings-eyebrow">
            <span></span>
            PARLIAMENTARY PROCEEDINGS
          </div>

          <h1>Proceedings</h1>

          <p>
            Explore parliamentary proceedings, sessions, records and
            official information from both Houses of Parliament.
          </p>

        </div>
      </section>

      {/* STATS */}
      <section className="proceedings-stats">

        <div className="proceeding-stat-card">
          <div className="proceeding-stat-icon">▤</div>

          <div>
            <span>Total Proceedings</span>
            <strong>{totalProceedings}</strong>
          </div>
        </div>

        <div className="proceeding-stat-card">
          <div className="proceeding-stat-icon">✓</div>

          <div>
            <span>Published</span>
            <strong>{publishedProceedings}</strong>
          </div>
        </div>

        <div className="proceeding-stat-card">
          <div className="proceeding-stat-icon">L</div>

          <div>
            <span>Lok Sabha</span>
            <strong>{lokSabhaProceedings}</strong>
          </div>
        </div>

        <div className="proceeding-stat-card">
          <div className="proceeding-stat-icon">R</div>

          <div>
            <span>Rajya Sabha</span>
            <strong>{rajyaSabhaProceedings}</strong>
          </div>
        </div>

      </section>

      {/* FILTER SECTION */}
      <section className="proceedings-filter-section">

        <div className="section-label">
          PARLIAMENTARY DATABASE
        </div>

        <div className="proceedings-filter-header">

          <div>
            <h2>Find a Proceeding</h2>
          </div>

          <div className="results-count">
            {filteredProceedings.length} results
          </div>

        </div>

        <div className="proceedings-filters">

          <div className="proceeding-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by title, type or description..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={houseFilter}
            onChange={(event) => setHouseFilter(event.target.value)}
          >
            <option>All Houses</option>
            <option>Lok Sabha</option>
            <option>Rajya Sabha</option>
          </select>

          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option>All Types</option>
            <option>Session</option>
            <option>Debate</option>
            <option>Discussion</option>
            <option>Other</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>

        </div>

      </section>

      {/* RECORDS */}
      <section className="proceedings-records">

        <div className="section-label">
          PARLIAMENTARY RECORDS
        </div>

        <h2>Proceedings Records</h2>

        {loading ? (
          <div className="proceedings-loading">
            Loading proceedings...
          </div>
        ) : filteredProceedings.length === 0 ? (
          <div className="proceedings-empty">
            <h3>No proceedings found</h3>

            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="proceedings-grid">

            {filteredProceedings.map((proceeding) => (
              <article
                className="proceeding-card"
                key={proceeding.id}
              >

                <div className="proceeding-card-top">

                  <strong>
                    #{proceeding.id}
                  </strong>

                  <span className="proceeding-house-badge">
                    {proceeding.house}
                  </span>

                </div>

                <div className="proceeding-card-body">

                  <div className="proceeding-badges">

                    <span className="proceeding-type">
                      {proceeding.proceeding_type}
                    </span>

                    <span className="proceeding-status">
                      {proceeding.status}
                    </span>

                  </div>

                  <h3>{proceeding.title}</h3>

                  <p className="proceeding-preview">
                    {proceeding.description}
                  </p>

                  <div className="proceeding-meta">

                    <div>
                      <span>House</span>
                      <strong>{proceeding.house}</strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{proceeding.proceeding_date}</strong>
                    </div>

                  </div>

                </div>

                <div className="proceeding-card-footer">

                  <Link
                    to={`/proceeding-details?proceeding=${proceeding.id}`}
                    className="proceeding-details-button"
                  >
                    View Details
                    <span>→</span>
                  </Link>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default Proceedings;