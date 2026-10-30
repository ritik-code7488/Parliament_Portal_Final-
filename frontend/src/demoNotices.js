// 7 Authentic Demo Parliamentary Notices for testing Read/Seen & Details Modal
export const DEMO_PARLIAMENTARY_NOTICES = [
  {
    id: 101,
    member_id: "MP001",
    title: "Official Summons: Winter Session 2026 Sitting Schedule & House Business Order",
    message: "Under the orders of the Hon'ble Speaker, all Members are hereby informed that the upcoming Winter Session of the 18th Lok Sabha shall commence on Monday, 10th November 2026 at 11:00 AM. Members are requested to submit starred question notices 15 days prior. Attendance in the Division Lobby is strictly mandatory during the presentation of Government Legislative Business.",
    notification_type: "Proceeding",
    priority: "Urgent",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: 102,
    member_id: "MPOO1",
    title: "Advisory on Division & Electronic Voting on Digital Personal Data Protection (Amendment) Bill 2026",
    message: "The Digital Personal Data Protection (Amendment) Bill 2026 has been scheduled for consideration, clause-by-clause reading, and passing on Wednesday at 2:30 PM. A division by automatic vote recorder in the Lok Sabha Chamber may be called. All Members must verify their biometric seat consoles prior to commencement.",
    notification_type: "Bill",
    priority: "Important",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
  },
  {
    id: 103,
    member_id: "MPOO1",
    title: "Starred Question #1042 Admitted: Oral Ministerial Answer Schedule for Ministry of Railways",
    message: "Notice of Starred Question #1042 regarding the 'Expansion of High-Speed Vande Bharat Rail Corridors and Patna Sahib Railway Junction Modernization' has been admitted for oral answer by the Minister of Railways during Question Hour on Friday. The Member is requested to be present in the Chamber for supplementary inquiries.",
    notification_type: "Question",
    priority: "Urgent",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
  },
  {
    id: 104,
    member_id: "MP042",
    title: "Constituency Sanction: Special Rural Infrastructure Grant for Madhubani & Babubarhi, Bihar",
    message: "Under the MPLADS 2026-27 annual development framework, the Ministry of Statistics and Programme Implementation has sanctioned special rural connectivity and smart school infrastructure grants for Madhubani Parliamentary Constituency (Babubarhi block), Bihar. Hon'ble MP Shri Sumit Kumar Roy is requested to tender priority site certifications.",
    notification_type: "General",
    priority: "Important",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
  },
  {
    id: 105,
    member_id: "",
    title: "Standing Committee on Finance: Formal Hearing & Scrutiny of Union Revenue Allocation",
    message: "The next sitting of the Parliamentary Standing Committee on Finance will convene in Committee Room No. 62, Parliament House. Representatives of NITI Aayog and Central Board of Direct Taxes will tender oral evidence on the allocation of developmental funds for Eastern States. Background dossier has been placed in the Digital Sansad repository.",
    notification_type: "General",
    priority: "Important",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 106,
    member_id: "",
    title: "Biometric Smart Access & Security Protocol Upgrades for Central Hall and Sansad Bhavan",
    message: "To enhance physical and digital perimeter security, high-speed RFID biometric access gantries have been installed across Gates 1, 3, and 12 of Sansad Bhavan. Members and accredited personal staff are advised to update their digital identity passes at the Protocol Reception Desk.",
    notification_type: "Attendance",
    priority: "Normal",
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
  },
  {
    id: 107,
    member_id: "",
    title: "House Bulletin Part II: Publication of Gazetted Acts, Papers Laid on the Table & Daily Motions",
    message: "House Bulletin Part II containing the list of official government papers laid on the table of the House during the preceding sitting, along with summary reports of Statutory Resolutions and gazetted notifications, has been published and uploaded to the Digital Documentation Center.",
    notification_type: "Proceeding",
    priority: "Normal",
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
]
