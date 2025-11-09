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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

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

  const handleTabChange = useCallback((tab: AppointmentFilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback((filterValue: string) => {
    setFilterType(filterValue);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sortValue: string) => {
    setSortBy(sortValue);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, endIndex);

  return (
    <main className={styles.main}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>{STRING_CONSTANTS.LABELS.APPOINTMENTS}</h1>
        </div>
        <button 
          className={styles.newButton} 
          onClick={handleNewAppointment}
          type="button"
        >
          <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>add</span>
          <span>{STRING_CONSTANTS.BUTTONS.NEW_APPOINTMENT}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className={styles.tabContainer}>
        <div className={styles.tabsWrapper}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('all')}
            type="button"
          >
            <span className={`${styles.materialIcon} ${styles.tabIcon}`}>list_alt</span>
            All Appointments
            <span className={styles.tabCount}>{counts.all}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'today' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('today')}
            type="button"
          >
            <span className={`${styles.materialIcon} ${styles.tabIcon}`}>today</span>
            Today
            <span className={styles.tabCount}>{counts.today}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'upcoming' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('upcoming')}
            type="button"
          >
            <span className={`${styles.materialIcon} ${styles.tabIcon}`}>event</span>
            Upcoming
            <span className={styles.tabCount}>{counts.upcoming}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'completed' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('completed')}
            type="button"
          >
            <span className={`${styles.materialIcon} ${styles.tabIcon}`}>check_circle</span>
            Completed
            <span className={styles.tabCount}>{counts.completed}</span>
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'cancelled' ? styles.tabActive : ''}`}
            onClick={() => handleTabChange('cancelled')}
            type="button"
          >
            <span className={`${styles.materialIcon} ${styles.tabIcon}`}>cancel</span>
            Cancelled
            <span className={styles.tabCount}>{counts.cancelled}</span>
          </button>
        </div>
        <div className={styles.tabControls}>
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
      </div>

      {/* Appointments List */}
      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div className={styles.emptyState}>
            No appointments found matching the current filters.
          </div>
        ) : (
          paginatedAppointments.map((appointment) => (
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
                <h3 className={styles.patientName}>{appointment.patientName}</h3>
              </div>
              <div className={styles.appointmentInfo}>
                <span className={styles.infoTag}>{appointment.date}</span>
                <span className={styles.infoTag}>{appointment.time}</span>
                <span className={styles.infoTag}>{appointment.type}</span>
              </div>
              <span className={`${styles.statusBadge} ${getStatusClassName(appointment.status, styles)}`}>
                {getStatusLabel(appointment.status)}
              </span>
              <div className={styles.appointmentActions}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleAppointmentClick(appointment.id)}
                  type="button"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )))}
      </div>

      {/* Pagination */}
      {filteredAppointments.length > itemsPerPage && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing <span className={styles.paginationHighlight}>{startIndex + 1}-{Math.min(endIndex, filteredAppointments.length)}</span> of{' '}
            <span className={styles.paginationHighlight}>{filteredAppointments.length}</span> appointments
          </div>
          <div className={styles.paginationControls}>
            <button 
              className={styles.paginationButton} 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className={styles.materialIcon}>chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className={styles.paginationButton}
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <span className={styles.materialIcon}>chevron_right</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Appointments;
