import React from 'react';
import { extractAllData } from '../../../utils';

// Display value function
const displayValue = (value) => (value && value !== '-' ? value : '-');

// PEI component
const PEI = ({ jsonData }) => {

    const peiData = extractAllData(jsonData).pei;


    if (peiData !== null) {
        return (
        <div className="space-y-8">
            <div className='flex mb-3 font-bold text-white bg-slate-600 h-full pl-1 text-sm sm:text-base shadow-md'>
                <h2 className='my-1'>Portable Executable Info:</h2>
            </div>

            {/* Header Section */}
            {Object.keys(peiData.Header).length > 0 && (
                <div>
                    <h4 className="mb-4 text-white">Header</h4>
                    <table className="min-w-full border border-gray-300 bg-transparent">
                        <tbody>
                            {Object.entries(peiData.Header).map(([key, value], index) => (
                                <tr key={index}>
                                    <th className="bg-gray-900 shadow-md border px-4 py-2 text-left font-medium text-white">
                                        {key}
                                    </th>
                                    <td className="bg-gray-900 shadow-md border px-4 py-2 text-white">
                                        {displayValue(value)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Sections Section */}
            {peiData.Sections.Rows.length > 0 && (
                <div>
                    <h4 className="mb-4 text-white">Sections</h4>
                    <table className="min-w-full border border-gray-300 bg-transparent">
                        <thead>
                            <tr className="bg-gray-900 shadow-md">
                                {peiData.Sections.Header.map((header, index) => (
                                    <th
                                        key={index}
                                        className="px-4 py-2 text-left font-medium text-white border"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {peiData.Sections.Rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-gray-800">
                                    {Object.values(row).map((value, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-4 py-2 text-white border"
                                        >
                                            {displayValue(value)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Imports Section */}
            {peiData.Imports.length > 0 && (
                <div>
                    <h4 className="mb-4 text-white">Imports</h4>
                    <table className="min-w-full border border-gray-300 bg-transparent">
                        <thead>
                            <tr className="bg-gray-900 shadow-md">
                                <th className="border px-4 py-2 text-left font-medium text-white">
                                    Library Name
                                </th>
                                <th className="border px-4 py-2 text-left font-medium text-white">
                                    Function Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {peiData.Imports.map((row, index) => (
                                <tr key={index} className='hover:bg-gray-800'>
                                    <td className="border px-4 py-2 text-white">{row['Library Name']}</td>
                                    <td className="border px-4 py-2 text-white">{row['Function Name']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
};

export default PEI;
