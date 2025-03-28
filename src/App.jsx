import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import OperatorDashboard from './components/OperatorDashboard';
import AVPDashboard from './components/AVPDashboard';
// import QADashboard from './components/QADashboard';
import MasterDashboard from './components/MasterDashboard';
import InspectionFormList from './components/InspectionFormList';
import EditableInspectionForm from './components/EditableInspectionForm';
import { AuthProvider, useAuth } from './components/AuthContext';
import QADashboard from './components/QADashboard';

// Wrapper for InspectionFormLayout
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

// Auth wrapper that handles redirects
const AuthRouter = () => {
  const { user, isAuthenticated, logout, isOperator, isQA, isAVP, isMaster, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // This effect runs when authentication state changes
  useEffect(() => {
    if (loading) return; // Don't do anything while loading

    if (isAuthenticated) {
      // Only redirect if we're at the login page
      if (location.pathname === '/') {
        if (isOperator) navigate('/operator', { replace: true });
        else if (isQA) navigate('/qa', { replace: true });
        else if (isAVP) navigate('/avp', { replace: true });
        else if (isMaster) navigate('/master', { replace: true });
      }
    } else {
      // Only redirect to login if we're not already there
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, isOperator, isQA, isAVP, isMaster, loading, navigate, location.pathname]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/operator" element={isOperator ? <OperatorDashboard user={user} onLogout={logout} /> : <Navigate to="/" replace />} />
      {/* <Route path="/qa" element={isQA ? <QADashboard user={user} onLogout={logout} /> : <Navigate to="/" replace />} /> */}
      <Route path="/avp" element={isAVP ? <AVPDashboard user={user} onLogout={logout} /> : <Navigate to="/" replace />} />
      <Route path="/master" element={isMaster ? <MasterDashboard user={user} onLogout={logout} /> : <Navigate to="/" replace />} />
      <Route path="/qa" element={isQA ? <QADashboard user={user} onLogout={logout} /> : <Navigate to="/" replace />} />
      <Route path="/forms" element={
        isAuthenticated ? (
          <InspectionFormLayout user={user} onLogout={logout}>
            <InspectionFormList />
          </InspectionFormLayout>
        ) : <Navigate to="/" replace />
      } />
      <Route path="/inspection-form" element={
        isAuthenticated ? (
          <InspectionFormLayout user={user} onLogout={logout}>
            <EditableInspectionForm />
          </InspectionFormLayout>
        ) : <Navigate to="/" replace />
      } />
      <Route path="/inspection-form/:id" element={
        isAuthenticated ? (
          <InspectionFormLayout user={user} onLogout={logout}>
            <EditableInspectionForm />
          </InspectionFormLayout>
        ) : <Navigate to="/" replace />
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Login Page
const LoginPage = () => {
  const { login } = useAuth();
  
  const handleLogin = (userData) => {
    login(userData);
  };
  
  return <LoginForm onLogin={handleLogin} />;
};

// Main app with auth context provider
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AuthRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;