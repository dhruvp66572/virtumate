// Enhanced Event model class for handling comprehensive event details
class Event {
  constructor({
    id = null,
    title = "",
    description = "",
    startDate = new Date(),
    endDate = null,
    location = {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      coordinates: { lat: null, lng: null },
      virtualLink: null,
    },
    organizer = {
      id: null,
      name: "",
      email: "",
      phone: "",
      logo: null,
    },
    category = "",
    subcategory = "",
    tags = [],
    image = null,
    gallery = [],
    ticketInfo = {
      types: [],
      totalAvailable: 0,
      totalSold: 0,
      saleStartDate: null,
      saleEndDate: null,
    },
    pricing = {
      currency: "USD",
      isFree: false,
      basePrice: 0,
      discountCode: null,
    },
    capacity = {
      min: 0,
      max: null,
      currentRegistrations: 0,
    },
    attendees = [],
    speakers = [],
    agenda = [],
    status = "upcoming", // upcoming, ongoing, completed, cancelled, postponed
    visibility = "public", // public, private, unlisted
    recurrence = null,
    notifications = {
      reminderSent: false,
      followUpSent: false,
    },
    socialMedia = {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: null,
    },
    accessibility = {
      wheelchairAccessible: false,
      signLanguageInterpreter: false,
      closedCaptioning: false,
    },
    requirements = [],
    faq = [],
    attachments = [],
    registrationForm = [],
    feedback = [],
    createdAt = new Date(),
    updatedAt = new Date(),
    createdBy = null,
    metadata = {},
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startDate =
      startDate instanceof Date ? startDate : new Date(startDate);
    this.endDate = endDate
      ? endDate instanceof Date
        ? endDate
        : new Date(endDate)
      : null;
    this.location = location;
    this.organizer = organizer;
    this.category = category;
    this.subcategory = subcategory;
    this.tags = tags;
    this.image = image;
    this.gallery = gallery;
    this.ticketInfo = ticketInfo;
    this.pricing = pricing;
    this.capacity = capacity;
    this.attendees = attendees;
    this.speakers = speakers;
    this.agenda = agenda;
    this.status = status;
    this.visibility = visibility;
    this.recurrence = recurrence;
    this.notifications = notifications;
    this.socialMedia = socialMedia;
    this.accessibility = accessibility;
    this.requirements = requirements;
    this.faq = faq;
    this.attachments = attachments;
    this.registrationForm = registrationForm;
    this.feedback = feedback;
    this.createdAt =
      createdAt instanceof Date ? createdAt : new Date(createdAt);
    this.updatedAt =
      updatedAt instanceof Date ? updatedAt : new Date(updatedAt);
    this.createdBy = createdBy;
    this.metadata = metadata;

    // Event instance state
    this._isSaving = false;
    this._lastError = null;
  }

  // Format date for display with configurable options
  formatDate(date, options = {}) {
    if (!date) return "";

    const defaultOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
      locale: "en-US",
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const { locale, ...dateTimeOptions } = mergedOptions;

    return new Intl.DateTimeFormat(locale, dateTimeOptions).format(date);
  }

  // Get duration of event with customizable format
  getDuration(format = "verbose") {
    if (!this.endDate) return "No end time specified";

    const diff = this.endDate - this.startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    switch (format) {
      case "short":
        return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${
          minutes > 0 ? minutes + "m" : ""
        }`.trim();
      case "object":
        return { days, hours, minutes };
      case "verbose":
      default:
        return `${days > 0 ? days + " day" + (days > 1 ? "s" : "") + " " : ""}${
          hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") + " " : ""
        }${
          minutes > 0 ? minutes + " minute" + (minutes > 1 ? "s" : "") : ""
        }`.trim();
    }
  }

  // Get formatted time until event with customizable format
  getTimeUntil(format = "verbose") {
    const now = new Date();
    if (this.startDate < now) {
      if (this.endDate && this.endDate > now) {
        return "Event is currently happening";
      }
      return "Event has ended";
    }

    const diff = this.startDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    switch (format) {
      case "short":
        return `${days > 0 ? days + "d " : ""}${hours > 0 ? hours + "h " : ""}${
          minutes > 0 ? minutes + "m" : ""
        }`.trim();
      case "object":
        return { days, hours, minutes };
      case "verbose":
      default:
        if (days > 0) {
          return `${days} day${days > 1 ? "s" : ""} ${hours} hour${
            hours > 1 ? "s" : ""
          }`;
        } else {
          return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
            minutes > 1 ? "s" : ""
          }`;
        }
    }
  }

  // Generate summary of event
  getSummary() {
    return {
      id: this.id,
      title: this.title,
      date: this.formatDate(this.startDate),
      location:
        this.location.name ||
        this.location.address ||
        (this.location.virtualLink ? "Virtual Event" : ""),
      timeUntil: this.getTimeUntil(),
      status: this.status,
      image: this.image,
      price: this.pricing.isFree
        ? "Free"
        : `${this.pricing.basePrice} ${this.pricing.currency}`,
      organizerName: this.organizer.name,
    };
  }

  // Get full event details
  getDetails() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startDate: this.formatDate(this.startDate),
      endDate: this.endDate ? this.formatDate(this.endDate) : null,
      duration: this.getDuration(),
      location: this.location,
      organizer: this.organizer,
      category: this.category,
      subcategory: this.subcategory,
      tags: this.tags,
      image: this.image,
      gallery: this.gallery,
      ticketInfo: this.ticketInfo,
      pricing: this.pricing,
      capacity: this.capacity,
      attendeeCount: this.attendees.length,
      speakers: this.speakers,
      agenda: this.agenda,
      status: this.status,
      visibility: this.visibility,
      timeUntil: this.getTimeUntil(),
      accessibility: this.accessibility,
      faq: this.faq,
      attachments: this.attachments,
    };
  }

  // Check if event is happening on a specific date
  isOnDate(date) {
    const targetDate = date instanceof Date ? date : new Date(date);

    // Reset time components for date comparison
    const eventDateStart = new Date(this.startDate);
    eventDateStart.setHours(0, 0, 0, 0);

    const eventDateEnd = this.endDate
      ? new Date(this.endDate)
      : new Date(this.startDate);
    eventDateEnd.setHours(23, 59, 59, 999);

    targetDate.setHours(0, 0, 0, 0);

    return targetDate >= eventDateStart && targetDate <= eventDateEnd;
  }

  // Check if event is happening today
  isToday() {
    return this.isOnDate(new Date());
  }

  // Check if event is virtual
  isVirtual() {
    return Boolean(this.location.virtualLink);
  }

  // Check if event is free
  isFree() {
    return this.pricing.isFree || this.pricing.basePrice === 0;
  }

  // Calculate ticket availability
  getAvailability() {
    const sold = this.ticketInfo.totalSold;
    const available = this.ticketInfo.totalAvailable;

    if (available === 0) return "Unlimited";

    const remaining = available - sold;
    const percentRemaining = (remaining / available) * 100;

    return {
      remaining,
      percentRemaining,
      percentSold: 100 - percentRemaining,
      isSoldOut: remaining <= 0,
      isLowAvailability: percentRemaining <= 10,
    };
  }

  // Get event location in formatted string
  getFormattedLocation() {
    if (this.isVirtual()) {
      return "Virtual Event";
    }

    const { name, address, city, state, zipCode, country } = this.location;
    const locationParts = [];

    if (name) locationParts.push(name);
    if (address) locationParts.push(address);
    if (city) {
      const cityStateZip = [city];
      if (state) cityStateZip.push(state);
      if (zipCode) cityStateZip.push(zipCode);
      locationParts.push(cityStateZip.join(", "));
    }
    if (country) locationParts.push(country);

    return locationParts.join(", ");
  }

  // Get data for calendar export (iCal, Google Calendar)
  getCalendarData() {
    return {
      title: this.title,
      description: this.description,
      location: this.getFormattedLocation(),
      startDate: this.startDate,
      endDate:
        this.endDate || new Date(this.startDate.getTime() + 60 * 60 * 1000), // Default 1 hour
      url: this.location.virtualLink || "",
      organizer: this.organizer,
    };
  }

  // Add an attendee to the event
  addAttendee(attendee) {
    if (!attendee.id) {
      attendee.id = `att-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    attendee.registeredAt = new Date();

    this.attendees.push(attendee);
    this.capacity.currentRegistrations = this.attendees.length;

    return attendee.id;
  }

  // Remove an attendee from the event
  removeAttendee(attendeeId) {
    const initialCount = this.attendees.length;
    this.attendees = this.attendees.filter((att) => att.id !== attendeeId);
    this.capacity.currentRegistrations = this.attendees.length;

    return initialCount > this.attendees.length;
  }

  // Add a ticket type
  addTicketType(ticketType) {
    if (!ticketType.id) {
      ticketType.id = `ticket-${Date.now()}-${Math.floor(
        Math.random() * 1000
      )}`;
    }

    this.ticketInfo.types.push(ticketType);
    this.ticketInfo.totalAvailable += ticketType.quantity || 0;

    return ticketType.id;
  }

  // Create a recurring schedule
  setRecurrence(
    pattern = "weekly",
    interval = 1,
    endDate = null,
    exceptions = []
  ) {
    this.recurrence = {
      pattern,
      interval,
      endDate,
      exceptions,
    };
  }

  // Cancel the event
  cancel(reason = "") {
    this.status = "cancelled";
    this.metadata.cancellationReason = reason;
    this.metadata.cancelledAt = new Date();
    this.updatedAt = new Date();

    return true;
  }

  // Postpone the event
  postpone(newStartDate, newEndDate = null, reason = "") {
    this.status = "postponed";
    this.metadata.originalStartDate = this.startDate;
    this.metadata.originalEndDate = this.endDate;
    this.metadata.postponeReason = reason;
    this.metadata.postponedAt = new Date();

    this.startDate =
      newStartDate instanceof Date ? newStartDate : new Date(newStartDate);
    this.endDate = newEndDate
      ? newEndDate instanceof Date
        ? newEndDate
        : new Date(newEndDate)
      : null;
    this.updatedAt = new Date();

    return true;
  }

  // Get the event's past instances if it's recurring
  getPastInstances() {
    if (!this.recurrence) return [];

    // Implementation would depend on how recurrence is handled
    // This is a placeholder for the concept
    return [];
  }

  // Get the event's future instances if it's recurring
  getFutureInstances() {
    if (!this.recurrence) return [];

    // Implementation would depend on how recurrence is handled
    // This is a placeholder for the concept
    return [];
  }

  // Clone the event
  clone() {
    const clonedData = JSON.parse(JSON.stringify(this));
    delete clonedData.id;
    clonedData.title = `Copy of ${this.title}`;
    clonedData.createdAt = new Date();
    clonedData.updatedAt = new Date();

    return new Event(clonedData);
  }

  // Save the event to storage (implementation would vary)
  async save() {
    if (this._isSaving) return false;

    try {
      this._isSaving = true;
      this.updatedAt = new Date();

      // Placeholder for actual save implementation
      // This would typically be an API call or database operation
      console.log("Saving event:", this.id || "new event");

      // Simulate a successful save
      if (!this.id) {
        this.id = `evt-${Date.now()}`;
      }

      return true;
    } catch (error) {
      this._lastError = error;
      return false;
    } finally {
      this._isSaving = false;
    }
  }

  // Static method to create an event from a calendar ICS format
  static fromICS(icsData) {
    // Implementation would parse ICS data
    // This is a placeholder for the concept
    return new Event({
      title: "Imported from Calendar",
      startDate: new Date(),
    });
  }
}

// Example usage
const ViewEventModal = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(18, 0, 0);

  const tomorrowEnd = new Date(tomorrow);
  tomorrowEnd.setHours(21, 0, 0);

  const event = new Event({
    title: "Tech Conference 2025",
    description:
      "Join us for the premier tech conference featuring industry leaders and innovative workshops.",
    startDate: tomorrow,
    endDate: tomorrowEnd,
    location: {
      name: "Tech Innovation Center",
      address: "123 Future Avenue",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94105",
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    organizer: {
      name: "Future Tech Association",
      email: "events@futuretech.org",
      logo: "https://example.com/logo.png",
    },
    category: "Technology",
    subcategory: "Conference",
    tags: ["AI", "Web Development", "Blockchain", "UX Design"],
    image: "https://example.com/event-cover.jpg",
    gallery: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
    ],
    ticketInfo: {
      types: [
        {
          id: "ticket-1",
          name: "Early Bird",
          price: 199,
          quantity: 100,
          sold: 78,
        },
        {
          id: "ticket-2",
          name: "Regular",
          price: 299,
          quantity: 200,
          sold: 42,
        },
        { id: "ticket-3", name: "VIP", price: 499, quantity: 50, sold: 15 },
      ],
      totalAvailable: 350,
      totalSold: 135,
      saleStartDate: new Date("2025-01-15"),
      saleEndDate: new Date("2025-02-24"),
    },
    pricing: {
      currency: "USD",
      isFree: false,
      basePrice: 299,
    },
    capacity: {
      min: 0,
      max: 350,
      currentRegistrations: 135,
    },
    speakers: [
      {
        id: "spk-1",
        name: "Jane Doe",
        title: "CTO, Future Tech",
        bio: "Leading expert in AI development",
        photo: "https://example.com/janedoe.jpg",
      },
      {
        id: "spk-2",
        name: "John Smith",
        title: "Principal UX Designer, Design Co",
        bio: "Award-winning designer with 15 years experience",
        photo: "https://example.com/johnsmith.jpg",
      },
    ],
    agenda: [
      { time: "18:00", title: "Networking & Registration" },
      { time: "18:30", title: "Opening Keynote", speaker: "spk-1" },
      { time: "19:30", title: "Panel Discussion: Future of Tech" },
      { time: "20:30", title: "Closing Remarks & Networking" },
    ],
    accessibility: {
      wheelchairAccessible: true,
      signLanguageInterpreter: true,
      closedCaptioning: true,
    },
    faq: [
      {
        question: "Is parking available?",
        answer: "Yes, free parking is available at the venue.",
      },
      {
        question: "What is the dress code?",
        answer: "Business casual is recommended.",
      },
    ],
  });

  console.log("Event Summary:", event.getSummary());
  console.log("Event Details:", event.getDetails());
  console.log("Calendar Data:", event.getCalendarData());
  console.log("Availability:", event.getAvailability());

  return event;
};

export default ViewEventModal;
