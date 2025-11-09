import React, { useState } from 'react';
import styles from '../styles/Consultation.module.css';
import { ConsultationProps, VitalsData, Medication } from '../types/Consultation.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';

const COMMON_SYMPTOMS = ['Fever', 'Cough', 'Headache', 'Fatigue', 'Nausea', 'Chest Pain'];
const COMMON_TESTS = ['CBC', 'Blood Sugar', 'Lipid Profile', 'ECG', 'X-Ray', 'Urine Test'];
const COMMON_MEDICINES = ['Paracetamol', 'Ibuprofen', 'Amoxicillin', 'Azithromycin', 'Omeprazole', 'Metformin'];

const Consultation: React.FC<ConsultationProps> = ({
  appointmentId,
  patientName,
  patientAge,
  patientGender,
  appointmentType,
  onComplete,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'medical-history' | 'symptoms' | 'treatment' | 'followup'>('medical-history');
  
  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: '72 bpm',
    bloodPressure: '120/80 mmHg',
    temperature: '98.6°F',
    weight: '70 kg',
    respiratoryRate: '16 /min',
    oxygenSaturation: '98%',
  });

  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);
  const [labTests, setLabTests] = useState<string[]>([]);
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showMedicationForm, setShowMedicationForm] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Medication | null>(null);
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<{[key: string]: boolean}>({
    vitals: false,
    previousConditions: false,
    currentMedications: false,
    previousAppointments: false,
    allergies: false,
    familyHistory: false,
    surgicalHistory: false,
    socialHistory: false,
  });

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleVitalChange = (field: keyof VitalsData, value: string) => {
    setVitals(prev => ({ ...prev, [field]: value }));
  };

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const addLabTest = (test: string) => {
    if (!labTests.includes(test)) {
      setLabTests([...labTests, test]);
    }
  };

  const removeLabTest = (test: string) => {
    setLabTests(labTests.filter(t => t !== test));
  };

  const addMedication = () => {
    const newMed: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      timing: '',
      duration: '',
    };
    setCurrentMedication(newMed);
    setShowMedicationForm(true);
  };

  const removeMedication = (id: string) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const editMedication = (med: Medication) => {
    setCurrentMedication(med);
    setShowMedicationForm(true);
  };

  const saveMedication = () => {
    if (currentMedication && currentMedication.name) {
      const existingIndex = medications.findIndex(m => m.id === currentMedication.id);
      if (existingIndex >= 0) {
        const updatedMeds = [...medications];
        updatedMeds[existingIndex] = currentMedication;
        setMedications(updatedMeds);
      } else {
        setMedications([...medications, currentMedication]);
      }
      setShowMedicationForm(false);
      setCurrentMedication(null);
    }
  };

  const cancelMedication = () => {
    setShowMedicationForm(false);
    setCurrentMedication(null);
  };

  const updateMedicationField = (field: keyof Medication, value: string) => {
    if (currentMedication) {
      setCurrentMedication({ ...currentMedication, [field]: value });
    }
  };

  const handleComplete = () => {
    if (window.confirm('Are you sure you want to complete this consultation? This will generate the final report.')) {
      onComplete({
        vitals,
        chiefComplaint,
        symptoms,
        diagnosis,
        medications,
        labTests,
        followUpDate,
        notes,
      });
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      onCancel();
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <button className={styles.backButton} onClick={handleCancel}>
            <span className={`${styles.materialIcon} ${styles.backIcon}`}>arrow_back</span>
          </button>
          <div className={styles.headerInfo}>
            <h1 className={styles.headerTitle}>{STRING_CONSTANTS.LABELS.CONSULTATION_SESSION}</h1>
            <p className={styles.headerSubtitle}>
              {patientName} • {patientAge}y, {patientGender} • {appointmentType}
            </p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.completeButton} onClick={handleComplete}>
            <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>check_circle</span>
            {STRING_CONSTANTS.LABELS.COMPLETE_CONSULTATION}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tab} ${activeTab === 'medical-history' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('medical-history')}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>medical_information</span>
          Medical History
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'symptoms' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('symptoms')}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>symptoms</span>
          {STRING_CONSTANTS.LABELS.TAB_SYMPTOMS_DIAGNOSIS}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'treatment' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('treatment')}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>medication</span>
          {STRING_CONSTANTS.LABELS.TAB_TREATMENT_PLAN}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'followup' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('followup')}
        >
          <span className={`${styles.materialIcon} ${styles.tabIcon}`}>event</span>
          {STRING_CONSTANTS.LABELS.TAB_FOLLOW_UP}
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Medical History Tab */}
        {activeTab === 'medical-history' && (
        <div className={styles.singleColumn}>
            {/* History Cards Grid */}
            <div className={styles.historyCardsGrid}>
              {/* Allergies */}
              <div className={styles.card}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>warning</span>
                    <h3 className={styles.statCardTitle}>Known Allergies</h3>
                  </div>
                </div>
                <div className={styles.statCardContent}>
                  <div className={styles.statCardItem}>Penicillin (Rash)</div>
                  <div className={styles.statCardItem}>Pollen (Seasonal)</div>
                </div>
              </div>

              {/* Family History */}
              <div className={styles.card}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>family_restroom</span>
                    <h3 className={styles.statCardTitle}>Family History</h3>
                  </div>
                </div>
                <div className={styles.statCardContent}>
                  <div className={styles.statCardItem}>Father: Heart Disease</div>
                  <div className={styles.statCardItem}>Mother: Diabetes</div>
                </div>
              </div>

              {/* Surgical History */}
              <div className={styles.card}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>surgical</span>
                    <h3 className={styles.statCardTitle}>Past Surgeries</h3>
                  </div>
                </div>
                <div className={styles.statCardContent}>
                  <div className={styles.statCardItem}>Appendectomy (2015)</div>
                </div>
              </div>

              {/* Social History */}
              <div className={styles.card}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>groups</span>
                    <h3 className={styles.statCardTitle}>Lifestyle & Habits</h3>
                  </div>
                </div>
                <div className={styles.statCardContent}>
                  <div className={styles.statCardItem}>Non-smoker</div>
                  <div className={styles.statCardItem}>Occasional alcohol use</div>
                  <div className={styles.statCardItem}>Regular exercise (3x/week)</div>
                </div>
              </div>

              {/* Previous Conditions */}
              <div className={styles.card}>
                <div className={styles.statCard}>
                  <div className={styles.statCardHeader}>
                    <span className={`${styles.materialIcon} ${styles.statCardIcon}`}>medical_information</span>
                    <h3 className={styles.statCardTitle}>Previous Conditions</h3>
                  </div>
                </div>
                <div className={styles.statCardContent}>
                  <div className={styles.statCardItem}>Hypertension (Diagnosed 2020)</div>
                  <div className={styles.statCardItem}>Type 2 Diabetes (Diagnosed 2018)</div>
                  <div className={styles.statCardItem}>Seasonal Allergies</div>
                </div>
              </div>
            </div>

            {/* Vitals Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.RECENT_VITALS}</h2>
                <button 
                  className={styles.editButton}
                  onClick={() => setIsEditingVitals(!isEditingVitals)}
                >
                  <span className={styles.materialIcon}>
                    {isEditingVitals ? 'check' : 'edit'}
                  </span>
                  {isEditingVitals ? 'Save' : 'Edit'}
                </button>
              </div>
              
              {/* Compact row display */}
              {!isEditingVitals && (
                <div className={styles.vitalsRow}>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.HEART_RATE}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>favorite</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>HR</span>
                      <span className={styles.vitalValueCompact}>{vitals.heartRate || '—'}</span>
                    </div>
                  </div>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>monitor_heart</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>BP</span>
                      <span className={styles.vitalValueCompact}>{vitals.bloodPressure || '—'}</span>
                    </div>
                  </div>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.TEMPERATURE}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>thermostat</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>Temp</span>
                      <span className={styles.vitalValueCompact}>{vitals.temperature || '—'}</span>
                    </div>
                  </div>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.WEIGHT}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>scale</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>Weight</span>
                      <span className={styles.vitalValueCompact}>{vitals.weight || '—'}</span>
                    </div>
                  </div>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.RESPIRATORY_RATE}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>air</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>RR</span>
                      <span className={styles.vitalValueCompact}>{vitals.respiratoryRate || '—'}</span>
                    </div>
                  </div>
                  <div className={styles.vitalItemCompact} title={STRING_CONSTANTS.LABELS.OXYGEN_SATURATION}>
                    <span className={`${styles.materialIcon} ${styles.vitalIconCompact}`}>bloodtype</span>
                    <div className={styles.vitalInfoCompact}>
                      <span className={styles.vitalLabelCompact}>SpO₂</span>
                      <span className={styles.vitalValueCompact}>{vitals.oxygenSaturation || '—'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Expanded edit form */}
              {isEditingVitals && (
                <div className={styles.vitalsGrid}>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>favorite</span>
                      {STRING_CONSTANTS.LABELS.HEART_RATE}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.heartRate}
                      onChange={(e) => handleVitalChange('heartRate', e.target.value)}
                      placeholder="e.g., 72 bpm"
                    />
                  </div>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>monitor_heart</span>
                      {STRING_CONSTANTS.LABELS.BLOOD_PRESSURE}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.bloodPressure}
                      onChange={(e) => handleVitalChange('bloodPressure', e.target.value)}
                      placeholder="e.g., 120/80 mmHg"
                    />
                  </div>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>thermostat</span>
                      {STRING_CONSTANTS.LABELS.TEMPERATURE}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.temperature}
                      onChange={(e) => handleVitalChange('temperature', e.target.value)}
                      placeholder="e.g., 98.6°F"
                    />
                  </div>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>scale</span>
                      {STRING_CONSTANTS.LABELS.WEIGHT}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.weight}
                      onChange={(e) => handleVitalChange('weight', e.target.value)}
                      placeholder="e.g., 70 kg"
                    />
                  </div>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>air</span>
                      {STRING_CONSTANTS.LABELS.RESPIRATORY_RATE}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.respiratoryRate}
                      onChange={(e) => handleVitalChange('respiratoryRate', e.target.value)}
                      placeholder="e.g., 16 /min"
                    />
                  </div>
                  <div className={styles.vitalInput}>
                    <label className={styles.vitalLabel}>
                      <span className={`${styles.materialIcon} ${styles.vitalIcon}`}>bloodtype</span>
                      {STRING_CONSTANTS.LABELS.OXYGEN_SATURATION}
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={vitals.oxygenSaturation}
                      onChange={(e) => handleVitalChange('oxygenSaturation', e.target.value)}
                      placeholder="e.g., 98%"
                    />
                  </div>
                </div>
              )}
          </div>

          {/* Current Medications */}
          <div className={styles.card}>
            <button 
              className={styles.cardHeaderButton}
              onClick={() => toggleSection('currentMedications')}
            >
              <div className={styles.cardHeaderLeft}>
                <span className={`${styles.materialIcon} ${styles.historyIcon}`}>medication</span>
                <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}</h2>
              </div>
              <span className={styles.materialIcon}>
                {collapsedSections.currentMedications ? 'expand_more' : 'expand_less'}
              </span>
            </button>
            {!collapsedSections.currentMedications && (
              <div className={styles.cardContent}>
                <div className={styles.medicationsList}>
                  <div className={styles.medItem}>
                    <div className={styles.medItemContent}>
                      <div className={styles.medItemName}>Metformin 500mg</div>
                      <div className={styles.medItemDetails}>
                        500mg • Twice daily • After meals • 30 days
                      </div>
                    </div>
                  </div>
                  <div className={styles.medItem}>
                    <div className={styles.medItemContent}>
                      <div className={styles.medItemName}>Lisinopril 10mg</div>
                      <div className={styles.medItemDetails}>
                        10mg • Once daily • Morning • 30 days
                      </div>
                    </div>
                  </div>
                  <div className={styles.medItem}>
                    <div className={styles.medItemContent}>
                      <div className={styles.medItemName}>Aspirin 81mg</div>
                      <div className={styles.medItemDetails}>
                        81mg • Once daily • Morning • Ongoing
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Previous Appointments */}
          <div className={styles.card}>
            <button 
              className={styles.cardHeaderButton}
              onClick={() => toggleSection('previousAppointments')}
            >
              <div className={styles.cardHeaderLeft}>
                <span className={`${styles.materialIcon} ${styles.historyIcon}`}>event_note</span>
                <h2 className={styles.cardTitle}>Previous Appointments</h2>
              </div>
              <span className={styles.materialIcon}>
                {collapsedSections.previousAppointments ? 'expand_more' : 'expand_less'}
              </span>
            </button>
            {!collapsedSections.previousAppointments && (
              <div className={styles.cardContent}>
                <div className={styles.appointmentsList}>
                  <div className={styles.appointmentItem}>
                    <span className={styles.appointmentText}>Nov 1, 2024 - Routine Checkup</span>
                    <button className={styles.viewButton}>
                      <span className={styles.materialIcon}>visibility</span>
                      View
                    </button>
                  </div>
                  <div className={styles.appointmentItem}>
                    <span className={styles.appointmentText}>Oct 15, 2024 - Follow-up</span>
                    <button className={styles.viewButton}>
                      <span className={styles.materialIcon}>visibility</span>
                      View
                    </button>
                  </div>
                  <div className={styles.appointmentItem}>
                    <span className={styles.appointmentText}>Sep 20, 2024 - Blood Test Review</span>
                    <button className={styles.viewButton}>
                      <span className={styles.materialIcon}>visibility</span>
                      View
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {/* Symptoms & Diagnosis Tab */}
        {activeTab === 'symptoms' && (
        <div className={styles.singleColumn}>
            {/* Symptoms */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.SYMPTOMS}</h2>
                <button className={styles.addButton}>
                  <span className={`${styles.materialIcon} ${styles.addIcon}`}>add</span>
                  {STRING_CONSTANTS.LABELS.ADD_CUSTOM_SYMPTOM}
                </button>
              </div>
              
              <div className={styles.quickAddSection}>
                {COMMON_SYMPTOMS.map(symptom => (
                  <button
                    key={symptom}
                    className={styles.quickAddChip}
                    onClick={() => addSymptom(symptom)}
                  >
                    <span className={`${styles.materialIcon} ${styles.chipIcon}`}>add</span>
                    {symptom}
                  </button>
                ))}
              </div>

              <div className={styles.sectionSeparator}></div>

              {symptoms.length > 0 && (
                <div className={styles.tagsContainer}>
                  {symptoms.map(symptom => (
                    <div key={symptom} className={styles.tag}>
                      {symptom}
                      <button className={styles.tagRemove} onClick={() => removeSymptom(symptom)}>
                        <span className={styles.materialIcon}>close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chief Complaint */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT}</h2>
              </div>
              <textarea
                className={styles.textarea}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                placeholder="What brings the patient in today?"
                rows={3}
              />
            </div>

            {/* Diagnosis */}
            <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.DIAGNOSIS}</h2>
            </div>
            <textarea
              className={styles.textarea}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Clinical diagnosis..."
              rows={5}
            />
          </div>
        </div>
        )}

        {/* Treatment Plan Tab */}
        {activeTab === 'treatment' && (
        <div className={styles.singleColumn}>
          {/* Prescription */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.PRESCRIPTION}</h2>
              <button className={styles.addButton} onClick={addMedication}>
                <span className={`${styles.materialIcon} ${styles.addIcon}`}>add</span>
                {STRING_CONSTANTS.LABELS.ADD_MEDICATION}
              </button>
            </div>

            <div className={styles.quickAddScrollable}>
              {COMMON_MEDICINES.map(medicine => (
                <button key={medicine} className={styles.quickAddChip} onClick={addMedication}>
                  <span className={`${styles.materialIcon} ${styles.chipIcon}`}>add</span>
                  {medicine}
                </button>
              ))}
            </div>

            <div className={styles.sectionSeparator}></div>
            
            {showMedicationForm && currentMedication && (
              <div className={styles.medForm}>
                <div className={styles.medFormHeader}>
                  <h3 className={styles.medFormTitle}>Add Medication</h3>
                </div>
                <div className={styles.medFormGrid}>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>Medicine Name *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentMedication.name}
                      onChange={(e) => updateMedicationField('name', e.target.value)}
                      placeholder="e.g., Paracetamol"
                    />
                  </div>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>Dosage *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentMedication.dosage}
                      onChange={(e) => updateMedicationField('dosage', e.target.value)}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>Frequency *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentMedication.frequency}
                      onChange={(e) => updateMedicationField('frequency', e.target.value)}
                      placeholder="e.g., Twice daily"
                    />
                  </div>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>Timing</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentMedication.timing}
                      onChange={(e) => updateMedicationField('timing', e.target.value)}
                      placeholder="e.g., After meals"
                    />
                  </div>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>Duration *</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentMedication.duration}
                      onChange={(e) => updateMedicationField('duration', e.target.value)}
                      placeholder="e.g., 5 days"
                    />
                  </div>
                </div>
                <div className={styles.medFormActions}>
                  <button className={styles.medFormCancel} onClick={cancelMedication}>
                    Cancel
                  </button>
                  <button className={styles.medFormSave} onClick={saveMedication}>
                    Save Medication
                  </button>
                </div>
              </div>
            )}

            <div className={styles.prescriptionList}>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Metformin 500mg</div>
                  <div className={styles.medItemDetails}>
                    500mg • Twice daily • After meals • 30 days
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Lisinopril 10mg</div>
                  <div className={styles.medItemDetails}>
                    10mg • Once daily • Morning • 30 days
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Aspirin 81mg</div>
                  <div className={styles.medItemDetails}>
                    81mg • Once daily • After meals • 30 days
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
            </div>

            {medications.map(med => (
              <div key={med.id} className={styles.medItem}>
                <div className={styles.medItemContent} onClick={() => editMedication(med)}>
                  <div className={styles.medItemName}>{med.name || 'New Medication'}</div>
                  <div className={styles.medItemDetails}>
                    {med.dosage} • {med.frequency} • {med.timing} • {med.duration}
                  </div>
                </div>
                <button className={styles.medItemRemove} onClick={() => removeMedication(med.id)}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
            ))}
          </div>

          {/* Lab Tests */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.LAB_TESTS}</h2>
              <button className={styles.addButton}>
                <span className={`${styles.materialIcon} ${styles.addIcon}`}>add</span>
                {STRING_CONSTANTS.LABELS.ADD_CUSTOM_TEST}
              </button>
            </div>

            <div className={styles.quickAddScrollable}>
              {COMMON_TESTS.map(test => (
                <button
                  key={test}
                  className={styles.quickAddChip}
                  onClick={() => addLabTest(test)}
                >
                  <span className={`${styles.materialIcon} ${styles.chipIcon}`}>add</span>
                  {test}
                </button>
              ))}
            </div>

            <div className={styles.sectionSeparator}></div>

            <div className={styles.prescriptionList}>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Complete Blood Count (CBC)</div>
                  <div className={styles.medItemDetails}>
                    Fasting required • Sample: Blood • Priority: Routine
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Lipid Profile</div>
                  <div className={styles.medItemDetails}>
                    Fasting required • Sample: Blood • Priority: Routine
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>HbA1c</div>
                  <div className={styles.medItemDetails}>
                    No fasting • Sample: Blood • Priority: Routine
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
              <div className={styles.medItem}>
                <div className={styles.medItemContent}>
                  <div className={styles.medItemName}>Kidney Function Test</div>
                  <div className={styles.medItemDetails}>
                    Fasting preferred • Sample: Blood & Urine • Priority: Routine
                  </div>
                </div>
                <button className={styles.medItemEdit}>
                  <span className={styles.materialIcon}>edit</span>
                </button>
                <button className={styles.medItemRemove}>
                  <span className={styles.materialIcon}>delete</span>
                </button>
              </div>
            </div>

            {labTests.length > 0 && (
              <div className={styles.prescriptionList}>
                {labTests.map(test => (
                  <div key={test} className={styles.medItem}>
                    <div className={styles.medItemContent}>
                      <div className={styles.medItemName}>{test}</div>
                    </div>
                    <button className={styles.medItemEdit}>
                      <span className={styles.materialIcon}>edit</span>
                    </button>
                    <button className={styles.medItemRemove} onClick={() => removeLabTest(test)}>
                      <span className={styles.materialIcon}>delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* General Advice */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>General Advice</h2>
            </div>
            <textarea
              className={styles.textarea}
              placeholder="Enter general advice for the patient..."
              rows={5}
            />
          </div>
        </div>
        )}

        {/* Follow Up & Notes Tab */}
        {activeTab === 'followup' && (
        <div className={styles.singleColumn}>
          {/* Follow Up */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.FOLLOW_UP}</h2>
            </div>
            <div className={styles.sectionLabel}>Follow-up Date</div>
            <input
              type="date"
              className={styles.input}
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </div>

          {/* Consultation Notes */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{STRING_CONSTANTS.LABELS.CONSULTATION_NOTES}</h2>
            </div>
            <textarea
              className={styles.textarea}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes, observations, or recommendations..."
              rows={10}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Consultation;
