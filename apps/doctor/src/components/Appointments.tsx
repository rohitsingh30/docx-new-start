import React, { useState, useMemo, useCallback } from 'react';
import styles from '../styles/Appointments.module.css';
import { AppointmentsProps, AppointmentListItem } from '../types/Appointments.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { AppointmentStatus, AppointmentFilterTab, AppointmentSortType } from '../types/enums';
import { getStatusClassName, getStatusLabel } from '../utils/statusUtils';
import { TabList } from './shared';
import { useAppointmentsData } from '../hooks/useAppointmentsData';

const Appointments: React.FC<AppointmentsProps> = ({
  onAppointmentClick,
  onNewAppointment,
  onEditAppointment,
  onCancelAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<AppointmentFilterTab>(AppointmentFilterTab.ALL);
  const [filterType, setFilterType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<AppointmentSortType>(AppointmentSortType.TIME);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const { data: appointmentsData } = useAppointmentsData();
  const appointments: AppointmentListItem[] = useMemo(() => {
    return appointmentsData || [];
  }, [appointmentsData]);

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

  const handleSortChange = useCallback((sortValue: AppointmentSortType) => {
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
      case AppointmentFilterTab.TODAY:
        // For demo, showing all as "today"
        filtered = appointments;
        break;
      case AppointmentFilterTab.UPCOMING:
        filtered = appointments.filter(a => a.status === AppointmentStatus.SCHEDULED);
        break;
      case AppointmentFilterTab.COMPLETED:
        filtered = appointments.filter(a => a.status === AppointmentStatus.COMPLETED);
        break;
      case AppointmentFilterTab.CANCELLED:
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
      case AppointmentSortType.PATIENT_NAME:
        filtered.sort((a, b) => a.patientName.localeCompare(b.patientName));
        break;
      case AppointmentSortType.STATUS:
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      case AppointmentSortType.TYPE:
        filtered.sort((a, b) => a.type.localeCompare(b.type));
        break;
      case AppointmentSortType.TIME:
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
      <div className={styles.tabsContainer}>
        <div className={styles.tabsRow}>
          <TabList 
            tabs={[
              { id: AppointmentFilterTab.ALL, icon: 'list_alt', label: STRING_CONSTANTS.TABS.ALL_APPOINTMENTS, count: counts.all },
              { id: AppointmentFilterTab.TODAY, icon: 'today', label: STRING_CONSTANTS.TABS.TODAY, count: counts.today },
              { id: AppointmentFilterTab.UPCOMING, icon: 'event', label: STRING_CONSTANTS.TABS.UPCOMING, count: counts.upcoming },
              { id: AppointmentFilterTab.COMPLETED, icon: 'check_circle', label: STRING_CONSTANTS.TABS.COMPLETED, count: counts.completed },
              { id: AppointmentFilterTab.CANCELLED, icon: 'cancel', label: STRING_CONSTANTS.TABS.CANCELLED, count: counts.cancelled },
            ]}
            activeTab={activeTab}
            onTabChange={(tab) => handleTabChange(tab as AppointmentFilterTab)}
            styles={styles}
            containerClass={styles.tabsWrapper}
            activeClass={styles.tabActive}
          />
          <div className={styles.tabControls}>
            <div className={styles.filterGroup}>
              <span className={`${styles.materialIcon} ${styles.controlIcon}`}>filter_list</span>
              <select
                className={styles.select}
                value={filterType}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                <option value="all">{STRING_CONSTANTS.OPTIONS.ALL_TYPES}</option>
                <option value="general">{STRING_CONSTANTS.OPTIONS.GENERAL_CHECKUP}</option>
                <option value="followup">{STRING_CONSTANTS.OPTIONS.FOLLOW_UP}</option>
                <option value="consultation">{STRING_CONSTANTS.OPTIONS.CONSULTATION}</option>
                <option value="physical">{STRING_CONSTANTS.OPTIONS.PHYSICAL_EXAM}</option>
                <option value="lab">{STRING_CONSTANTS.OPTIONS.LAB_REVIEW}</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
            <span className={`${styles.materialIcon} ${styles.controlIcon}`}>sort</span>
            <select
              className={styles.select}
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as AppointmentSortType)}
            >
              <option value={AppointmentSortType.TIME}>{STRING_CONSTANTS.OPTIONS.SORT_BY_TIME}</option>
              <option value={AppointmentSortType.PATIENT_NAME}>{STRING_CONSTANTS.OPTIONS.SORT_BY_PATIENT_NAME}</option>
              <option value={AppointmentSortType.STATUS}>{STRING_CONSTANTS.OPTIONS.SORT_BY_STATUS}</option>
              <option value={AppointmentSortType.TYPE}>{STRING_CONSTANTS.OPTIONS.SORT_BY_TYPE}</option>
            </select>
          </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className={styles.appointmentsList}>
        {filteredAppointments.length === 0 ? (
          <div className={styles.emptyState}>
            {STRING_CONSTANTS.EMPTY_APPOINTMENTS.NO_APPOINTMENTS_FOUND}
          </div>
        ) : (
          paginatedAppointments.map((appointment) => {
            const cardClassName = appointment.status === AppointmentStatus.CANCELLED 
              ? `${styles.appointmentCard} ${styles.appointmentCardCancelled}` 
              : styles.appointmentCard;
            const badgeClassName = `${styles.statusBadge} ${getStatusClassName(appointment.status, styles)}`;
            
            return (
          <div
            key={appointment.id}
            className={cardClassName}
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
              <span className={badgeClassName}>
                {getStatusLabel(appointment.status)}
              </span>
              <div className={styles.appointmentActions}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleAppointmentClick(appointment.id)}
                  type="button"
                  style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                >
                  {STRING_CONSTANTS.BUTTONS.VIEW}
                </button>
              </div>
            </div>
          </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {filteredAppointments.length > itemsPerPage && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            {STRING_CONSTANTS.PAGINATION.SHOWING} <span className={styles.paginationHighlight}>{startIndex + 1}-{Math.min(endIndex, filteredAppointments.length)}</span> {STRING_CONSTANTS.PAGINATION.OF}{' '}
            <span className={styles.paginationHighlight}>{filteredAppointments.length}</span> {STRING_CONSTANTS.PAGINATION.APPOINTMENTS}
          </div>
          <div className={styles.paginationControls}>
            <button 
              className={styles.paginationButton} 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <span className={styles.materialIcon}>chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const pageButtonClassName = currentPage === page 
                ? `${styles.paginationButton} ${styles.paginationButtonActive}` 
                : styles.paginationButton;
              return (
              <button
                key={page}
                className={pageButtonClassName}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
              );
            })}
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
