import { useState } from 'react';
import BookingPage from '@/biz/pages/booking';
import { BookingDetail } from '@/biz/pages/booking/components/bookingDetail';
import { BookingList } from '@/biz/pages/booking/components/bookingList';
import { DoctorList } from '@/biz/pages/doctor/components/doctorList';
import { DoctorProfile } from '@/biz/pages/doctor/components/doctorProfile';

type View = 'doctors' | 'profile' | 'booking' | 'bookings' | 'bookingDetail';

export default function App() {
  const [view, setView] =
    useState<View>('doctors');

  const [selectedDoctorId, setSelectedDoctorId] =
    useState<string | null>(null);

  const [selectedBookingId, setSelectedBookingId] =
    useState<string | null>(null);

  function handleSelectDoctor(id: string) {
    setSelectedDoctorId(id);
    setView('profile');
  }

  function handleBackToDoctors() {
    setSelectedDoctorId(null);
    setView('doctors');
  }

  function handleBookAppointment() {
    setView('booking');
  }

  function handleBackToProfile() {
    setView('profile');
  }

  function handleBookingSuccess() {
    setSelectedDoctorId(null);
    setView('bookings');
  }

  function handleSelectBooking(id: string) {
    setSelectedBookingId(id);
    setView('bookingDetail');
  }

  function handleOpenBookings() {
    setSelectedDoctorId(null);
    setView('bookings');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <button className="brand" type="button" onClick={() => setView('doctors')}>
            <span className="brand-mark">+</span>
            <span className="brand-name">MedBook</span>
          </button>
          <nav className="header-nav" aria-label="Primary navigation">
            <button type="button" className={view === 'doctors' || view === 'profile' || view === 'booking' ? 'nav-button active' : 'nav-button'} onClick={() => setView('doctors')}>
              Find a doctor
            </button>
            <button type="button" className={view === 'bookings' || view === 'bookingDetail' ? 'nav-button active' : 'nav-button'} onClick={handleOpenBookings}>
              My bookings
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        {view === 'doctors' && (
          <DoctorList
            onSelect={handleSelectDoctor}
          />
        )}

        {view === 'profile' &&
          selectedDoctorId && (
            <DoctorProfile
              doctorId={selectedDoctorId}
              onBack={handleBackToDoctors}
              onBook={handleBookAppointment}
            />
          )}

        {view === 'booking' &&
          selectedDoctorId && (
            <BookingPage
              doctorId={selectedDoctorId}
              onBack={handleBackToProfile}
              onSuccess={handleBookingSuccess}
            />
          )}

        {view === 'bookings' && <BookingList onSelect={handleSelectBooking} />}

        {view === 'bookingDetail' && selectedBookingId && (
          <BookingDetail bookingId={selectedBookingId} onBack={handleOpenBookings} />
        )}
      </main>
    </div>
  );
}
