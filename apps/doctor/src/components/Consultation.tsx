import React, { useState } from 'react';
import styles from '../styles/Consultation.module.css';
import { ConsultationProps, VitalsData, Medication } from '../types/Consultation.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { MOCK_DATA } from '../constants/dataConstants';
import { ConsultationTab } from '../types/enums';
import { 
  PatientHistoryGrid, 
  VitalsSection, 
  TabList, 
  PageHeader,
  CollapsibleCardWithIcon,
  MedicationList,
  AppointmentList,
  CardWithHeaderAction,
  QuickAddList,
  TagList,
  TextAreaCard,
  InputFieldCard,
  EditableHeaderCard,
  SectionSeparator,
  MedicationForm,
  PrescriptionList,
  LabTestList
} from './shared';

const Consultation: React.FC<ConsultationProps> = ({
  appointmentId,
  patientName,
  patientAge,
  patientGender,
  appointmentType,
  onComplete,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<ConsultationTab>(ConsultationTab.SYMPTOMS);
  
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
  const [showLabTestForm, setShowLabTestForm] = useState(false);
  const [currentLabTest, setCurrentLabTest] = useState('');
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

  const handleVitalChange = (field: string, value: string) => {
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

  const handleAddCustomTest = () => {
    setCurrentLabTest('');
    setShowLabTestForm(true);
  };

  const saveLabTest = () => {
    if (currentLabTest.trim()) {
      addLabTest(currentLabTest.trim());
      setShowLabTestForm(false);
      setCurrentLabTest('');
    }
  };

  const cancelLabTest = () => {
    setShowLabTestForm(false);
    setCurrentLabTest('');
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
      <PageHeader 
        title={STRING_CONSTANTS.LABELS.CONSULTATION_SESSION}
        subtitle={`${patientName} • ${patientAge}y, ${patientGender} • ${appointmentType}`}
        onBack={handleCancel}
        rightContent={
          <button className={styles.completeButton} onClick={handleComplete}>
            <span className={`${styles.materialIcon} ${styles.buttonIcon}`}>check_circle</span>
            {STRING_CONSTANTS.LABELS.COMPLETE_CONSULTATION}
          </button>
        }
        styles={styles}
      />

      {/* Tab Navigation */}
        <TabList 
          tabs={[
            { id: ConsultationTab.MEDICAL_HISTORY, icon: 'medical_information', label: STRING_CONSTANTS.TABS.MEDICAL_HISTORY },
            { id: ConsultationTab.SYMPTOMS, icon: 'symptoms', label: STRING_CONSTANTS.LABELS.TAB_SYMPTOMS_DIAGNOSIS },
            { id: ConsultationTab.TREATMENT, icon: 'medication', label: STRING_CONSTANTS.LABELS.TAB_TREATMENT_PLAN },
            { id: ConsultationTab.FOLLOWUP, icon: 'event', label: STRING_CONSTANTS.LABELS.TAB_FOLLOW_UP },
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as ConsultationTab)}
          styles={styles}
          containerClass={styles.tabsContainer}
          activeClass={styles.tabActive}
        />

      {/* Main Content */}
      <div className={styles.content}>
        {/* Medical History Tab */}
        {activeTab === ConsultationTab.MEDICAL_HISTORY && (
        <div className={styles.singleColumn}>
            {/* History Cards Grid - Single function call */}
            <PatientHistoryGrid styles={styles} />

            {/* Vitals Card */}
            <EditableHeaderCard 
              title={STRING_CONSTANTS.LABELS.RECENT_VITALS}
              isEditing={isEditingVitals}
              onToggleEdit={() => setIsEditingVitals(!isEditingVitals)}
              styles={styles}
            >
              <VitalsSection 
                data={vitals} 
                isEditing={isEditingVitals} 
                onChange={handleVitalChange} 
                styles={styles}
                variant="extended"
              />
            </EditableHeaderCard>

          {/* Current Medications */}
          <CollapsibleCardWithIcon 
            icon="medication"
            title={STRING_CONSTANTS.LABELS.CURRENT_MEDICATIONS}
            isCollapsed={collapsedSections.currentMedications}
            onToggle={() => toggleSection('currentMedications')}
            styles={styles}
          >
            <MedicationList 
              medications={[
                { name: 'Metformin 500mg', details: '500mg • Twice daily • After meals • 30 days' },
                { name: 'Lisinopril 10mg', details: '10mg • Once daily • Morning • 30 days' },
                { name: 'Aspirin 81mg', details: '81mg • Once daily • Morning • Ongoing' },
              ]}
              styles={styles}
            />
          </CollapsibleCardWithIcon>

          {/* Previous Appointments */}
          <CollapsibleCardWithIcon 
            icon="event_note"
            title="Previous Appointments"
            isCollapsed={collapsedSections.previousAppointments}
            onToggle={() => toggleSection('previousAppointments')}
            styles={styles}
          >
            <AppointmentList 
              appointments={[
                { id: '1', date: 'Nov 1, 2024', type: 'Routine Checkup' },
                { id: '2', date: 'Oct 15, 2024', type: 'Follow-up' },
                { id: '3', date: 'Sep 20, 2024', type: 'Blood Test Review' },
              ]}
              styles={styles}
            />
          </CollapsibleCardWithIcon>
        </div>
        )}

        {/* Symptoms & Diagnosis Tab */}
        {activeTab === ConsultationTab.SYMPTOMS && (
        <div className={styles.singleColumn}>
            {/* Symptoms */}
            <CardWithHeaderAction
              title={STRING_CONSTANTS.LABELS.SYMPTOMS}
              actionLabel={STRING_CONSTANTS.LABELS.ADD_CUSTOM_SYMPTOM}
              onAction={() => {/* Add custom symptom */}}
              styles={styles}
            >
              <QuickAddList 
                items={MOCK_DATA.COMMON_SYMPTOMS}
                onAdd={addSymptom}
                styles={styles}
              />
              <SectionSeparator styles={styles} />
              <TagList tags={symptoms} onRemove={removeSymptom} styles={styles} />
            </CardWithHeaderAction>

            {/* Chief Complaint */}
            <TextAreaCard 
              title={STRING_CONSTANTS.LABELS.CHIEF_COMPLAINT}
              value={chiefComplaint}
              onChange={setChiefComplaint}
              placeholder={STRING_CONSTANTS.PLACEHOLDERS.CHIEF_COMPLAINT_TEXT}
              rows={3}
              styles={styles}
            />

            {/* Diagnosis */}
            <TextAreaCard 
              title={STRING_CONSTANTS.LABELS.DIAGNOSIS}
              value={diagnosis}
              onChange={setDiagnosis}
              placeholder={STRING_CONSTANTS.PLACEHOLDERS.CLINICAL_DIAGNOSIS}
              rows={5}
              styles={styles}
            />
        </div>
        )}

        {/* Treatment Plan Tab */}
        {activeTab === ConsultationTab.TREATMENT && (
        <div className={styles.singleColumn}>
          {/* Prescription */}
          <CardWithHeaderAction
            title={STRING_CONSTANTS.LABELS.PRESCRIPTION}
            actionLabel={STRING_CONSTANTS.LABELS.ADD_MEDICATION}
            onAction={addMedication}
            styles={styles}
          >
            <QuickAddList 
              items={MOCK_DATA.COMMON_MEDICINES}
              onAdd={addMedication}
              styles={styles}
              containerClassName={styles.quickAddScrollable}
            />
            <SectionSeparator styles={styles} />
            
            {showMedicationForm && currentMedication && (
              <MedicationForm 
                medication={currentMedication}
                onFieldChange={updateMedicationField}
                onSave={saveMedication}
                onCancel={cancelMedication}
                fieldConfigs={[
                  { field: 'name', label: 'Medicine Name', placeholder: STRING_CONSTANTS.PLACEHOLDERS.MEDICATION_NAME, required: true },
                  { field: 'dosage', label: 'Dosage', placeholder: STRING_CONSTANTS.PLACEHOLDERS.MEDICATION_DOSAGE, required: true },
                  { field: 'frequency', label: 'Frequency', placeholder: STRING_CONSTANTS.PLACEHOLDERS.MEDICATION_FREQUENCY, required: true },
                  { field: 'timing', label: 'Timing', placeholder: STRING_CONSTANTS.PLACEHOLDERS.MEDICATION_INSTRUCTIONS },
                  { field: 'duration', label: 'Duration', placeholder: STRING_CONSTANTS.PLACEHOLDERS.MEDICATION_DURATION, required: true },
                ]}
                styles={styles}
              />
            )}

            <PrescriptionList 
              items={[
                { id: '1', name: 'Metformin 500mg', details: '500mg • Twice daily • After meals • 30 days' },
                { id: '2', name: 'Lisinopril 10mg', details: '10mg • Once daily • Morning • 30 days' },
                { id: '3', name: 'Aspirin 81mg', details: '81mg • Once daily • After meals • 30 days' },
                ...medications.map(med => ({
                  id: med.id,
                  name: med.name || 'New Medication',
                  details: `${med.dosage} • ${med.frequency} • ${med.timing} • ${med.duration}`
                }))
              ]}
              onEdit={(id) => {
                const med = medications.find(m => m.id === id);
                if (med) editMedication(med);
              }}
              onRemove={removeMedication}
              styles={styles}
            />
          </CardWithHeaderAction>

          {/* Lab Tests */}
          <CardWithHeaderAction
            title={STRING_CONSTANTS.LABELS.LAB_TESTS}
            actionLabel={STRING_CONSTANTS.LABELS.ADD_CUSTOM_TEST}
            onAction={handleAddCustomTest}
            styles={styles}
          >
            <QuickAddList 
              items={MOCK_DATA.COMMON_TESTS}
              onAdd={addLabTest}
              styles={styles}
              containerClassName={styles.quickAddScrollable}
            />
            <SectionSeparator styles={styles} />

            {showLabTestForm && (
              <div className={styles.medForm}>
                <div className={styles.medFormHeader}>
                  <h3 className={styles.medFormTitle}>{STRING_CONSTANTS.LABELS.ADD_CUSTOM_TEST}</h3>
                </div>
                <div className={styles.medFormGrid}>
                  <div className={styles.medFormField}>
                    <label className={styles.medFormLabel}>
                      Test Name *
                    </label>
                    <input
                      type="text"
                      className={styles.input}
                      value={currentLabTest}
                      onChange={(e) => setCurrentLabTest(e.target.value)}
                      placeholder="Enter test name"
                      autoFocus
                    />
                  </div>
                </div>
                <div className={styles.medFormActions}>
                  <button className={styles.medFormCancel} onClick={cancelLabTest}>
                    {STRING_CONSTANTS.BUTTONS.CANCEL}
                  </button>
                  <button className={styles.medFormSave} onClick={saveLabTest}>
                    Add Test
                  </button>
                </div>
              </div>
            )}

            <LabTestList  
              tests={[
                { id: '1', name: 'Complete Blood Count (CBC)', details: 'Fasting required • Sample: Blood • Priority: Routine' },
                { id: '2', name: 'Lipid Profile', details: 'Fasting required • Sample: Blood • Priority: Routine' },
                { id: '3', name: 'HbA1c', details: 'No fasting • Sample: Blood • Priority: Routine' },
                { id: '4', name: 'Kidney Function Test', details: 'Fasting preferred • Sample: Blood & Urine • Priority: Routine' },
                ...labTests.map((test, index) => ({ id: `custom-${index}`, name: test, details: '' }))
              ]}
              onRemove={(id) => {
                const test = labTests.find((_, i) => `custom-${i}` === id);
                if (test) removeLabTest(test);
              }}
              styles={styles}
            />
          </CardWithHeaderAction>

          {/* General Advice */}
          <TextAreaCard 
            title="General Advice"
            value=""
            onChange={() => {}}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.GENERAL_ADVICE}
            rows={5}
            styles={styles}
          />
        </div>
        )}

        {/* Follow Up & Notes Tab */}
        {activeTab === ConsultationTab.FOLLOWUP && (
        <div className={styles.singleColumn}>
          {/* Follow Up */}
          <InputFieldCard 
            title={STRING_CONSTANTS.LABELS.FOLLOW_UP}
            label="Follow-up Date"
            type="date"
            value={followUpDate}
            onChange={setFollowUpDate}
            styles={styles}
          />

          {/* Consultation Notes */}
          <TextAreaCard 
            title={STRING_CONSTANTS.LABELS.CONSULTATION_NOTES}
            value={notes}
            onChange={setNotes}
            placeholder={STRING_CONSTANTS.PLACEHOLDERS.ADDITIONAL_NOTES}
            rows={10}
            styles={styles}
          />
        </div>
        )}
      </div>
    </div>
  );
};

export default Consultation;
