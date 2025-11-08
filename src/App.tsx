import React, { useState } from 'react';
import styles from './styles/App.module.css';
import Dashboard from './components/Dashboard';
import PatientRecords from './components/PatientRecords';
import DoctorRecords from './components/DoctorRecords';
import LeftPane from './components/LeftPane';
import { COMPONENT_CONSTANTS } from './constants/componentConstants';
import { getCSSVariablesAsStyle } from './utils/cssUtils';
import { TabType } from './types/Dashboard.types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(COMPONENT_CONSTANTS.NAVIGATION.DEFAULT_TAB);

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

  return (
    <div className={styles.App} style={getCSSVariablesAsStyle()}>
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
  );
};

export default App;
