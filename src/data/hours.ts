export interface OpeningHours {
  days: string;
  hours: string;
  note?: string;
}

/**
 * Structured opening hours — update this array to change the hours everywhere
 * (homepage, contact page, footer).
 */
export const OPENING_HOURS: OpeningHours[] = [
  { days: "Monday – Thursday", hours: "7:30 AM – 10:00 PM" },
  { days: "Friday", hours: "7:30 AM – 11:00 PM", note: "Live grill nights from 7 PM" },
  { days: "Saturday", hours: "8:00 AM – 11:00 PM" },
  { days: "Sunday", hours: "9:00 AM – 9:00 PM", note: "Family lunch all afternoon" },
];

export const KITCHEN_NOTE = "Kitchen closes 45 minutes before closing time.";
