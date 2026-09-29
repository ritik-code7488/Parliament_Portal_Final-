import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Questions.css";

const DEMO_QUESTIONS = [
  {
    id: 1,
    question_number: "Q-001",
    subject: "Digital Education Facilities",
    question_text:
      "What steps are being taken to improve digital education facilities?",
    asked_by: "Demo Member One",
    house: "Lok Sabha",
    question_type: "Starred",
    date: "01-09-2026",
    status: "Answered",
    answer:
      "The government is taking steps to improve digital education facilities through technology-enabled learning initiatives.",
  },
  {
    id: 2,
    question_number: "Q-002",
    subject: "Public Healthcare Services",
    question_text:
      "What measures are being taken to strengthen public healthcare services?",
    asked_by: "Demo Member Two",
    house: "Rajya Sabha",
    question_type: "Unstarred",
    date: "04-09-2026",
    status: "Pending",
    answer:
      "The question is currently under consideration.",
  },
  {
    id: 3,
    question_number: "Q-003",
    subject: "Employment and Skill Development",
    question_text:
      "What initiatives are planned to increase employment and skill development opportunities?",
    asked_by: "Demo Member Three",
    house: "Lok Sabha",
    question_type: "Starred",
    date: "06-09-2026",
    status: "Answered",
    answer:
      "Various skill development and employment initiatives are being implemented.",
  },
  {
    id: 4,
    question_number: "Q-004",
    subject: "Digital Infrastructure",
    question_text:
      "What steps are being taken to improve digital infrastructure across the country?",
    asked_by: "Demo Member Four",
    house: "Rajya Sabha",
    question_type: "Unstarred",
    date: "07-09-2026",
    status: "Pending",
    answer:
      "The matter is currently under consideration.",
  },
  {
    id: 5,
    question_number: "Q-005",
    subject: "Education Technology",
    question_text:
      "What measures are being taken to expand technology-based education?",
    asked_by: "Demo Member Five",
    house: "Lok Sabha",
    question_type: "Starred",
    date: "08-09-2026",
    status: "Answered",
    answer:
      "Technology-enabled education programs are being expanded.",
  },
  {
    id: 6,
    question_number: "Q-006",
    subject: "Rural Development",
    question_text:
      "What initiatives are being taken to support rural development?",
    asked_by: "Demo Member Six",
    house: "Rajya Sabha",
    question_type: "Unstarred",
    date: "09-09-2026",
    status: "Pending",
    answer:
      "The question is currently under consideration.",
  },
];

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [houseFilter, setHouseFilter] = useState("All Houses");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/questions/questions/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Questions API request failed");
        }

        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data);
        } else {
          setQuestions(DEMO_QUESTIONS);
        }
      })
      .catch((error) => {
        console.error("Questions API error:", error);
        setQuestions(DEMO_QUESTIONS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        question.question_number?.toLowerCase().includes(searchText) ||
        question.subject?.toLowerCase().includes(searchText) ||
        question.asked_by?.toLowerCase().includes(searchText);

      const matchesHouse =
        houseFilter === "All Houses" ||
        question.house === houseFilter;

      const matchesType =
        typeFilter === "All Types" ||
        question.question_type === typeFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        question.status === statusFilter;

      return (
        matchesSearch &&
        matchesHouse &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    questions,
    search,
    houseFilter,
    typeFilter,
    statusFilter,
  ]);

  const totalQuestions = questions.length;

  const answeredQuestions = questions.filter(
    (question) => question.status === "Answered"
  ).length;

  const pendingQuestions = questions.filter(
    (question) => question.status === "Pending"
  ).length;

  const starredQuestions = questions.filter(
    (question) => question.question_type === "Starred"
  ).length;

  return (
    <div className="questions-page">

      {/* HERO */}
      <section className="questions-hero">
        <div className="questions-hero-content">

          <div className="questions-eyebrow">
            <span></span>
            PARLIAMENTARY QUESTIONS
          </div>

          <h1>Questions</h1>

          <p>
            Explore questions raised by Members of Parliament,
            their subjects, status and responses across both Houses.
          </p>

        </div>
      </section>

      {/* STATS */}
      <section className="questions-stats">

        <div className="question-stat-card">
          <div className="question-stat-icon">▤</div>
          <div>
            <span>Total Questions</span>
            <strong>{totalQuestions}</strong>
          </div>
        </div>

        <div className="question-stat-card">
          <div className="question-stat-icon">✓</div>
          <div>
            <span>Answered</span>
            <strong>{answeredQuestions}</strong>
          </div>
        </div>

        <div className="question-stat-card">
          <div className="question-stat-icon">◉</div>
          <div>
            <span>Pending</span>
            <strong>{pendingQuestions}</strong>
          </div>
        </div>

        <div className="question-stat-card">
          <div className="question-stat-icon">★</div>
          <div>
            <span>Starred</span>
            <strong>{starredQuestions}</strong>
          </div>
        </div>

      </section>

      {/* FILTER SECTION */}
      <section className="questions-filter-section">

        <div className="section-label">
          PARLIAMENTARY DATABASE
        </div>

        <div className="questions-filter-header">

          <div>
            <h2>Find a Question</h2>
          </div>

          <div className="results-count">
            {filteredQuestions.length} results
          </div>

        </div>

        <div className="questions-filters">

          <div className="question-search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by question number, subject or member..."
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
            <option>Starred</option>
            <option>Unstarred</option>
          </select>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All Status</option>
            <option>Answered</option>
            <option>Pending</option>
          </select>

        </div>

      </section>

      {/* QUESTIONS */}
      <section className="questions-records">

        <div className="section-label">
          PARLIAMENTARY RECORDS
        </div>

        <h2>Questions Raised</h2>

        {loading ? (
          <div className="questions-loading">
            Loading questions...
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="questions-empty">
            <h3>No questions found</h3>
            <p>
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="questions-grid">

            {filteredQuestions.map((question) => (
              <article
                className="question-card"
                key={question.id}
              >

                <div className="question-card-top">

                  <strong>
                    {question.question_number}
                  </strong>

                  <span className="question-house-badge">
                    {question.house}
                  </span>

                </div>

                <div className="question-card-body">

                  <div className="question-badges">

                    <span
                      className={
                        question.question_type === "Starred"
                          ? "question-type starred"
                          : "question-type unstarred"
                      }
                    >
                      {question.question_type}
                    </span>

                    <span
                      className={
                        question.status === "Answered"
                          ? "question-status answered"
                          : "question-status pending"
                      }
                    >
                      {question.status}
                    </span>

                  </div>

                  <h3>{question.subject}</h3>

                  <p className="question-preview">
                    {question.question_text}
                  </p>

                  <div className="question-meta">

                    <div>
                      <span>Asked By</span>
                      <strong>{question.asked_by}</strong>
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{question.date}</strong>
                    </div>

                  </div>

                </div>

                <div className="question-card-footer">

                  <Link
                    to={`/question-details?question=${question.id}`}
                    className="question-details-button"
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

export default Questions;