import { useState } from 'react';
import BookingPage from './biz/pages/booking';
import { DoctorList } from './biz/pages/doctor/components/doctorList';
import { DoctorProfile } from './biz/pages/doctor/components/doctorProfile';

type View = 'doctors' | 'profile' | 'booking';

export default function App() {
  const [view, setView] =
    useState<View>('doctors');

  const [selectedDoctorId, setSelectedDoctorId] =
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
    setView('doctors');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-mark">+</span>
            <span className="brand-name">MedBook</span>
          </div>
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
      </main>
    </div>
  );
}