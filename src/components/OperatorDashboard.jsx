import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { inspectionFormAPI } from './api';

const OperatorDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentForms, setRecentForms] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    documentNo: '',
    inspectionDate: new Date().toISOString().split('T')[0],
    product: '100 mL Bag Pke.',
    sizeNo: '',
    shift: 'C',
    variant: 'Pink matt',
    lineNo: '02',
    customer: '',
    sampleSize: '08 Nos.',
    lacquers: [
      { id: 1, name: 'Clear Extn', weight: '', batchNo: '', expiryDate: '' },
      { id: 2, name: 'Red Dye', weight: '', batchNo: '', expiryDate: '' },
      { id: 3, name: 'Black Dye', weight: '', batchNo: '', expiryDate: '' },
      { id: 4, name: 'Pink Dye', weight: '', batchNo: '', expiryDate: '' },
      { id: 5, name: 'Violet Dye', weight: '', batchNo: '', expiryDate: '' },
      { id: 6, name: 'Matt Bath', weight: '', batchNo: '', expiryDate: '' },
      { id: 7, name: 'Hardener', weight: '', batchNo: '', expiryDate: '' },
      { id: 8, name: '', weight: '', batchNo: '', expiryDate: '' }
    ]
  });
  
  // Fetch recent forms on component mount
  useEffect(() => {
    const fetchRecentForms = async () => {
      try {
        const forms = await inspectionFormAPI.getFormsBySubmitter(user.name);
        setRecentForms(forms.slice(0, 5)); // Get the 5 most recent forms
      } catch (error) {
        console.error("Error fetching recent forms:", error);
      }
    };
    
    fetchRecentForms();
  }, [user.name]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle lacquer input changes
  const handleLacquerChange = (index, field, value) => {
    const updatedLacquers = [...formData.lacquers];
    updatedLacquers[index] = {
      ...updatedLacquers[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      lacquers: updatedLacquers
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Prepare the form data with additional fields needed for backend
      const newFormData = {
        ...formData,
        issuanceNo: "00",
        issueDate: new Date().toISOString().split('T')[0],
        reviewedDate: new Date(new Date().setFullYear(new Date().getFullYear() + 3)).toISOString().split('T')[0],
        page: "1 of 1",
        preparedBy: "QQM QC",
        approvedBy: "AVP-QA & SYS",
        issued: "AVP-QA & SYS",
        characteristics: [
          { id: 1, name: "Colour Shade", observation: "", comments: "" },
          { id: 2, name: "(Colour Height)", observation: "", comments: "" },
          { id: 3, name: "Any Visual defect", observation: "", comments: "" },
          { id: 4, name: "MEK Test", observation: "", comments: "" },
          { id: 5, name: "Cross Cut Test (Tape Test)", observation: "", comments: "" },
          { id: 6, name: "Coating Thickness", bodyThickness: "", bottomThickness: "", comments: "" },
          { id: 7, name: "Temperature", observation: "", comments: "" },
          { id: 8, name: "Viscosity", observation: "", comments: "" },
          { id: 9, name: "Batch Composition", observation: "", comments: "" }
        ],
        productionOperator: user.name,
        operatorSignature: `signed_by_${user.name.toLowerCase().replace(/\s/g, '_')}`,
        status: "DRAFT"
      };
      
      // Create a new form
      await inspectionFormAPI.createForm(newFormData);
      
      // Reset form and update UI
      alert("Inspection form created successfully!");
      setShowForm(false);
      
      // Refresh recent forms
      const forms = await inspectionFormAPI.getFormsBySubmitter(user.name);
      setRecentForms(forms.slice(0, 5));
      
    } catch (error) {
      console.error("Error creating form:", error);
      alert("Failed to create inspection form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to view all forms
  const handleViewRecentReports = () => {
    navigate('/forms');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-bold text-2xl">AGI</div>
            <div className="ml-2 text-sm font-bold">GREENPAC</div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Operator Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage production inspections and reports</p>
        </div>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {showForm ? 'Hide Form' : 'New Inspection Report'}
              </button> */}
              <button
                onClick={handleViewRecentReports}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                View All Reports
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Entry Form */}
        {showForm && (
          <div className="bg-white shadow sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">New Inspection Form</h3>
              <form onSubmit={handleSubmit}>
                {/* Document Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document No.</label>
                    <input
                      type="text"
                      name="documentNo"
                      value={formData.documentNo}
                      onChange={handleChange}
                      required
                      placeholder="AGI-DEC-14-XX"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inspection Date</label>
                    <input
                      type="date"
                      name="inspectionDate"
                      value={formData.inspectionDate}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size No.</label>
                    <input
                      type="text"
                      name="sizeNo"
                      value={formData.sizeNo}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Size</label>
                    <input
                      type="text"
                      name="sampleSize"
                      value={formData.sampleSize}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                {/* Production Info */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                    <select
                      name="shift"
                      value={formData.shift}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
                    <select
                      name="variant"
                      value={formData.variant}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="Pink matt">Pink matt</option>
                      <option value="Blue matt">Blue matt</option>
                      <option value="Green matt">Green matt</option>
                      <option value="Yellow matt">Yellow matt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Line No.</label>
                    <select
                      name="lineNo"
                      value={formData.lineNo}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                    </select>
                  </div>
                </div>
                
                {/* Lacquer/Dye Table */}
                <h4 className="text-md font-medium text-gray-900 mb-2">Lacquer / Dye Details</h4>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lacquer / Dye</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">wt.</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch No.</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.lacquers.map((lacquer, index) => (
                        <tr key={lacquer.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{lacquer.id}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={lacquer.name}
                              onChange={(e) => handleLacquerChange(index, 'name', e.target.value)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={lacquer.weight}
                              onChange={(e) => handleLacquerChange(index, 'weight', e.target.value)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-36 sm:text-sm border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              type="text"
                              value={lacquer.batchNo}
                              onChange={(e) => handleLacquerChange(index, 'batchNo', e.target.value)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              type="date"
                              value={lacquer.expiryDate}
                              onChange={(e) => handleLacquerChange(index, 'expiryDate', e.target.value)}
                              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Draft'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Recent Forms */}
        <div className="bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Your Recent Forms</h3>
            <div className="mt-4 border-t border-gray-200 pt-4">
              {recentForms.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {recentForms.map(form => (
                    <li key={form.id} className="py-3 flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{form.documentNo} - {form.product}</p>
                        <p className="text-sm text-gray-500">{form.variant} - Line {form.lineNo} - Shift {form.shift}</p>
                      </div>
                      <div className="flex items-center">
                        <span className={`mr-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          form.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' : 
                          form.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' : 
                          form.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {form.status}
                        </span>
                        <button 
                          onClick={() => navigate(`/inspection-form/${form.id}`)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm"
                        >
                          View
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 py-2">No recent forms found. Create your first inspection form!</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperatorDashboard;