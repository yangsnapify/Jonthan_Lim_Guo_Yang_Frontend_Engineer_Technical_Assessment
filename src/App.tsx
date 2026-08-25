import { useState } from 'react';
import type { Doctor } from './types/doctor';
import { DoctorList } from './components/doctorList';
import { DoctorProfile } from './components/doctorProfile';

type View = 'doctors' | 'profile';

export default function App() {
  const [view, setView] =
    useState<View>('doctors');

  const [selectedDoctorId, setSelectedDoctorId] =
    useState<string | null>(null);

  function handleSelectDoctor(doctor: Doctor) {
    setSelectedDoctorId(doctor.id);
    setView('profile');
  }

  function handleBack() {
    setSelectedDoctorId(null);
    setView('doctors');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <span className="brand-mark">+</span>
            <span className="brand-name">
              MedBook
            </span>
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
              onBack={handleBack}
            />
          )}
      </main>
    </div>
  );
}