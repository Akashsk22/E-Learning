import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const DemoCredentials: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
    >
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900 mb-1">
            Demo Credentials
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            Use these credentials to test the login functionality:
          </p>
          <div className="bg-white rounded border border-blue-200 p-3">
            <div className="text-sm">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-blue-900">Email:</span>
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">demo@example.com</code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium text-blue-900">Password:</span>
                <code className="bg-blue-100 px-2 py-1 rounded text-blue-800">password123</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DemoCredentials; 