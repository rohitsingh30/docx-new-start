import React, { useState } from 'react';
import styles from './styles/App.module.css';
import Dashboard from './components/Dashboard';
import PatientRecords from './components/PatientRecords';
import AppointmentDetails from './components/AppointmentDetails';
import Appointments from './components/Appointments';
import LeftPane from './components/LeftPane';
import TopNav from './components/TopNav';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { APP_CONFIG } from './constants/dataConstants';
import { getCSSVariablesAsStyle } from './utils/cssUtils';
import { TabType } from './types/Dashboard.types';

/**
 * Main application component with authentication
 */
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(APP_CONFIG.DEFAULT_TAB);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | undefined>(undefined);
  const { isAuthenticated } = useAuth();

  const handleShowAppointmentDetails = (appointmentId?: string) => {
    setSelectedAppointmentId(appointmentId);
    setShowAppointmentDetails(true);
  };

  const handleBackFromAppointmentDetails = () => {
    setShowAppointmentDetails(false);
    setSelectedAppointmentId(undefined);
  };

  const renderContent = () => {
    if (showAppointmentDetails) {
      return (
        <AppointmentDetails 
          appointmentId={selectedAppointmentId}
          onBack={handleBackFromAppointmentDetails}
        />
      );
    }
    switch (activeTab) {
      case 'patients':
        return <PatientRecords />;
      case 'appointments':
        return (
          <Appointments 
            onAppointmentClick={handleShowAppointmentDetails}
          />
        );
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
