import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Users, Trash2, Eye, RefreshCw } from 'lucide-react';
import databaseService from '../services/database';

interface DatabaseStats {
  users: number;
  sessions: number;
}

const AdminPanel: React.FC = () => {
  const [stats, setStats] = useState<DatabaseStats>({ users: 0, sessions: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refreshStats = () => {
    setStats(databaseService.getDatabaseStats());
  };

  const clearDatabase = () => {
    if (window.confirm('Are you sure you want to clear all database data? This action cannot be undone.')) {
      databaseService.clearDatabase();
      refreshStats();
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  return (
    <>
      {/* Admin Panel Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors duration-200"
        title="Admin Panel"
      >
        <Database className="w-5 h-5" />
      </button>

      {/* Admin Panel */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 z-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Database Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Registered Users</span>
              </div>
              <span className="text-lg font-bold text-blue-600">{stats.users}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Active Sessions</span>
              </div>
              <span className="text-lg font-bold text-green-600">{stats.sessions}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={refreshStats}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Stats</span>
            </button>

            <button
              onClick={clearDatabase}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Database</span>
            </button>
          </div>

          {/* Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              This panel is for development purposes only. It allows you to view database statistics and manage user data.
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AdminPanel; 