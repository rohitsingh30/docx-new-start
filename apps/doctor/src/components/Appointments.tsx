import React, { useState, useMemo, useCallback } from 'react';
import styles from '../styles/Appointments.module.css';
import { AppointmentsProps, AppointmentListItem, AppointmentFilterTab } from '../types/Appointments.types';
import { MOCK_DATA } from '../constants/dataConstants';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { AppointmentStatus } from '../types/enums';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';

const Appointments: React.FC<AppointmentsProps> = ({
  onAppointmentClick,
  onNewAppointment,
  onEditAppointment,
  onCancelAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<AppointmentFilterTab>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('time');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Get appointments from mock data
  const appointments: AppointmentListItem[] = MOCK_DATA.APPOINTMENTS.map(apt => ({
    ...apt,
    room: `Room ${200 + parseInt(apt.id)}`,
  }));

  const handleAppointmentClick = useCallback((appointmentId: string) => {
    if (onAppointmentClick) {
      onAppointmentClick(appointmentId);
    }
  }, [onAppointmentClick]);

  const handleNewAppointment = useCallback(() => {
    if (onNewAppointment) {
      onNewAppointment();
    }
  }, [onNewAppointment]);

  const handleMoreOptions = useCallback((appointmentId: string, e?: React.MouseEvent) => {
    // Add your more options logic here
  }, []);

  const handleTabChange = useCallback((tab: AppointmentFilterTab) => {
    setActiveTab(tab);
  }, []);

  const handleFilterChange = useCallback((filterValue: string) => {
    setFilterType(filterValue);
  }, []);

  const handleSortChange = useCallback((sortValue: string) => {
    setSortBy(sortValue);
  }, []);

  const handleViewModeChange = useCallback((mode: 'list' | 'grid') => {
    setViewMode(mode);
  }, []);

  const counts = useMemo(() => {
    return {
      all: appointments.length,
      today: appointments.length,
      upcoming: appointments.filter(a => a.status === AppointmentStatus.SCHEDULED).length,
      completed: appointments.filter(a => a.status === AppointmentStatus.COMPLETED).length,
      cancelled: appointments.filter(a => a.status === AppointmentStatus.CANCELLED).length,
    };
  }, [appointments]);

  // Filter appointments based on active tab
  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Filter by tab
    switch (activeTab) {
      case 'today':
        // For demo, showing all as "today"
        filtered = appointments;
        break;
      case 'upcoming':
        filtered = appointments.filter(a => a.status === AppointmentStatus.SCHEDULED);
        break;
      case 'completed':
        filtered = appointments.filter(a => a.status === AppointmentStatus.COMPLETED);
        break;
      case 'cancelled':
        filtered = appointments.filter(a => a.status === AppointmentStatus.CANCELLED);
        break;
      default:
        filtered = appointments;
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(a => {
        const type = a.type.toLowerCase().replace(/[^a-z]/g, '');
        return type.includes(filterType.replace(/[^a-z]/g, ''));
      });
    }

    // Sort
    switch (sortBy) {
      case 'patientName':
        filtered.sort((a, b) => a.patientName.localeCompare(b.patientName));
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case 'type':
        filtered.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case 'time':
      default:
        // Already sorted by time in mock data
        break;
    }

    return filtered;
  }, [appointments, activeTab, filterType, sortBy]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENTS}</h1>
          <p className={styles.pageSubtitle}>Manage and track all your appointments</p>
        </div>
        <button 
          className={styles.newButton} 
          onClick={handleNewAppointment}
          type="button"
          style={{ cursor: 'pointer', zIndex: 10 }}
        >
          <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>add</span>
          <span>{STRING_CONSTANTS.BUTTONS.NEW_APPOINTMENT}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterTab} ${activeTab === 'all' ? styles.filterTabActive : ''}`}
          onClick={() => handleTabChange('all')}
        >
          All Appointments
          <span className={styles.tabCount}>{counts.all}</span>
        </button>
        <button
          className={`${styles.filterTab} ${activeTab === 'today' ? styles.filterTabActive : ''}`}
          onClick={() => handleTabChange('today')}
        >
          Today
          <span className={styles.tabCount}>{counts.today}</span>
        </button>
        <button
          className={`${styles.filterTab} ${activeTab === 'upcoming' ? styles.filterTabActive : ''}`}
          onClick={() => handleTabChange('upcoming')}
        >
          Upcoming
          <span className={styles.tabCount}>{counts.upcoming}</span>
        </button>
        <button
          className={`${styles.filterTab} ${activeTab === 'completed' ? styles.filterTabActive : ''}`}
          onClick={() => handleTabChange('completed')}
        >
          Completed
          <span className={styles.tabCount}>{counts.completed}</span>
        </button>
        <button
          className={`${styles.filterTab} ${activeTab === 'cancelled' ? styles.filterTabActive : ''}`}
          onClick={() => handleTabChange('cancelled')}
        >
          Cancelled
          <span className={styles.tabCount}>{counts.cancelled}</span>
        </button>
      </div>

      {/* Filter and Sort Controls */}
      <div className={styles.controls}>
        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <span className={`${styles.materialIcon} ${styles.controlIcon}`}>filter_list</span>
            <select
              className={styles.select}
              value={filterType}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="general">General Checkup</option>
              <option value="followup">Follow-up</option>
              <option value="consultation">Consultation</option>
              <option value="physical">Physical Exam</option>
              <option value="lab">Lab Review</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <span className={`${styles.materialIcon} ${styles.controlIcon}`}>sort</span>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="time">Sort by Time</option>
              <option value="patientName">Sort by Patient Name</option>
              <option value="status">Sort by Status</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
        </div>
        <div className={styles.viewControls}>
          <button
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.viewButtonActive : ''}`}
            onClick={() => handleViewModeChange('list')}
          >
            <span className={styles.materialIcon}>view_list</span>
          </button>
          <button
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : ''}`}
            onClick={() => handleViewModeChange('grid')}
          >
            <span className={styles.materialIcon}>view_module</span>
          </button>
        </div>
      </div>

      {/* Appointments List */}
      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#718096',
            fontSize: '1.125rem' 
          }}>
            No appointments found matching the current filters.
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className={`${styles.appointmentCard} ${
              appointment.status === AppointmentStatus.CANCELLED ? styles.appointmentCardCancelled : ''
            }`}
          >
            <div className={styles.appointmentContent}>
              <div className={styles.patientInfo}>
                <div
                  className={styles.avatar}
                  style={{ backgroundImage: `url(${appointment.avatar})` }}
                />
                <div className={styles.patientDetails}>
                  <div className={styles.patientHeader}>
                    <h3 className={styles.patientName}>{appointment.patientName}</h3>
                    <span className={`${styles.statusBadge} ${getStatusClassName(appointment.status, styles)}`}>
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                  <div className={styles.appointmentInfo}>
                    <span className={styles.infoItem}>
                      <span className={`${styles.materialIcon} ${styles.infoIcon}`}>schedule</span>
                      {appointment.time}
                    </span>
                    <span className={styles.infoItem}>
                      <span className={`${styles.materialIcon} ${styles.infoIcon}`}>category</span>
                      {appointment.type}
                    </span>
                    <span className={styles.infoItem}>
                      <span className={`${styles.materialIcon} ${styles.infoIcon}`}>timer</span>
                      {appointment.duration}
                    </span>
                    {appointment.room && (
                      <span className={styles.infoItem}>
                        <span className={`${styles.materialIcon} ${styles.infoIcon}`}>meeting_room</span>
                        {appointment.room}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.appointmentActions}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleAppointmentClick(appointment.id)}
                  type="button"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  View Details
                </button>
                <button 
                  className={styles.moreButton}
                  onClick={(e) => handleMoreOptions(appointment.id, e)}
                  type="button"
                  aria-label="More options"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  <span className={styles.materialIcon}>more_vert</span>
                </button>
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.paginationInfo}>
          Showing <span className={styles.paginationHighlight}>1-{Math.min(8, filteredAppointments.length)}</span> of{' '}
          <span className={styles.paginationHighlight}>{filteredAppointments.length}</span> appointments
        </div>
        <div className={styles.paginationControls}>
          <button className={styles.paginationButton} disabled>
            <span className={styles.materialIcon}>chevron_left</span>
          </button>
          <button className={`${styles.paginationButton} ${styles.paginationButtonActive}`}>1</button>
          <button className={styles.paginationButton}>2</button>
          <button className={styles.paginationButton}>3</button>
          <button className={styles.paginationButton}>
            <span className={styles.materialIcon}>chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
