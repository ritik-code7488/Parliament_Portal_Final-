import API_BASE_URL from "../api"
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./QuestionDetails.css";

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
    date: "2026-09-10",
    status: "Answered",
    answer:
      "The government is taking steps to improve digital education facilities through technology-enabled learning initiatives.",
  },
];

function QuestionDetails() {
  const [searchParams] = useSearchParams();

  const questionId = searchParams.get("question");

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questionId) {
      setQuestion(null);
      setLoading(false);
      return;
    }

    fetch(
      `${API_BASE_URL}/api/questions/questions/${questionId}/`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Question details API request failed");
        }

        return response.json();
      })
      .then((data) => {
        setQuestion(data);
      })
      .catch((error) => {
        console.error("Question Details API error:", error);

        const demoQuestion = DEMO_QUESTIONS.find(
          (item) => String(item.id) === String(questionId)
        );

        setQuestion(demoQuestion || null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [questionId]);

  if (loading) {
    return (
      <div className="question-details-loading">
        Loading question details...
      </div>
    );
  }

  if (!question) {
    return (
      <div className="question-details-not-found">
        <h2>Question not found</h2>

        <p>
          The requested parliamentary question could not be found.
        </p>

        <Link to="/questions">
          â† Back to Questions
        </Link>
      </div>
    );
  }

  const formattedDate = question.date
    ? new Date(question.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "Not Available";

  return (
    <div className="question-details-page">

      {/* HERO */}

      <section className="question-details-hero">

        <div className="question-details-hero-inner">

          <Link
            to="/questions"
            className="question-back-link"
          >
            â† Back to Questions
          </Link>

          <div className="question-details-eyebrow">
            PARLIAMENTARY QUESTION
          </div>

          <div className="question-details-title-row">

            <div>

              <div className="question-number">
                {question.question_number}
              </div>

              <h1>{question.subject}</h1>

              <p>
                Detailed information about this parliamentary question.
              </p>

            </div>

            <span
              className={
                question.status === "Answered"
                  ? "details-status answered"
                  : "details-status pending"
              }
            >
              {question.status}
            </span>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <main className="question-details-container">

        {/* QUESTION CONTENT */}

        <section className="question-details-main-card">

          <div className="question-details-card-heading">

            <div className="question-icon">
              ?
            </div>

            <div>

              <span>QUESTION</span>

              <h2>{question.subject}</h2>

            </div>

          </div>

          <div className="question-text-section">

            <h3>Question</h3>

            <p>
              {question.question_text}
            </p>

          </div>

          {/* ANSWER */}

          <div className="official-answer">

            <div className="answer-icon">
              âœ“
            </div>

            <div className="answer-content">

              <span>OFFICIAL RESPONSE</span>

              <h3>Answer</h3>

              <p>
                {question.answer || "No answer has been recorded yet."}
              </p>

            </div>

          </div>

        </section>

        {/* INFORMATION */}

        <aside className="question-information-card">

          <div className="information-card-header">
            Question Information
          </div>

          <div className="information-item">

            <span>Question No.</span>

            <strong>
              {question.question_number}
            </strong>

          </div>

          <div className="information-item">

            <span>Asked By</span>

            <strong>
              {question.asked_by}
            </strong>

          </div>

          <div className="information-item">

            <span>House</span>

            <strong>
              {question.house}
            </strong>

          </div>

          <div className="information-item">

            <span>Question Type</span>

            <strong>
              {question.question_type}
            </strong>

          </div>

          <div className="information-item">

            <span>Date</span>

            <strong>
              {formattedDate}
            </strong>

          </div>

          <div className="information-item">

            <span>Status</span>

            <strong
              className={
                question.status === "Answered"
                  ? "info-answered"
                  : "info-pending"
              }
            >
              {question.status}
            </strong>

          </div>

        </aside>

      </main>

    </div>
  );
}

export default QuestionDetails;
