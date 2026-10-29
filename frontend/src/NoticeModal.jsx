import React from "react"
import "./NoticeModal.css"

export function getNoticeRefNumber(notice) {
  if (!notice) return "LS/NOTIF/2026/001"
  const prefix = {
    Proceeding: "LS/SESS-PROC",
    Bill: "LEG-BILL",
    Question: "QB/SANSAD",
    Attendance: "PARL-SEC/ATTN",
    General: "COMM-PANEL",
  }[notice.notification_type] || "LS/NOTIF"

  return `${prefix}/2026/DOC-${String(notice.id || "042").padStart(3, "0")}`
}

export function getNoticeIssuingAuthority(notice) {
  if (!notice) return "Secretariat General, Parliament of India"
  const authorities = {
    Proceeding: "Secretary-General, Lok Sabha Secretariat",
    Bill: "Ministry of Parliamentary Affairs & Legislative Branch",
    Question: "Question Branch, Lok Sabha Secretariat",
    Attendance: "Parliament Security Services & Attendance Division",
    General: "Standing Committees Branch, Sansad Bhavan",
  }
  return authorities[notice.notification_type] || "Parliament Secretariat Administrator"
}

export default function NoticeModal({ notice, onClose, onToggleRead, onMarkRead }) {
  if (!notice) return null

  const formattedDate = notice.created_at
    ? new Date(notice.created_at).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    : new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const refNumber = getNoticeRefNumber(notice)
  const issuingAuth = getNoticeIssuingAuthority(notice)

  return (
    <div className="notice-modal-backdrop" onClick={onClose}>
      <div className="notice-modal-window" onClick={(e) => e.stopPropagation()}>

        {/* Modal Top Header */}
        <div className="notice-modal-head">
          <div className="notice-head-crest">
            <span className="notice-crest-icon">🏛️</span>
            <div>
              <span className="notice-head-super">PARLIAMENT OF INDIA • DIGITAL SANSAD PORTAL</span>
              <h3 className="notice-head-main">LOK SABHA &amp; RAJYA SABHA SECRETARIAT</h3>
            </div>
          </div>
          <button
            type="button"
            className="notice-close-x"
            onClick={onClose}
            aria-label="Close Notice"
            title="Close Notice"
          >
            ✕
          </button>
        </div>

        {/* Official Reference & Status Strip */}
        <div className="notice-ref-strip">
          <div className="notice-ref-item">
            <span className="notice-strip-label">CIRCULAR DISPATCH REF:</span>
            <strong className="notice-strip-code">{refNumber}</strong>
          </div>
          <div className="notice-badges-cluster">
            <span className={`notice-modal-priority priority-${(notice.priority || "normal").toLowerCase()}`}>
              {notice.priority || "Normal"} Priority
            </span>
            <span className="notice-modal-type">
              {notice.notification_type || "General"}
            </span>
            {notice.is_read ? (
              <span className="notice-modal-status status-seen">
                ✓ Seen &amp; Read
              </span>
            ) : (
              <span className="notice-modal-status status-unseen">
                ● New / Unseen
              </span>
            )}
          </div>
        </div>

        {/* Modal Body / Notice Content */}
        <div className="notice-modal-scroll-area">
          <h2 className="notice-document-title">{notice.title}</h2>

          {/* Authority Dossier Strip */}
          <div className="notice-dossier-grid">
            <div className="dossier-meta-card">
              <span className="meta-card-label">ISSUING DEPARTMENT</span>
              <strong className="meta-card-value">{issuingAuth}</strong>
            </div>
            <div className="dossier-meta-card">
              <span className="meta-card-label">ADDRESSED TO</span>
              <strong className="meta-card-value">
                {notice.member_id ? `Hon'ble Member (${notice.member_id})` : "All Hon'ble Members of Parliament"}
              </strong>
            </div>
            <div className="dossier-meta-card">
              <span className="meta-card-label">DATE &amp; TIME</span>
              <strong className="meta-card-value">{formattedDate}</strong>
            </div>
          </div>

          {/* Official Letter/Notice Body */}
          <div className="notice-letter-box">
            <div className="notice-letter-stamp-row">
              <span className="notice-letter-badge">OFFICIAL PARLIAMENTARY NOTICE</span>
              <span className="notice-confidentiality">RESTRICTED CIRCULATION</span>
            </div>

            <p className="notice-letter-text">{notice.message}</p>

            {/* Official Sansad Signature & Verification */}
            <div className="notice-verification-footer">
              <div className="sansad-seal">
                <span className="seal-emblem">🇮🇳</span>
                <div className="seal-text">
                  <strong>PARLIAMENT SECRETARIAT</strong>
                  <small>OFFICIAL SEAL • VERIFIED</small>
                </div>
              </div>

              <div className="sansad-officer-signature">
                <div className="signature-cursive">R. K. Sharma</div>
                <div className="officer-designation">Under Secretary (Table Office &amp; Notices)</div>
                <div className="officer-location">Sansad Bhavan, New Delhi - 110001</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="notice-modal-footer">
          <div className="notice-footer-actions-left">
            <button
              type="button"
              className={`notice-seen-toggle-btn ${notice.is_read ? "btn-unread" : "btn-seen"}`}
              onClick={() => (onToggleRead ? onToggleRead(notice.id) : onMarkRead(notice.id))}
            >
              {notice.is_read ? "↩ Mark as Unread (Try Again)" : "✓ Mark as Seen & Read"}
            </button>
            <button
              type="button"
              className="notice-print-btn"
              onClick={() => window.print()}
            >
              🖨️ Print Notice
            </button>
          </div>

          <button
            type="button"
            className="notice-dismiss-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  )
}
