import React, { useState } from 'react';
import styles from '../styles/Settings.module.css';
import { SettingsProps } from '../types/Settings.types';

enum SettingsTab {
  PROFILE = 'profile',
  ACCOUNT = 'account',
  PREFERENCES = 'preferences',
}

const Settings: React.FC<SettingsProps> = ({ onShowInvoices }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>(SettingsTab.PROFILE);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className={styles.settings}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Settings</h1>
        <div className={styles.themeSelector}>
          <button className={styles.themeButton}>
            <span className={styles.materialSymbolsIcon}>light_mode</span>
          </button>
          <button className={styles.themeButton}>
            <span className={styles.materialSymbolsIcon}>dark_mode</span>
          </button>
          <button className={`${styles.themeButton} ${styles.active}`}>
            <span className={styles.materialSymbolsIcon}>brightness_auto</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={activeTab === SettingsTab.PROFILE ? `${styles.tab} ${styles.activeTab}` : styles.tab}
          onClick={() => setActiveTab(SettingsTab.PROFILE)}
        >
          <span className={styles.materialSymbolsIcon}>person</span>
          Profile
        </button>
        <button
          className={activeTab === SettingsTab.ACCOUNT ? `${styles.tab} ${styles.activeTab}` : styles.tab}
          onClick={() => setActiveTab(SettingsTab.ACCOUNT)}
        >
          <span className={styles.materialSymbolsIcon}>lock</span>
          Account & Security
        </button>
        <button
          className={activeTab === SettingsTab.PREFERENCES ? `${styles.tab} ${styles.activeTab}` : styles.tab}
          onClick={() => setActiveTab(SettingsTab.PREFERENCES)}
        >
          <span className={styles.materialSymbolsIcon}>tune</span>
          Preferences
        </button>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        {activeTab === SettingsTab.PROFILE && (
          <div className={styles.section}>
              {/* Profile Information Card */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>person</span>
                  <h3>Profile Information</h3>
                  {!isEditingProfile && (
                    <button 
                      className={styles.editButton}
                      onClick={() => setIsEditingProfile(true)}
                    >
                      <span className={styles.materialSymbolsIcon}>edit</span>
                      Edit
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
                          <button className={styles.primaryButton}>
                            <span className={styles.materialSymbolsIcon}>upload</span>
                            Change Photo
                          </button>
                          <button className={styles.secondaryButton}>
                            <span className={styles.materialSymbolsIcon}>delete</span>
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className={styles.divider}></div>

                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label>First Name</label>
                          <input type="text" defaultValue="John" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Last Name</label>
                          <input type="text" defaultValue="Smith" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Phone Number</label>
                          <input type="tel" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className={styles.formGroup}>
                          <label>Email Address</label>
                          <input type="email" defaultValue="dr.smith@hospital.com" />
                        </div>
                      </div>
                      <div className={styles.cardActions}>
                        <button 
                          className={styles.primaryButton}
                          onClick={() => setIsEditingProfile(false)}
                        >
                          <span className={styles.materialSymbolsIcon}>save</span>
                          Save Changes
                        </button>
                        <button 
                          className={styles.secondaryButton}
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Cancel
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

                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>First Name</span>
                        <span className={styles.infoValue}>John</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Last Name</span>
                        <span className={styles.infoValue}>Smith</span>
                      </div>
                                            <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Phone Number</span>
                        <span className={styles.infoValue}>+1 (555) 123-4567</span>
                      </div>
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email Address</span>
                        <span className={styles.infoValue}>dr.smith@hospital.com</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Details */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>badge</span>
                  <h3>Professional Details</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Specialization</label>
                      <input type="text" defaultValue="General Practitioner" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Education</label>
                      <input type="text" defaultValue="MD, Harvard Medical School" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>License Number</label>
                      <input type="text" defaultValue="MD-12345" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Years of Experience</label>
                      <input type="number" defaultValue="15" />
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.primaryButton}>Save Changes</button>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className={styles.settingCard}>
                <div className={styles.settingCardHeader}>
                  <span className={styles.materialSymbolsIcon}>schedule</span>
                  <h3>Working Hours</h3>
                </div>
                <div className={styles.settingCardContent}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Start Time</label>
                      <input type="time" defaultValue="09:00" />
                    </div>
                    <div className={styles.formGroup}>
                      <label>End Time</label>
                      <input type="time" defaultValue="17:00" />
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.primaryButton}>Save Changes</button>
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
                            onClick={() => setIsChangingPassword(false)}
                          >
                            <span className={styles.materialSymbolsIcon}>save</span>
                            Update Password
                          </button>
                          <button 
                            className={styles.secondaryButton}
                            onClick={() => setIsChangingPassword(false)}
                          >
                            Cancel
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
                      <button className={styles.dangerButton}>Revoke</button>
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
              <button className={styles.primaryButton}>
                <span className={styles.materialSymbolsIcon}>save</span>
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
