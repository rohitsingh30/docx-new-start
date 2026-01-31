import React, { useEffect, useState } from 'react';
import styles from '../styles/Settings.module.css';
import { SettingsProps } from '../types/Settings.types';
import { STRING_CONSTANTS } from '../constants/stringConstants';
import { SettingsTab, ThemeMode } from '../types/enums';
import { SimpleTabList, InfoList, FormFieldList } from './shared';

const Settings: React.FC<SettingsProps> = ({ onShowInvoices }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.PROFILE);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.AUTO);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
  }, [themeMode]);

  const handleActionFeedback = () => {
    window.alert(STRING_CONSTANTS.MESSAGES.ACTION_COMPLETED);
  };

  const getThemeButtonClassName = (mode: ThemeMode) => {
    return mode === themeMode ? `${styles.themeButton} ${styles.active}` : styles.themeButton;
  };

  return (
    <div className={styles.settings}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{STRING_CONSTANTS.SETTINGS_LABELS.SETTINGS}</h1>
        <div className={styles.themeSelector}>
          <button 
            className={getThemeButtonClassName(ThemeMode.LIGHT)}
            onClick={() => setThemeMode(ThemeMode.LIGHT)}
            type="button"
          >
            <span className={styles.materialSymbolsIcon}>light_mode</span>
          </button>
          <button 
            className={getThemeButtonClassName(ThemeMode.DARK)}
            onClick={() => setThemeMode(ThemeMode.DARK)}
            type="button"
          >
            <span className={styles.materialSymbolsIcon}>dark_mode</span>
          </button>
          <button 
            className={getThemeButtonClassName(ThemeMode.AUTO)}
            onClick={() => setThemeMode(ThemeMode.AUTO)}
            type="button"
          >
            <span className={styles.materialSymbolsIcon}>brightness_auto</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <SimpleTabList 
        tabs={[
          { id: SettingsTab.PROFILE, icon: 'person', label: STRING_CONSTANTS.TABS.PROFILE },
          { id: SettingsTab.ACCOUNT, icon: 'lock', label: STRING_CONSTANTS.TABS.ACCOUNT_SECURITY },
          { id: SettingsTab.PREFERENCES, icon: 'tune', label: STRING_CONSTANTS.TABS.PREFERENCES },
        ]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as SettingsTab)}
        styles={styles}
      />

      {/* Content Area */}
      <div className={styles.content}>
        {activeTab === SettingsTab.PROFILE && (
          <div className={styles.section}>
              {/* Profile Information Card */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>person</span>
                  <h3>{STRING_CONSTANTS.SETTINGS_LABELS.PROFILE_INFORMATION}</h3>
                  {!isEditingProfile && (
                    <button 
                      className={styles.editButton}
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <span className={styles.materialSymbolsIcon}>edit</span>
                      {STRING_CONSTANTS.BUTTONS.EDIT}
                    </button>
                  )}
                </div>
                <div className={styles.settingCardContent}>
                  {isEditingProfile ? (
                    <>
                      {/* Profile Photo Section */}
                      <div className={styles.profilePhotoSection}>
                        <div className={styles.profilePhotoLarge}>
                          <span className={styles.materialSymbolsIcon}>person</span>
                        </div>
                        <div className={styles.profilePhotoActions}>
                          <button className={styles.primaryButton} onClick={handleActionFeedback} type="button">
                            <span className={styles.materialSymbolsIcon}>upload</span>
                            {STRING_CONSTANTS.SETTINGS_LABELS.CHANGE_PHOTO}
                          </button>
                          <button className={styles.secondaryButton} onClick={handleActionFeedback} type="button">
                            <span className={styles.materialSymbolsIcon}>delete</span>
                            {STRING_CONSTANTS.SETTINGS_LABELS.REMOVE}
                          </button>
                        </div>
                      </div>

                      <div className={styles.divider}></div>

                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label>{STRING_CONSTANTS.SETTINGS_LABELS.FIRST_NAME}</label>
                          <input type="text" defaultValue="John" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>{STRING_CONSTANTS.SETTINGS_LABELS.LAST_NAME}</label>
                          <input type="text" defaultValue="Smith" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>{STRING_CONSTANTS.PATIENT_LABELS.PHONE_NUMBER}</label>
                          <input type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>{STRING_CONSTANTS.PATIENT_LABELS.EMAIL_ADDRESS}</label>
                          <input type="email" defaultValue="dr.smith@hospital.com" />
                        </div>
                      </div>
                      <div className={styles.cardActions}>
                          <button 
                          className={styles.primaryButton}
                            onClick={() => {
                              setIsEditingProfile(false);
                              handleActionFeedback();
                            }}
                            type="button"
                        >
                          <span className={styles.materialSymbolsIcon}>save</span>
                          {STRING_CONSTANTS.SETTINGS_LABELS.SAVE_CHANGES}
                        </button>
                        <button 
                          className={styles.secondaryButton}
                            onClick={() => setIsEditingProfile(false)}
                            type="button"
                        >
                          {STRING_CONSTANTS.BUTTONS.CANCEL}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className={styles.infoDisplay}>
                      {/* Profile Photo in Grid */}
                      <div className={`${styles.infoRow} ${styles.photoRow}`}>
                        <div className={styles.profilePhotoMedium}>
                          <span className={styles.materialSymbolsIcon}>person</span>
                        </div>
                      </div>

                      <InfoList 
                        items={[
                          { label: STRING_CONSTANTS.SETTINGS_LABELS.FIRST_NAME, value: 'John' },
                          { label: STRING_CONSTANTS.SETTINGS_LABELS.LAST_NAME, value: 'Smith' },
                          { label: STRING_CONSTANTS.PATIENT_LABELS.PHONE_NUMBER, value: '+1 (555) 123-4567' },
                          { label: STRING_CONSTANTS.PATIENT_LABELS.EMAIL_ADDRESS, value: 'dr.smith@hospital.com' },
                        ]}
                        styles={styles}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Details */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>badge</span>
                  <h3>{STRING_CONSTANTS.SETTINGS_LABELS.PROFESSIONAL_DETAILS}</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <FormFieldList 
                    fields={[
                      { name: 'specialization', label: STRING_CONSTANTS.SETTINGS_LABELS.SPECIALIZATION, defaultValue: 'General Practitioner' },
                      { name: 'education', label: STRING_CONSTANTS.SETTINGS_LABELS.EDUCATION, defaultValue: 'MD, Harvard Medical School' },
                      { name: 'licenseNumber', label: STRING_CONSTANTS.SETTINGS_LABELS.LICENSE_NUMBER, defaultValue: 'MD-12345' },
                      { name: 'yearsOfExperience', label: STRING_CONSTANTS.SETTINGS_LABELS.YEARS_OF_EXPERIENCE, type: 'number', defaultValue: 15 },
                    ]}
                    styles={styles}
                  />
                  <div className={styles.cardActions}>
                    <button className={styles.primaryButton} onClick={handleActionFeedback} type="button">
                      {STRING_CONSTANTS.SETTINGS_LABELS.SAVE_CHANGES}
                    </button>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>schedule</span>
                  <h3>{STRING_CONSTANTS.SETTINGS_LABELS.WORKING_HOURS}</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>{STRING_CONSTANTS.SETTINGS_LABELS.START_TIME}</label>
                      <input type="time" defaultValue="09:00" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>{STRING_CONSTANTS.SETTINGS_LABELS.END_TIME}</label>
                      <input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.primaryButton} onClick={handleActionFeedback} type="button">
                      {STRING_CONSTANTS.SETTINGS_LABELS.SAVE_CHANGES}
                    </button>
                  </div>
                </div>
              </div>
          </div>
        )}

        {activeTab === SettingsTab.ACCOUNT && (
          <div className={styles.section}>
              {/* Security Settings */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>security</span>
                  <h3>Security Settings</h3>
                </div>
                <div className={styles.settingCardContent}>
                  {/* Change Password Section */}
                  <div className={styles.securitySection}>
                    <div className={styles.sectionHeader}>
                      <span className={styles.materialSymbolsIcon}>password</span>
                      <h4>Change Password</h4>
                      {!isChangingPassword && (
                        <button 
                          className={styles.editButtonSmall}
                          onClick={() => setIsChangingPassword(true)}
                        >
                          <span className={styles.materialSymbolsIcon}>edit</span>
                          Change
                        </button>
                      )}
                    </div>
                    {isChangingPassword ? (
                      <>
                        <div className={styles.passwordFormRow}>
                          <div className={styles.formGroup}>
                            <label>Current Password</label>
                            <input type="password" placeholder="••" />
                          </div>
                          <div className={styles.formGroup}>
                            <label>New Password</label>
                            <input type="password" placeholder="Enter new password" />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Confirm New Password</label>
                            <input type="password" placeholder="Confirm new password" />
                          </div>
                        </div>
                        <div className={styles.cardActions}>
                          <button 
                            className={styles.primaryButton}
                            onClick={() => {
                              setIsChangingPassword(false);
                              handleActionFeedback();
                            }}
                            type="button"
                          >
                            <span className={styles.materialSymbolsIcon}>save</span>
                            {STRING_CONSTANTS.SETTINGS_LABELS.UPDATE_PASSWORD}
                          </button>
                          <button 
                            className={styles.secondaryButton}
                            onClick={() => setIsChangingPassword(false)}
                            type="button"
                          >
                            {STRING_CONSTANTS.BUTTONS.CANCEL}
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>

                  <div className={styles.divider}></div>

                  {/* Two-Factor Authentication Section */}
                  <div className={styles.securitySection}>
                    <div className={styles.toggleSettingCompact}>
                      <div className={styles.toggleHeader}>
                        <span className={styles.materialSymbolsIcon}>shield</span>
                        <div className={styles.toggleTextContent}>
                          <h4>Two-Factor Authentication</h4>
                          <p>Require a verification code in addition to your password</p>
                        </div>
                      </div>
                      <label className={styles.toggle}>
                        <input type="checkbox" />
                        <span className={styles.toggleSlider}></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session Management */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>devices</span>
                  <h3>Active Sessions</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.sessionList}>
                    <div className={styles.sessionItem}>
                      <div className={styles.sessionInfo}>
                        <span className={styles.materialSymbolsIcon}>computer</span>
                        <div>
                          <h4>MacBook Pro</h4>
                          <p>San Francisco, CA • Last active: Now</p>
                        </div>
                      </div>
                      <span className={styles.currentBadge}>Current</span>
                    </div>
                    <div className={styles.sessionItem}>
                      <div className={styles.sessionInfo}>
                        <span className={styles.materialSymbolsIcon}>phone_iphone</span>
                        <div>
                          <h4>iPhone 13</h4>
                          <p>San Francisco, CA • Last active: 2 hours ago</p>
                        </div>
                      </div>
                      <button className={styles.dangerButton} onClick={handleActionFeedback} type="button">
                        {STRING_CONSTANTS.SETTINGS_LABELS.REVOKE}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )}

        {activeTab === SettingsTab.PREFERENCES && (
          <div className={styles.section}>
            <div className={styles.preferencesGrid}>
              {/* Notifications Section */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>notifications_active</span>
                  <h3>Notifications</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.toggleSettingCompact}>
                    <div className={styles.toggleInfo}>
                      <h4>Email Notifications</h4>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div className={styles.toggleSettingCompact}>
                    <div className={styles.toggleInfo}>
                      <h4>Appointment Alerts</h4>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div className={styles.toggleSettingCompact}>
                    <div className={styles.toggleInfo}>
                      <h4>Patient Messages</h4>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                  <div className={styles.toggleSettingCompact}>
                    <div className={styles.toggleInfo}>
                      <h4>System Updates</h4>
                    </div>
                    <label className={styles.toggle}>
                      <input type="checkbox" />
                      <span className={styles.toggleSlider}></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Language & Time Section */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>language</span>
                  <h3>Language & Time</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.compactForm}>
                    <div className={styles.formGroup}>
                      <label>Language</label>
                      <select>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Time Zone</label>
                      <select>
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Date Format</label>
                      <select>
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label>Time Format</label>
                      <select>
                        <option>12-hour</option>
                        <option>24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button at Bottom */}
            <div className={styles.preferenceActions}>
              <button className={styles.primaryButton} onClick={handleActionFeedback} type="button">
                <span className={styles.materialSymbolsIcon}>save</span>
                {STRING_CONSTANTS.SETTINGS_LABELS.SAVE_PREFERENCES}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
