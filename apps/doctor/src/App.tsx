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
import ActionModal from './modals/ActionModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { APP_CONFIG } from './constants/dataConstants';
import { getCSSVariablesAsStyle } from './utils/cssUtils';
import { TabType } from './types/Dashboard.types';
import { ConsultationReport } from './types/Consultation.types';
import { ActionModalState } from './types/ActionModal.types';
import { STRING_CONSTANTS } from './constants/stringConstants';

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
  const [invoiceCreateMode, setInvoiceCreateMode] = useState(false);
  // Removed showCreateInvoicePrompt
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);
  const [selectedPatientId, setSelectedPatientId] = useState<string | undefined>(undefined);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [completedConsultationData, setCompletedConsultationData] = useState<ConsultationReport | null>(null);
  const [actionModal, setActionModal] = useState<ActionModalState | null>(null);
  const { isAuthenticated } = useAuth();

  const openActionModal = (title: string, message: string, detail?: string) => {
    setActionModal({ title, message, detail });
  };

  const closeActionModal = () => {
    setActionModal(null);
  };

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

  const handleAddMedicalNote = () => {
    setShowNotesModal(true);
  };

  const handleViewAllPatients = () => {
    setActiveTab('patients');
  };

  const handleNotifications = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.NOTIFICATIONS,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleMessages = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.MESSAGES,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleProfile = () => {
    setActiveTab('settings');
  };

  const handleSearch = (query: string) => {
    if (!query) {
      openActionModal(
        STRING_CONSTANTS.LABELS.SEARCH_RESULTS,
        STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
      );
      return;
    }

    openActionModal(
      STRING_CONSTANTS.LABELS.SEARCH_RESULTS,
      STRING_CONSTANTS.MESSAGES.SEARCH_RESULTS_FOR,
      query
    );
  };

  const handleNewAppointment = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.NEW_APPOINTMENT,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleScheduleAppointment = () => {
    setActiveTab('appointments');
    openActionModal(
      STRING_CONSTANTS.LABELS.NEW_APPOINTMENT,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleEditPatient = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.PATIENT_DETAILS,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleViewRecords = () => {
    setActiveTab('patients');
  };

  const handleCreatePrescription = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.PRESCRIPTION,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleOrderLabTests = () => {
    openActionModal(
      STRING_CONSTANTS.LABELS.LAB_TESTS,
      STRING_CONSTANTS.MESSAGES.FEATURE_COMING_SOON
    );
  };

  const handleSaveNotes = (notes: string) => {
    console.log('Saving notes:', notes);
    openActionModal(
      STRING_CONSTANTS.BUTTONS.SAVE_NOTES,
      STRING_CONSTANTS.MESSAGES.SUCCESS_SAVE
    );
    setShowNotesModal(false);
  };

  const handleCloseNotesModal = () => {
    setShowNotesModal(false);
  };

  const handleCloseRescheduleModal = () => {
    setShowRescheduleModal(false);
  };

  const handleConfirmReschedule = (newDate: string, newTime: string) => {
    console.log('Rescheduling to:', newDate, newTime);
    // In a real app, send to API
    openActionModal(
      STRING_CONSTANTS.BUTTONS.RESCHEDULE,
      STRING_CONSTANTS.MESSAGES.SUCCESS_SAVE,
      `${newDate} ${STRING_CONSTANTS.LABELS.AT} ${newTime}`
    );
    setShowRescheduleModal(false);
  };

  const handleCompleteConsultation = (report: ConsultationReport) => {
    console.log('Consultation completed:', report);
    setCompletedConsultationData(report);
    setShowConsultation(false);
    setShowAppointmentReport(true);
  };

  const handleCreateInvoice = () => {
    setShowAppointmentReport(false);
    setInvoiceCreateMode(true);
    setShowInvoice(true);
    // In real app, pre-populate invoice with consultation data
  };

  const handleSkipInvoice = () => {
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
          onCreateInvoice={handleCreateInvoice}
        />
      );
    }

    if (showInvoice) {
      return (
        <Invoice
          createMode={invoiceCreateMode}
          onBack={() => {
            setShowInvoice(false);
            setInvoiceCreateMode(false);
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
          onScheduleAppointment={handleScheduleAppointment}
          onEditPatient={handleEditPatient}
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
          onViewRecords={handleViewRecords}
          onCreatePrescription={handleCreatePrescription}
          onOrderLabTests={handleOrderLabTests}
          onSaveNotes={handleSaveNotes}
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
            onNewAppointment={handleNewAppointment}
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
            onAddMedicalNote={handleAddMedicalNote}
            onViewAllPatients={handleViewAllPatients}
          />
        );
    }
  };

  const handleTabChange = (tab: string) => {
    console.log('App handleTabChange called with:', tab, 'showConsultation:', showConsultation);
    setActiveTab(tab as TabType);
    // Reset all detail views when changing tabs
    if (showAppointmentDetails) {
      setShowAppointmentDetails(false);
      setSelectedAppointmentId(undefined);
    }
    if (showPatientDetails) {
      setShowPatientDetails(false);
      setSelectedPatientId(undefined);
    }
    if (showConsultation) {
      setShowConsultation(false);
    }
    if (showAppointmentReport) {
      setShowAppointmentReport(false);
    }
    if (showInvoice) {
      setShowInvoice(false);
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
        <TopNav 
          onNotifications={handleNotifications}
          onMessages={handleMessages}
          onProfile={handleProfile}
          onSearch={handleSearch}
        />
        <div className={styles.appLayout}>
          <LeftPane 
            activeSection={activeTab}
            onSectionChange={handleTabChange}
          />
          <main className={styles.mainContent}>
            <div className={styles.pageShell}>
              <div className={styles.pageContent}>
                {renderContent()}
              </div>
            </div>
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

        <ActionModal
          isOpen={Boolean(actionModal)}
          onClose={closeActionModal}
          title={actionModal?.title || STRING_CONSTANTS.MESSAGES.LOADING}
          message={actionModal?.message || STRING_CONSTANTS.MESSAGES.LOADING}
          detail={actionModal?.detail}
        />
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
