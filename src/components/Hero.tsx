"use client";
import React, { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/MovingBorder";
import { FaUser, FaRegEnvelope, FaCalendarAlt } from "react-icons/fa";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Image from 'next/image';

interface UserProfile {
  name: string;
  email: string;
  subscription_status: string;
  subscriptionExpiry: string;
}

interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Hero = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    subscription_status: '',
    subscriptionExpiry: ''
  });
  const [passwordData, setPasswordData] = useState<PasswordChange>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Partial<PasswordChange>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from MongoDB
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserProfile({
            name: data.name || '',
            email: data.email,
            subscription_status: data.subscription_status,
            subscriptionExpiry: data.subscriptionExpiry || ''
          });
        } else {
          toast.error('Failed to fetch user data');
        }
      } catch (error) {
        toast.error('Error fetching user data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userProfile.name
        }),
        credentials: 'include'
      });
      
      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error('Error updating profile');  
    } finally {
      setIsLoading(false);
    }
  };

const handlePasswordChange = async (e: FormEvent) => {
  e.preventDefault();
  
  // Validate inputs
  const newErrors: Partial<PasswordChange> = {};
  if (!passwordData.currentPassword) newErrors.currentPassword = 'Current password is required';
  if (!passwordData.newPassword) newErrors.newPassword = 'New password is required';
  if (passwordData.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  
  setErrors(newErrors);
  
  if (Object.keys(newErrors).length === 0) {
    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to change password');
      }

      toast.success('Password changed successfu lly!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
        toast.error('Error changing password');
      } finally {
        setIsLoading(false);
      }
  }
};

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-start pt-16 pb-10 overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 dark:bg-black-100 bg-white dark:bg-grid-white/[0.05] bg-grid-black/[0.1]">
        <Spotlight className="-top-20 -left-10 md:-left-32 md:-top-20 h-[50vh] md:h-screen" fill="white" />
        <Spotlight className="top-20 left-full h-[30vh] md:h-[70vh] w-[100vw]" fill="purple" />
        <Spotlight className="top-40 left-20 md:top-28 md:left-80 h-[40vh] md:h-[80vh] w-[30vw] md:w-[50vw]" fill="blue" />
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Logo and navigation */}
      <div className="w-full max-w-7xl px-4 md:px-16 top-6 z-10">
        <img src={"/Webfoxshield.png"} alt="Logo" className="fixed top-0 left-3 h-40 z-[900]" />
        <div className="fixed top-2 right-2 md:top-10 md:right-10 flex space-x-2 md:space-x-4 z-[5000]">
          <Link href="https://www.webfoxshield.in/">
            <Button className="border text-xs md:text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-2 py-1 md:px-4 md:py-3 rounded-full">
              Home
            </Button>
          </Link>
        </div>

        {/* Main content */}
        <div className="w-full flex-1 flex items-center justify-center px-4 z-10 mt-8 md:mt-0">
          <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl w-full max-w-2xl mx-auto my-4 md:my-8">
            <div className="flex justify-center border-b border-gray-200 dark:border-gray-700">
              <button
                className={`py-4 px-6 font-medium text-sm md:text-base ${activeTab === 'profile' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button
                className={`py-4 px-6 font-medium text-sm md:text-base ${activeTab === 'password' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </button>
            </div>

            {activeTab === 'profile' && (
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">User Profile</h2>
                
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaUser className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaRegEnvelope className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={userProfile.email}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subscription Status</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={userProfile.subscription_status === 'active' ? 'Active' : 'Inactive'}
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        disabled/>
                    </div>
                  </div>

                  {userProfile.subscriptionExpiry && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subscription Expires</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaCalendarAlt className="text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={new Date(userProfile.subscriptionExpiry).toLocaleDateString()}
                          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdLockOutline className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className={`bg-gray-50 dark:bg-gray-800 border ${errors.currentPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('current')}
                      >
                        {showPasswords.current ? (
                          <MdVisibilityOff className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdVisibility className="text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.currentPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.currentPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdLockOutline className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className={`bg-gray-50 dark:bg-gray-800 border ${errors.newPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        {showPasswords.new ? (
                          <MdVisibilityOff className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdVisibility className="text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.newPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.newPassword}</p>}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Must be at least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MdLockOutline className="text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className={`bg-gray-50 dark:bg-gray-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 pr-10`}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        {showPasswords.confirm ? (
                          <MdVisibilityOff className="text-gray-500 dark:text-gray-400" />
                        ) : (
                          <MdVisibility className="text-gray-500 dark:text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600 dark:text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Hero;