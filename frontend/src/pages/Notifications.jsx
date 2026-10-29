import { useEffect, useMemo, useState } from "react"
import "./Notifications.css"
import API_BASE_URL from "../api"
import NoticeModal from "../NoticeModal"
import { DEMO_PARLIAMENTARY_NOTICES } from "../demoNotices"

const API_URL = `${API_BASE_URL}/api/notifications/notifications/`

function Notifications() {
  const [notifications, setNotifications] = useState(DEMO_PARLIAMENTARY_NOTICES)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [readFilter, setReadFilter] = useState("All")

  // Selected Notice for full document reader modal
  const [selectedNotice, setSelectedNotice] = useState(null)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error("Failed to fetch notifications")
      }

      const data = await response.json()
      const list = Array.isArray(data) ? data : (data.results && Array.isArray(data.results) ? data.results : [])

      if (list.length > 0) {
        setNotifications(list)
      } else {
        setNotifications(DEMO_PARLIAMENTARY_NOTICES)
      }
    } catch (err) {
      console.warn("Notifications loading fallback to demo notices:", err)
      setNotifications((prev) => (prev.length > 0 ? prev : DEMO_PARLIAMENTARY_NOTICES))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const markAsRead = async (id, e) => {
    if (e) e.stopPropagation()
    // Optimistic UI state update immediately
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification
      )
    )
    if (selectedNotice && selectedNotice.id === id) {
      setSelectedNotice((prev) => (prev ? { ...prev, is_read: true } : null))
    }

    try {
      const res = await fetch(`${API_URL}${id}/mark_read/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        await fetch(`${API_URL}${id}/mark_read/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }).catch(() => {})
      }
    } catch (err) {
      console.warn("Mark read network error (optimistic):", err)
    }
  }

  const toggleNoticeRead = async (id, e) => {
    if (e) e.stopPropagation()
    const target = notifications.find((n) => n.id === id)
    const newStatus = target ? !target.is_read : true

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: newStatus }
          : notification
      )
    )

    if (selectedNotice && selectedNotice.id === id) {
      setSelectedNotice((prev) => (prev ? { ...prev, is_read: newStatus } : null))
    }

    try {
      const endpoint = newStatus ? "mark_read" : "mark_unread"
      const res = await fetch(`${API_URL}${id}/${endpoint}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        await fetch(`${API_URL}${id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_read: newStatus }),
        }).catch(() => {})
      }
    } catch (err) {
      console.warn("Toggle read error (optimistic):", err)
    }
  }

  const markAllAsRead = async () => {
    // Optimistic UI state update immediately
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, is_read: true }))
    )
    if (selectedNotice) {
      setSelectedNotice((prev) => (prev ? { ...prev, is_read: true } : null))
    }

    try {
      const res = await fetch(`${API_URL}mark_all_read/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (!res.ok) {
        await fetch(`${API_URL}mark_all_read/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }).catch(() => {})
      }
    } catch (err) {
      console.warn("Mark all read network error (optimistic):", err)
    }
  }

  const handleOpenNotice = (notice) => {
    setSelectedNotice(notice)
    // Auto-mark as seen/read when opened if it's unread
    if (!notice.is_read) {
      markAsRead(notice.id)
    }
  }

  const resetDemoNotices = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}reset_demo/`, { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        if (data.notifications && Array.isArray(data.notifications)) {
          setNotifications(data.notifications)
          setLoading(false)
          return
        }
      }
    } catch (e) {
      console.warn("Reset demo notices backend error:", e)
    }
    // Also reset locally
    setNotifications(DEMO_PARLIAMENTARY_NOTICES.map((n) => ({ ...n })))
    setLoading(false)
  }

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const searchText = search.toLowerCase().trim()
      const title = notification.title || ""
      const message = notification.message || ""
      const memberId = notification.member_id || ""
      const notificationType = notification.notification_type || ""

      const matchesSearch =
        searchText === "" ||
        title.toLowerCase().includes(searchText) ||
        message.toLowerCase().includes(searchText) ||
        memberId.toLowerCase().includes(searchText)

      const matchesType =
        typeFilter === "All" || notificationType === typeFilter

      const matchesRead =
        readFilter === "All" ||
        (readFilter === "Unread" && !notification.is_read) ||
        (readFilter === "Read" && notification.is_read)

      return matchesSearch && matchesType && matchesRead
    })
  }, [notifications, search, typeFilter, readFilter])

  const totalNotifications = notifications.length

  const unreadNotifications = notifications.filter(
    (notification) => !notification.is_read
  ).length

  const readNotifications = notifications.filter(
    (notification) => notification.is_read
  ).length

  const importantNotifications = notifications.filter(
    (notification) =>
      notification.priority === "Important" ||
      notification.priority === "Urgent"
  ).length

  const formatDateTime = (value) => {
    if (!value) return "-"
    const date = new Date(value)
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getPriorityClass = (priority) => {
    if (priority === "Urgent") return "priority urgent"
    if (priority === "Important") return "priority important"
    return "priority normal"
  }

  const getTypeClass = (type) => {
    return `notification-type ${(type || "").toLowerCase()}`
  }

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <p className="notifications-eyebrow">
            PARLIAMENT OF INDIA • SECRETARIAT DISPATCH
          </p>
          <h1>Parliamentary Notices &amp; Bulletins</h1>
          <p className="notifications-subtitle">
            Official legislative notices, session summons, gazette bulletins, and Question Hour orders.
            Click any notice to open the full official document dossier.
          </p>
        </div>

        <div className="notifications-header-actions">
          {unreadNotifications > 0 && (
            <button
              type="button"
              className="mark-all-read-btn"
              onClick={markAllAsRead}
              title="Mark all notifications as read & seen"
            >
              ✓ Mark All Seen ({unreadNotifications})
            </button>
          )}

          <button
            type="button"
            className="reset-demo-btn"
            onClick={resetDemoNotices}
            title="Reset 6 demo notices to test read, seen, and unread"
          >
            ↻ Reset 6 Demo Notices
          </button>

          <button
            type="button"
            className="refresh-btn"
            onClick={fetchNotifications}
            title="Reload from server"
          >
            ↻ Refresh
          </button>
        </div>
      </div>

      <div className="notification-summary">
        <div className="notification-summary-card">
          <div className="summary-label">Total Notices</div>
          <div className="summary-value">{totalNotifications}</div>
        </div>

        <div className="notification-summary-card highlight-unread">
          <div className="summary-label">Unread / Unseen</div>
          <div className="summary-value">{unreadNotifications}</div>
        </div>

        <div className="notification-summary-card highlight-seen">
          <div className="summary-label">Seen &amp; Read</div>
          <div className="summary-value">{readNotifications}</div>
        </div>

        <div className="notification-summary-card highlight-urgent">
          <div className="summary-label">Urgent &amp; Important</div>
          <div className="summary-value">{importantNotifications}</div>
        </div>
      </div>

      <div className="notification-filters">
        <div className="notification-search">
          <label>Search Notices</label>
          <input
            type="text"
            placeholder="Search by title, circular text, or member ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="notification-filter">
          <label>Category</label>
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Attendance">Attendance</option>
            <option value="Bill">Bill</option>
            <option value="Question">Question</option>
            <option value="Proceeding">Proceeding</option>
          </select>
        </div>

        <div className="notification-filter">
          <label>Seen / Read Status</label>
          <select
            value={readFilter}
            onChange={(event) => setReadFilter(event.target.value)}
          >
            <option value="All">All Notices</option>
            <option value="Unread">● Unread Only</option>
            <option value="Read">✓ Seen / Read Only</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="notification-state">
          Loading official parliamentary notices...
        </div>
      )}

      {!loading && error && (
        <div className="notification-error">
          {error}
        </div>
      )}

      {!loading && !error && filteredNotifications.length === 0 && (
        <div className="notification-state">
          No notices found matching your criteria.
        </div>
      )}

      {!loading && !error && filteredNotifications.length > 0 && (
        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                notification.is_read ? "read" : "unread"
              }`}
              onClick={() => handleOpenNotice(notification)}
              title="Click to open and read full notice"
            >
              <div className="notification-card-top">
                <div className="notification-title-area">
                  <div className="notification-icon">
                    {notification.notification_type === "Bill" ? "📜" : notification.notification_type === "Question" ? "💬" : notification.notification_type === "Attendance" ? "📋" : "🏛️"}
                  </div>

                  <div>
                    <h2>{notification.title}</h2>

                    <div className="notification-meta">
                      <span className={getTypeClass(notification.notification_type)}>
                        {notification.notification_type}
                      </span>

                      <span className={getPriorityClass(notification.priority)}>
                        {notification.priority}
                      </span>

                      {notification.member_id && (
                        <span className="member-badge">
                          MP: {notification.member_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!notification.is_read ? (
                  <span className="unread-badge">● New Notice</span>
                ) : (
                  <span className="read-badge">✓ Seen</span>
                )}
              </div>

              <p className="notification-message">
                {notification.message}
              </p>

              <div className="notification-card-bottom" onClick={(e) => e.stopPropagation()}>
                <span className="notification-date">
                  🕒 {formatDateTime(notification.created_at)}
                </span>

                <div className="card-action-buttons-group">
                  <button
                    type="button"
                    className="open-notice-btn"
                    onClick={() => handleOpenNotice(notification)}
                    title="Open full notice document"
                  >
                    👁️ Open Notice
                  </button>

                  {!notification.is_read ? (
                    <button
                      type="button"
                      className="mark-read-btn"
                      onClick={(e) => markAsRead(notification.id, e)}
                      title="Mark as Seen and Read"
                    >
                      ✓ Mark as Seen
                    </button>
                  ) : (
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <span className="read-status-pill">
                        ✓ Seen
                      </span>
                      <button
                        type="button"
                        className="mark-unread-toggle-btn"
                        onClick={(e) => toggleNoticeRead(notification.id, e)}
                        title="Mark as unread to test again"
                      >
                        ↩ Unread
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Official Parliamentary Notice Reader Modal */}
      <NoticeModal
        notice={selectedNotice}
        onClose={() => setSelectedNotice(null)}
        onToggleRead={toggleNoticeRead}
        onMarkRead={markAsRead}
      />
    </div>
  )
}

export default Notifications
