import { useEffect, useMemo, useState } from "react"
import "./Notifications.css"
import API_BASE_URL from "../api"

const API_URL =
  `${API_BASE_URL}/api/notifications/notifications/`

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")
  const [readFilter, setReadFilter] = useState("All")

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error("Failed to fetch notifications")
      }

      const data = await response.json()

      setNotifications(
        Array.isArray(data) ? data : []
      )
    } catch (err) {
      console.error(
        "Notifications loading error:",
        err
      )

      setError(
        "Unable to load notifications."
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const markAsRead = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}${id}/mark_read/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to mark notification as read"
        )
      }

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      )
    } catch (err) {
      console.error(
        "Mark notification read error:",
        err
      )

      setError(
        "Unable to mark notification as read."
      )
    }
  }

  const filteredNotifications = useMemo(() => {
    return notifications.filter(
      (notification) => {
        const searchText =
          search.toLowerCase().trim()

        const title =
          notification.title || ""

        const message =
          notification.message || ""

        const memberId =
          notification.member_id || ""

        const notificationType =
          notification.notification_type || ""

        const matchesSearch =
          searchText === "" ||
          title
            .toLowerCase()
            .includes(searchText) ||
          message
            .toLowerCase()
            .includes(searchText) ||
          memberId
            .toLowerCase()
            .includes(searchText)

        const matchesType =
          typeFilter === "All" ||
          notificationType === typeFilter

        const matchesRead =
          readFilter === "All" ||
          (readFilter === "Unread" &&
            !notification.is_read) ||
          (readFilter === "Read" &&
            notification.is_read)

        return (
          matchesSearch &&
          matchesType &&
          matchesRead
        )
      }
    )
  }, [
    notifications,
    search,
    typeFilter,
    readFilter,
  ])

  const totalNotifications =
    notifications.length

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !notification.is_read
    ).length

  const readNotifications =
    notifications.filter(
      (notification) =>
        notification.is_read
    ).length

  const importantNotifications =
    notifications.filter(
      (notification) =>
        notification.priority ===
          "Important" ||
        notification.priority ===
          "Urgent"
    ).length

  const formatDateTime = (value) => {
    if (!value) return "-"

    const date = new Date(value)

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    )
  }

  const getPriorityClass = (
    priority
  ) => {
    if (priority === "Urgent") {
      return "priority urgent"
    }

    if (priority === "Important") {
      return "priority important"
    }

    return "priority normal"
  }

  const getTypeClass = (type) => {
    return `notification-type ${
      (type || "").toLowerCase()
    }`
  }

  return (
    <div className="notifications-page">

      <div className="notifications-header">

        <div>

          <p className="notifications-eyebrow">
            PARLIAMENT PORTAL
          </p>

          <h1>
            Notifications
          </h1>

          <p className="notifications-subtitle">
            View important updates,
            parliamentary alerts and system
            notifications.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={fetchNotifications}
        >
          ↻ Refresh
        </button>

      </div>

      <div className="notification-summary">

        <div className="notification-summary-card">
          <div className="summary-label">
            Total Notifications
          </div>

          <div className="summary-value">
            {totalNotifications}
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-label">
            Unread
          </div>

          <div className="summary-value">
            {unreadNotifications}
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-label">
            Read
          </div>

          <div className="summary-value">
            {readNotifications}
          </div>
        </div>

        <div className="notification-summary-card">
          <div className="summary-label">
            Important
          </div>

          <div className="summary-value">
            {importantNotifications}
          </div>
        </div>

      </div>

      <div className="notification-filters">

        <div className="notification-search">

          <label>
            Search
          </label>

          <input
            type="text"
            placeholder="Search title, message or member ID..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        <div className="notification-filter">

          <label>
            Notification Type
          </label>

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="General">
              General
            </option>

            <option value="Attendance">
              Attendance
            </option>

            <option value="Bill">
              Bill
            </option>

            <option value="Question">
              Question
            </option>

            <option value="Proceeding">
              Proceeding
            </option>
          </select>

        </div>

        <div className="notification-filter">

          <label>
            Status
          </label>

          <select
            value={readFilter}
            onChange={(event) =>
              setReadFilter(
                event.target.value
              )
            }
          >
            <option value="All">
              All
            </option>

            <option value="Unread">
              Unread
            </option>

            <option value="Read">
              Read
            </option>
          </select>

        </div>

      </div>

      {loading && (
        <div className="notification-state">
          Loading notifications...
        </div>
      )}

      {!loading && error && (
        <div className="notification-error">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filteredNotifications.length ===
          0 && (
          <div className="notification-state">
            No notifications found.
          </div>
        )}

      {!loading &&
        !error &&
        filteredNotifications.length >
          0 && (
          <div className="notifications-list">

            {filteredNotifications.map(
              (notification) => (
                <div
                  key={notification.id}
                  className={`notification-card ${
                    notification.is_read
                      ? "read"
                      : "unread"
                  }`}
                >

                  <div className="notification-card-top">

                    <div className="notification-title-area">

                      <div className="notification-icon">
                        !
                      </div>

                      <div>

                        <h2>
                          {notification.title}
                        </h2>

                        <div className="notification-meta">

                          <span
                            className={getTypeClass(
                              notification.notification_type
                            )}
                          >
                            {
                              notification.notification_type
                            }
                          </span>

                          <span
                            className={getPriorityClass(
                              notification.priority
                            )}
                          >
                            {
                              notification.priority
                            }
                          </span>

                          <span className="member-badge">
                            {notification.member_id}
                          </span>

                        </div>

                      </div>

                    </div>

                    {!notification.is_read && (
                      <span className="unread-badge">
                        Unread
                      </span>
                    )}

                    {notification.is_read && (
                      <span className="read-badge">
                        Read
                      </span>
                    )}

                  </div>

                  <p className="notification-message">
                    {notification.message}
                  </p>

                  <div className="notification-card-bottom">

                    <span className="notification-date">
                      {formatDateTime(
                        notification.created_at
                      )}
                    </span>

                    {!notification.is_read && (
                      <button
                        className="mark-read-btn"
                        onClick={() =>
                          markAsRead(
                            notification.id
                          )
                        }
                      >
                        Mark as Read
                      </button>
                    )}

                  </div>

                </div>
              )
            )}

          </div>
        )}

    </div>
  )
}

export default Notifications