"use client";
import React, { useState } from "react";

type TableHeader = {
  key: string;
  label: string;
};

type TableBody = {
  [key: string]: React.ReactNode | string;
};

export type TableData = {
  headers: TableHeader[];
  body: TableBody[];
};

type ReusableTableProps = {
  tableData: TableData;
};

const ReusableTable: React.FC<ReusableTableProps> = ({ tableData }) => {
  const [sortedData, setSortedData] = useState(tableData.body);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }

    const sortedArray = [...sortedData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if ((aValue ?? "") < (bValue ?? "")) {
        return direction === "asc" ? -1 : 1;
      }
      if ((aValue ?? "") > (bValue ?? "")) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sortedArray);
    setSortConfig({ key, direction });
  };

  console.log("selected rows", selectedRows);

  const handleHeaderCheckboxChange = () => {
    if (isAllSelected) {
      setSelectedRows([]);
    } else {
      const allRowIndexes = sortedData.map((_, index) => index);
      setSelectedRows(allRowIndexes);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleRowCheckboxChange = (rowIndex: number) => {
    if (selectedRows.includes(rowIndex)) {
      setSelectedRows(selectedRows.filter((index) => index !== rowIndex));
    } else {
      setSelectedRows([...selectedRows, rowIndex]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-r border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleHeaderCheckboxChange}
              />
            </th>
            <th className="px-4 py-2 border-b border-r border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600">
              <p>S.N.</p>
            </th>
            {tableData.headers.map((header) => (
              <th
                key={header.key}
                className="px-4 py-2 border-b border-r border-gray-200 bg-gray-100 text-left text-sm font-medium text-gray-600"
              >
                {header.label}
                <button
                  onClick={() => handleSort(header.key)}
                  className="ml-2 text-blue-500"
                >
                  sort
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={`hover:bg-gray-50 even:bg-gray-100`}>
              {/* <tr key={rowIndex} className={`hover:bg-gray-50 ${rowIndex %2 === 0 ? 'bg-gray-100' : ''}`}> */}
              <td className="px-4 py-2 border-b border-r border-gray-200 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(rowIndex)}
                  onChange={() => handleRowCheckboxChange(rowIndex)}
                />
              </td>
              <td className="px-4 py-2 border-b border-r border-gray-200 text-sm text-gray-700">
                <p>{rowIndex + 1 + "."}</p>
              </td>
              {tableData.headers.map((header) => (
                <td
                  key={header.key}
                  className="px-4 py-2 border-b border-r border-gray-200 text-sm text-gray-700"
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReusableTable;
