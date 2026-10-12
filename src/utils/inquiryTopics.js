// Keep values in sync with server/models/Inquiry.js.
export const inquiryTopics = [
  { value: "private_session", label: "Private art session", emoji: "🎨", booking: true },
  { value: "group_booking", label: "Group or corporate booking", emoji: "👥", booking: true },
  { value: "kids_session", label: "Kids session or birthday party", emoji: "🧒", booking: true },
  { value: "collaboration", label: "Collaboration", emoji: "🤝", booking: false },
  { value: "workshop_question", label: "Question about a workshop", emoji: "❓", booking: false },
  { value: "other", label: "Something else", emoji: "💬", booking: false },
];

export const topicInfo = (value) => inquiryTopics.find((t) => t.value === value);

// Bookings need a date and head count for planning.
export const isBookingTopic = (value) => Boolean(topicInfo(value)?.booking);
