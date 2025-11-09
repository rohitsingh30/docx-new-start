import React, { useState } from 'react';
import styles from './styles/App.module.css';
import Dashboard from './components/Dashboard';
import PatientRecords from './components/PatientRecords';
import PatientDetails from './components/PatientDetails';
import AppointmentDetails from './components/AppointmentDetails';
import Appointments from './components/Appointments';
import Consultation from './components/Consultation';
import Settings from './components/Settings';
import AppointmentReport from './components/AppointmentReport';
import Invoice from './components/Invoice';
import LeftPane from './components/LeftPane';
import TopNav from './components/TopNav';
import Login from './components/Login';
import NotesModal from './modals/NotesModal';
import RescheduleModal from './modals/RescheduleModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { APP_CONFIG } from './constants/dataConstants';
import { getCSSVariablesAsStyle } from './utils/cssUtils';
import { TabType } from './types/Dashboard.types';
import { ConsultationReport } from './types/Consultation.types';

/**
 * Main application component with authentication
 */
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(APP_CONFIG.DEFAULT_TAB);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showAppointmentReport, setShowAppointmentReport] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCreateInvoicePrompt, setShowCreateInvoicePrompt] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [completedConsultationData, setCompletedConsultationData] = useState<ConsultationReport | null>(null);
  const { isAuthenticated } = useAuth();

  const handleShowAppointmentDetails = (appointmentId?: string) => {
    setSelectedAppointmentId(appointmentId);
    setShowAppointmentDetails(true);
  };

  const handleBackFromAppointmentDetails = () => {
    setShowAppointmentDetails(false);
    setSelectedAppointmentId(undefined);
  };

  const handleShowPatientDetails = (patientId?: string) => {
    setSelectedPatientId(patientId);
    setShowPatientDetails(true);
  };

  const handleBackFromPatientDetails = () => {
    setShowPatientDetails(false);
    setSelectedPatientId(undefined);
  };

  const handleUpdateVitals = (vitals: { heartRate: string; bloodPressure: string; temperature: string; weight: string }) => {
    console.log('Vitals updated:', vitals);
    // In a real app, send vitals to backend API
  };

  const handleStartAppointment = () => {
    setShowConsultation(true);
    setShowAppointmentDetails(false);
  };

  const handleCancelAppointment = () => {
    if (window.confirm('Are you sure you want to cancel this appointment? This action cannot be undone.')) {
      console.log('Canceling appointment:', selectedAppointmentId);
      // In a real app, update appointment status to 'Cancelled'
      alert('Appointment cancelled successfully!');
      handleBackFromAppointmentDetails();
    }
  };

  const handleReschedule = () => {
    setShowRescheduleModal(true);
  };

  const handleAddNotes = () => {
    setShowNotesModal(true);
  };

  const handleCloseNotesModal = () => {
    setShowNotesModal(false);
  };

  const handleCloseRescheduleModal = () => {
    setShowRescheduleModal(false);
  };

  const handleSaveNotes = (notes: string) => {
    console.log('Saving notes:', notes);
    // In a real app, send to API
    alert('Notes saved successfully!');
    setShowNotesModal(false);
  };

  const handleConfirmReschedule = (newDate: string, newTime: string) => {
    console.log('Rescheduling to:', newDate, newTime);
    // In a real app, send to API
    alert(`Appointment rescheduled to ${newDate} at ${newTime}!`);
    setShowRescheduleModal(false);
  };

  const handleCompleteConsultation = (report: ConsultationReport) => {
    console.log('Consultation completed:', report);
    setCompletedConsultationData(report);
    setShowConsultation(false);
    setShowCreateInvoicePrompt(true);
  };

  const handleCreateInvoice = () => {
    setShowCreateInvoicePrompt(false);
    setShowInvoice(true);
    // In real app, pre-populate invoice with consultation data
  };

  const handleSkipInvoice = () => {
    setShowCreateInvoicePrompt(false);
    setShowAppointmentDetails(false);
    setActiveTab('dashboard');
  };

  const handleCancelConsultation = () => {
    setShowConsultation(false);
    setShowAppointmentDetails(true);
  };

  const renderContent = () => {
    if (showConsultation) {
      return (
        <Consultation
          appointmentId={selectedAppointmentId || '1'}
          patientName="Liam Johnson"
          patientAge={34}
          patientGender="Male"
          appointmentType="General Checkup"
          onComplete={handleCompleteConsultation}
          onCancel={handleCancelConsultation}
        />
      );
    }

    if (showAppointmentReport) {
      return (
        <AppointmentReport
          appointmentId={selectedAppointmentId || '1'}
          onBack={() => {
            setShowAppointmentReport(false);
            setShowAppointmentDetails(true);
          }}
        />
      );
    }

    if (showInvoice) {
      return (
        <Invoice
          onBack={() => {
            setShowInvoice(false);
            setActiveTab('dashboard');
          }}
        />
      );
    }

    if (showPatientDetails) {
      return (
        <PatientDetails 
          patientId={selectedPatientId}
          onBack={handleBackFromPatientDetails}
        />
      );
    }

    if (showAppointmentDetails) {
      return (
        <AppointmentDetails 
          appointmentId={selectedAppointmentId}
          onBack={handleBackFromAppointmentDetails}
          onUpdateVitals={handleUpdateVitals}
          onStart={handleStartAppointment}
          onCancel={handleCancelAppointment}
          onReschedule={handleReschedule}
          onAddNotes={handleAddNotes}
          onViewPreviousAppointment={(apptId) => {
            setSelectedAppointmentId(apptId);
            setShowAppointmentDetails(false);
            setShowAppointmentReport(true);
          }}
        />
      );
    }
    switch (activeTab) {
      case 'patients':
        return <PatientRecords onPatientClick={handleShowPatientDetails} />;
      case 'appointments':
        return (
          <Appointments 
            onAppointmentClick={handleShowAppointmentDetails}
          />
        );
      case 'settings':
        return <Settings onShowInvoices={() => setShowInvoice(true)} />;
      case 'invoices':
        return <Invoice />;
      case 'dashboard':
      default:
        return (
          <Dashboard 
            activeSection={activeTab} 
            onSectionChange={handleTabChange}
            onAppointmentClick={handleShowAppointmentDetails}
          />
        );
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
    // Reset appointment details view when changing tabs
    if (showAppointmentDetails) {
      setShowAppointmentDetails(false);
      setSelectedAppointmentId(undefined);
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={styles.App} style={getCSSVariablesAsStyle()}>
        <Login />
      </div>
    );
  }

  // Show main application if authenticated
  return (
    <div className={styles.App} style={getCSSVariablesAsStyle()}>
      <div className={styles.appContainer}>
        <TopNav />
        <div className={styles.appLayout}>
          <LeftPane 
            activeSection={activeTab}
            onSectionChange={handleTabChange}
          />
          <main className={styles.mainContent}>
            {renderContent()}
          </main>
        </div>

        {/* Modals */}
        <NotesModal
          isOpen={showNotesModal}
          onClose={handleCloseNotesModal}
          onSave={handleSaveNotes}
        />
        <RescheduleModal
          isOpen={showRescheduleModal}
          onClose={handleCloseRescheduleModal}
          onConfirm={handleConfirmReschedule}
        />

        {/* Invoice Creation Prompt */}
        {showCreateInvoicePrompt && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Consultation Completed!</h2>
              <p>Would you like to create an invoice for this consultation?</p>
              <div className={styles.modalActions}>
                <button className={styles.primaryButton} onClick={handleCreateInvoice}>
                  Create Invoice
                </button>
                <button className={styles.secondaryButton} onClick={handleSkipInvoice}>
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Root App component wrapped with AuthProvider
 */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
