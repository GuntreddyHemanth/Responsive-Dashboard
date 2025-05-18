import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  updateUserProfile,
  updateNotifications,
  updateLanguage,
  updateTimezone,
  saveSettingsStart,
  saveSettingsSuccess,
  saveSettingsFailure,
  resetSaveStatus,
} from '../redux/settingsSlice';
import { saveUserSettings } from '../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isSaving, saveError, saveSuccess } = useSelector(
    (state: RootState) => state.settings
  );

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    dispatch(
      updateNotifications({
        [name]: checked,
      })
    );
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateLanguage(e.target.value));
  };

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateTimezone(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // First update the profile in the redux store
    dispatch(updateUserProfile(formData));
    
    // Then save all settings to the "server"
    dispatch(saveSettingsStart());
    
    try {
      await saveUserSettings({
        ...user,
        name: formData.name,
        email: formData.email,
      });
      dispatch(saveSettingsSuccess());
      
      // Reset status after 3 seconds
      setTimeout(() => {
        dispatch(resetSaveStatus());
      }, 3000);
    } catch (error) {
      dispatch(saveSettingsFailure((error as Error).message));
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>
      
      {saveSuccess && (
        <div className="mb-6 p-4 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Settings saved successfully!</span>
        </div>
      )}
      
      {saveError && (
        <div className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Error saving settings: {saveError}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Notifications Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="email"
                name="email"
                checked={user.notifications.email}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="email" className="ml-2 block text-sm">
                Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="push"
                name="push"
                checked={user.notifications.push}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="push" className="ml-2 block text-sm">
                Push Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sms"
                name="sms"
                checked={user.notifications.sms}
                onChange={handleNotificationChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="sms" className="ml-2 block text-sm">
                SMS Notifications
              </label>
            </div>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={user.language}
                onChange={handleLanguageChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium mb-1">
                Timezone
              </label>
              <select
                id="timezone"
                name="timezone"
                value={user.timezone}
                onChange={handleTimezoneChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700"
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md shadow-sm disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;