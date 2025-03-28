import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OperatorDashboard from './components/OperatorDashboard';
import AVPDashboard from './components/AVPDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import EditableInspectionForm from './components/EditableInspectionForm';
import { AuthProvider, useAuth } from './components/AuthContext';

// Wrapper for InspectionFormLayout
// You'll need to create this component if it's missing
const InspectionFormLayout = ({ user, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow mb-4">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-2xl">AGI</div>
            <div className="ml-2 text-sm font-bold">GREENPAC</div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="mr-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded"
            >
              Back to Dashboard
            </button>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

// Modified Login component to use Auth context
const LoginPage = () => {
  const { login, isAuthenticated, user } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to={user.role === 'operator' ? '/operator' : '/avp'} />;
  }
  
  const handleLogin = (userData) => {
    login(userData);
  };
  
  return <LoginForm onLogin={handleLogin} />;
};

// Modified components to use Auth context
const OperatorPage = () => {
  const { user, logout, isOperator } = useAuth();
  
  if (!isOperator) {
    return <Navigate to="/" />;
  }
  
  return <OperatorDashboard user={user} onLogout={logout} />;
};

const AVPPage = () => {
  const { user, logout, isAVP } = useAuth();
  
  if (!isAVP) {
    return <Navigate to="/" />;
  }
  
  return <AVPDashboard user={user} onLogout={logout} />;
};

const InspectionFormPage = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <InspectionFormLayout user={user} onLogout={logout}>
      <EditableInspectionForm />
    </InspectionFormLayout>
  );
};

// Main app with auth context provider
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/operator" element={<OperatorPage />} />
          <Route path="/avp" element={<AVPPage />} />
          <Route path="/inspection-form" element={<InspectionFormPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;