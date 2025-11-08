import React, { useState } from 'react';
import styles from './styles/App.module.css';
import Dashboard from './components/Dashboard';
import PatientRecords from './components/PatientRecords';
import DoctorRecords from './components/DoctorRecords';
import LeftPane from './components/LeftPane';
import TopNav from './components/TopNav';
import Login from './components/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { COMPONENT_CONSTANTS } from './constants/componentConstants';
import { getCSSVariablesAsStyle } from './utils/cssUtils';
import { TabType } from './types/Dashboard.types';

/**
 * Main application component with authentication
 */
const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(COMPONENT_CONSTANTS.NAVIGATION.DEFAULT_TAB);
  const { isAuthenticated } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientRecords />;
      case 'doctors':
        return <DoctorRecords />;
      case 'dashboard':
      default:
        return <Dashboard activeSection={activeTab} onSectionChange={handleTabChange} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as TabType);
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
