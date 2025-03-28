import React, { useState } from 'react';
import QASign from '../assets/QASign.png';
import OperatorSign from '../assets/OperatorSign.png';
const EditableInspectionForm = () => {
    // State for form data
    const [formData, setFormData] = useState({
        documentNo: 'AGI-DEC-14-04',
        issuanceNo: '00',
        issueDate: '2024-08-01',
        reviewedDate: '2027-03-01',
        page: '1 of 1',
        preparedBy: 'QQM QC',
        approvedBy: 'AVP-QA & SYS',
        issued: 'AVP-QA & SYS',
        inspectionDate: '2024-11-29',
        product: '100 mL Bag Pke.',
        sizeNo: '',
        shift: 'C',
        variant: 'Pink matt',
        lineNo: '02',
        customer: '',
        sampleSize: '08 Nos.',
        lacquers: [
            { id: 1, name: 'Clear Extn', weight: '11.74', batchNo: '2634', expiryDate: '2025-10-24' },
            { id: 2, name: 'Red Dye', weight: '121g', batchNo: '2137', expiryDate: '2025-10-20' },
            { id: 3, name: 'Black Dye', weight: '46.7g', batchNo: '1453', expiryDate: '2025-10-21' },
            { id: 4, name: 'Pink Dye', weight: '26.5g', batchNo: '1140', expiryDate: '2025-07-10' },
            { id: 5, name: 'Violet Dye', weight: '18.7g', batchNo: '1160', expiryDate: '2025-07-11' },
            { id: 6, name: 'Matt Bath', weight: '300g', batchNo: '1156', expiryDate: '2025-09-12' },
            { id: 7, name: 'Hardener', weight: '60g', batchNo: '114', expiryDate: '2025-11-20' },
            { id: 8, name: '', weight: '', batchNo: '', expiryDate: '' }
        ],
        characteristics: [
            { id: 1, name: 'Colour Shade', observation: 'Shade 2 : OK', comments: '' },
            { id: 2, name: '(Colour Height)', observation: 'Full', comments: '' },
            { id: 3, name: 'Any Visual defect', observation: 'No', comments: '' },
            { id: 4, name: 'MEK Test', observation: 'OK', comments: '' },
            { id: 5, name: 'Cross Cut Test (Tape Test)', observation: 'OK', comments: '' },
            { id: 6, name: 'Coating Thickness', bodyThickness: '20 mic', bottomThickness: '10.2 mic', comments: '' },
            { id: 7, name: 'Temperature', observation: '117°c', comments: '' },
            { id: 8, name: 'Viscosity', observation: '25.1s', comments: '' },
            { id: 9, name: 'Batch Composition', observation: 'Clear Extn 11.74 Red Dye 121g Black Dye 46.7g\nPink Dye 26.5g Violet Dye 18.7g\nMatt Bath H-Agent 60g', comments: '' }
        ],
        qaExecutive: '',
        productionOperator: '',
        finalApprovalTime: '21:30 hrs'
    });

    // Variant options
    const variantOptions = ['Pink matt', 'Blue matt', 'Green matt', 'Yellow matt'];

    // Shift options
    const shiftOptions = ['A', 'B', 'C'];

    // Line number options
    const lineOptions = ['01', '02', '03', '04', '05'];

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle lacquer changes
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

    // Handle characteristic changes
    const handleCharChange = (index, field, value) => {
        const updatedChars = [...formData.characteristics];
        updatedChars[index] = {
            ...updatedChars[index],
            [field]: value
        };

        setFormData({
            ...formData,
            characteristics: updatedChars
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Here you would typically send the data to a server or perform other actions
        alert('Form submitted successfully!');
    };

    return (
        <div className="flex justify-center bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-md">
                {/* Header */}
                <div className="border border-gray-800">
                    <div className="grid grid-cols-3">
                        {/* Left column - Document info */}
                        <div className="border-r border-gray-800">
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Document No. :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="documentNo"
                                                value={formData.documentNo}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Issuance No. :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="issuanceNo"
                                                value={formData.issuanceNo}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Date of Issue :</td>
                                        <td className="p-1">
                                            <input
                                                type="date"
                                                name="issueDate"
                                                value={formData.issueDate}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Reviewed by :</td>
                                        <td className="p-1">
                                            <input
                                                type="date"
                                                name="reviewedDate"
                                                value={formData.reviewedDate}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Page :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="page"
                                                value={formData.page}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Prepared By :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="preparedBy"
                                                value={formData.preparedBy}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-800">
                                        <td className="p-1 font-semibold border-r border-gray-800">Approved by :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="approvedBy"
                                                value={formData.approvedBy}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-1 font-semibold border-r border-gray-800">Issued :</td>
                                        <td className="p-1">
                                            <input
                                                type="text"
                                                name="issued"
                                                value={formData.issued}
                                                onChange={handleChange}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Middle column - Title */}
                        <div className="border-r border-gray-800 p-2">
                            <div className="text-center">
                                <h1 className="text-xl font-bold">AGI Greenpac Limited</h1>
                                <p className="text-sm mt-1">Unit :- AGI Speciality Glas Division</p>
                                <div className="mt-8">
                                    <p className="text-sm">
                                        <span className="font-bold">SCOPE : </span>
                                        <span className="uppercase">AGI / DEC / COATING</span>
                                    </p>
                                    <p className="text-sm mt-4">
                                        <span className="font-bold">TITLE : </span>
                                        <span className="uppercase">FIRST ARTICLE INSPECTION REPORT - COATING</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Logo */}
                        <div className="flex items-center justify-center">
                            <div className="text-center">
                                <div className="font-bold text-2xl">AGI</div>
                                <div className="text-sm font-bold">GREENPAC</div>
                                <div className="w-16 h-1 bg-black mx-auto mt-1 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Info Section */}
                <div className="border-x border-b border-gray-800">
                    <div className="grid grid-cols-3 text-sm">
                        <div className="border-r border-gray-800">
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Date: </span>
                                <input
                                    type="date"
                                    name="inspectionDate"
                                    value={formData.inspectionDate}
                                    onChange={handleChange}
                                    className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Product: </span>
                                <input
                                    type="text"
                                    name="product"
                                    value={formData.product}
                                    onChange={handleChange}
                                    className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="p-2">
                                <span className="font-semibold">Size No.: </span>
                                <input
                                    type="text"
                                    name="sizeNo"
                                    value={formData.sizeNo}
                                    onChange={handleChange}
                                    className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        <div className="border-r border-gray-800">
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Shift: </span>
                                <select
                                    name="shift"
                                    value={formData.shift}
                                    onChange={handleChange}
                                    className="px-2 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    {shiftOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Variant: </span>
                                <select
                                    name="variant"
                                    value={formData.variant}
                                    onChange={handleChange}
                                    className="px-2 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    {variantOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-2"></div>
                        </div>
                        <div>
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Line No.: </span>
                                <select
                                    name="lineNo"
                                    value={formData.lineNo}
                                    onChange={handleChange}
                                    className="px-2 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    {lineOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="border-b border-gray-800 p-2">
                                <span className="font-semibold">Customer: </span>
                                <input
                                    type="text"
                                    name="customer"
                                    value={formData.customer}
                                    onChange={handleChange}
                                    className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="p-2">
                                <span className="font-semibold">Sample Size: </span>
                                <input
                                    type="text"
                                    name="sampleSize"
                                    value={formData.sampleSize}
                                    onChange={handleChange}
                                    className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lacquer Table */}
                <div>
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2 w-12 bg-gray-200">S.No.</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">Lacquer / Dye</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">wt.</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">Batch No.</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.lacquers.map((lacquer, index) => (
                                <tr key={lacquer.id}>
                                    <td className="border border-gray-800 p-2 text-center">{lacquer.id}</td>
                                    <td className="border border-gray-800 p-2">
                                        <input
                                            type="text"
                                            value={lacquer.name}
                                            onChange={(e) => handleLacquerChange(index, 'name', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                    <td className="border border-gray-800 p-2 text-center">
                                        <input
                                            type="text"
                                            value={lacquer.weight}
                                            onChange={(e) => handleLacquerChange(index, 'weight', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                    <td className="border border-gray-800 p-2 text-center">
                                        <input
                                            type="text"
                                            value={lacquer.batchNo}
                                            onChange={(e) => handleLacquerChange(index, 'batchNo', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                    <td className="border border-gray-800 p-2 text-center">
                                        <input
                                            type="date"
                                            value={lacquer.expiryDate}
                                            onChange={(e) => handleLacquerChange(index, 'expiryDate', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Characteristics Table */}
                <div className="mt-px">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 p-2 w-12 bg-gray-200">S.No.</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">Characteristic</th>
                                <th className="border border-gray-800 p-2 bg-gray-200">
                                    <div>As per Reference sample no. X-211</div>
                                    <div>Observations</div>
                                </th>
                                <th className="border border-gray-800 p-2 bg-gray-200">Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.characteristics.map((char, index) => (
                                <tr key={char.id}>
                                    <td className="border border-gray-800 p-2 text-center">{char.id}</td>
                                    <td className="border border-gray-800 p-2">
                                        <input
                                            type="text"
                                            value={char.name}
                                            onChange={(e) => handleCharChange(index, 'name', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                    <td className="border border-gray-800">
                                        {char.id === 6 ? (
                                            <table className="w-full border-collapse">
                                                <tr>
                                                    <td className="border-b border-r border-gray-800 p-2 w-20 text-center font-semibold">Body</td>
                                                    <td className="border-b border-gray-800 p-2 text-center">
                                                        <input
                                                            type="text"
                                                            value={char.bodyThickness}
                                                            onChange={(e) => handleCharChange(index, 'bodyThickness', e.target.value)}
                                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-r border-gray-800 text-center font-semibold">Bottom</td>
                                                    <td className="p-2 text-center">
                                                        <input
                                                            type="text"
                                                            value={char.bottomThickness}
                                                            onChange={(e) => handleCharChange(index, 'bottomThickness', e.target.value)}
                                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                        />
                                                    </td>
                                                </tr>
                                            </table>
                                        ) : (
                                            <input
                                                type="text"
                                                value={char.observation}
                                                onChange={(e) => handleCharChange(index, 'observation', e.target.value)}
                                                className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                        )}
                                    </td>
                                    <td className="border border-gray-800 p-2">
                                        <input
                                            type="text"
                                            value={char.comments}
                                            onChange={(e) => handleCharChange(index, 'comments', e.target.value)}
                                            className="w-full px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="border-x border-b border-gray-800">
                    <div className="flex justify-between items-center p-4">
                        <div className="flex items-center">
                            <div className="font-semibold mr-2">QA Exe.</div>
                            <div className="w-16">
                                <img src={QASign} alt="sign" />
                            </div>
                        </div>
                        <div></div>
                        <div className="flex items-center">
                            <div className="font-semibold mr-2">Production Sup. / Operator:</div>
                            <div className="w-16">
                                <img src={OperatorSign} alt="sign" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 border-t border-gray-800 p-4">
                        <span className="font-semibold">Time (Final Approval) : </span>
                        <input
                            type="text"
                            name="finalApprovalTime"
                            value={formData.finalApprovalTime}
                            onChange={handleChange}
                            className="px-1 py-0 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="p-4 bg-gray-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Save Inspection Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditableInspectionForm;