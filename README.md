# Jonthan_Lim_Guo_Yang_Frontend_Engineer_Technical_Assessment
Bowtie Insurance
preview link: https://6a8d90ba781d6a5aa33c9ae7--bejewelled-banoffee-5146a4.netlify.app/


# Doctor Booking Application

## Overview

A responsive Doctor Booking web application that allows patients to browse doctors, view their availability, make appointments, view existing bookings, and cancel bookings.

The application uses the provided RESTful API as the source of truth for doctors and bookings.

### Hosted Application

> To be added after deployment.

### Repository

> GitHub repository: To be added.

---

## Tech Stack

### React + TypeScript

React is used as the frontend framework because the application is primarily an interactive client-side application with multiple UI states such as doctor selection, date selection, time-slot selection, booking submission, and booking management.

TypeScript is used to improve type safety when working with the API models and booking-related business logic.

### Vite

Vite is used as the build tool because it provides a lightweight development environment and fast build times while requiring minimal configuration for a React + TypeScript application.

**Benefits**

* Fast development server.
* Simple configuration.
* Good TypeScript support.
* Suitable for a relatively small SPA.

**Drawbacks**

* Requires additional configuration if the application grows into a more complex production platform.
* Does not provide the server-side capabilities of frameworks such as Next.js.

**Assumption**

The application is a client-side web application and does not require server-side rendering.

### Tailwind CSS

Tailwind CSS is used for styling and responsive layout.

**Benefits**

* Fast UI development.
* Consistent spacing and responsive utilities.
* Easy to maintain responsive layouts.
* Reduces the need for large amounts of custom CSS.

**Drawbacks**

* Utility classes can become verbose.
* Components need to be structured carefully to avoid duplicated styling.

**Assumption**

The application does not require a large custom design system, so utility-based styling is appropriate.

### Axios

Axios is used as the HTTP client for communicating with the REST API.

**Benefits**

* Simple request API.
* Centralized API configuration.
* Built-in request/response handling.
* Easy timeout and error handling.

**Drawbacks**

* The native `fetch` API could provide similar functionality without an additional dependency.

**Assumption**

A small API abstraction layer is useful because multiple endpoints are required by the application.

### Day.js

Day.js is used for date and time manipulation.

The booking UI requires weekday calculation, date comparison, formatting, and time-slot handling.

**Benefits**

* Small bundle size.
* Simple API.
* Suitable for the relatively simple date requirements of this application.

**Drawbacks**

* More advanced timezone requirements may require additional plugins.

**Assumption**

The provided API does not expose timezone information, therefore the application uses the user's local timezone.

### React Hook Form

React Hook Form is used for the patient booking form.

**Benefits**

* Simple form state management.
* Efficient rendering.
* Built-in validation support.

**Drawbacks**

* Adds a dependency for a relatively small form.

**Assumption**

Although the current form is small, using a form library makes validation and future form expansion easier.

### Zod

Zod is used for validating user input and API-related data where appropriate.

**Benefits**

* Type-safe validation.
* Validation rules are explicit and easy to maintain.
* Works well with TypeScript.

**Drawbacks**

* Adds another dependency.
* Some validation could be implemented directly for a small application.

---

## Getting Started

### Requirements

* Node.js
* npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=<API_BASE_URL>
VITE_API_KEY=<API_KEY>
```

The API key should not be committed to the repository.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

## Testing Strategy

Testing is not mandatory for this assessment, but the following tests would be included in a production implementation.

### Unit Tests

The most important business logic should be tested independently:

* Date validation.
* Opening-hours validation.
* Available time-slot generation.
* Booking status handling.

### Integration Tests

Test interactions between UI components and the API:

* Loading doctor information.
* Creating a booking.
* Loading booking history.
* Cancelling a booking.

### End-to-End Tests

The main user journeys should be covered:

1. Browse doctors → select doctor → make booking.
2. Attempt to select an unavailable slot.
3. View booking history.
4. Cancel an existing booking.

---

## Production Considerations

### API Key

The API key should be managed through deployment environment variables and should never be committed to source control.

If the API key is intended to be private, a production backend or proxy should be introduced instead of exposing the key in a browser application.

### API Validation

Frontend validation improves user experience, but the backend should remain the final source of truth for booking rules.

This is especially important for:

* Concurrent bookings.
* Booking conflicts.
* Opening-hour validation.
* Past bookings.

### Error Handling

Production implementation should handle:

* Network failures.
* API errors.
* Invalid responses.
* Booking conflicts.
* Loading states.
* Empty states.

### Accessibility

The production application should include:

* Proper form labels.
* Keyboard navigation.
* Visible focus states.
* Accessible buttons and dialogs.
* Appropriate contrast.
* Mobile-friendly touch targets.

### Deployment

The application can be deployed using Vercel, Netlify, or another static hosting provider.

The production build should use environment-specific configuration rather than hard-coded API credentials.

---

## Assumptions

The following assumptions were made because the API specification does not explicitly define every product behaviour.

### Booking

* Each appointment lasts one hour.
* A booking belongs to one doctor.
* A booking has one patient name.
* The `start` value represents the starting time of the appointment.
* Cancelled bookings are retained in booking history rather than deleted.
* Cancelling a booking changes its status to `cancelled`.

### Availability

* A doctor cannot accept bookings outside their opening hours.
* A doctor cannot accept bookings on a day where `isClosed` is `true`.
* The frontend disables invalid time slots before submitting a booking.
* The backend remains responsible for final validation.
* A cancelled booking makes its time slot available again.

### Date and Time

* The API does not specify a timezone.
* The application therefore uses the user's local timezone.
* A booking cannot be made in the past.
* Appointments are treated as one-hour slots.

### API

* The backend is responsible for generating booking IDs.
* The backend is the source of truth for booking availability.
* The frontend should handle API failures gracefully rather than assuming every request succeeds.

### Product Scope

The assessment does not require:

* Authentication.
* Patient accounts.
* Payment.
* Doctor administration.
* Notifications.
* Rescheduling.
* Multiple appointment durations.

These features are outside the scope of the take-home assessment.

---

## Potential Improvements

If more development time were available, I would prioritize the following improvements:

### User Experience

* Improve the calendar experience with a monthly calendar.
* Add doctor search and filtering.
* Provide clearer availability indicators.
* Add a booking confirmation step.
* Improve mobile booking interactions.

### Booking Management

* Allow users to reschedule an appointment.
* Provide more detailed booking information.
* Add booking confirmation notifications.

### Reliability

* Add stronger API error recovery.
* Handle concurrent booking conflicts more explicitly.
* Add request retry and timeout strategies.

### Testing

* Add automated unit, integration, and end-to-end tests.
* Add tests for edge cases around opening hours and dates.

---

## Project Scope

The implementation prioritizes the core user journey within the recommended eight-hour assessment limit:

**Browse Doctor → View Availability → Book Appointment → View Booking → Cancel Booking**

The goal is to provide a polished and responsive experience while keeping the implementation focused on the requirements of the assessment.
