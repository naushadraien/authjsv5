"use client";
import ReusableTable from "@/components/ReusableTable";
import { tableData } from "@/constants/data";
import React from "react";

const TestTable = () => {
  const handleTableRowClick = (id: string) => {
    console.log(id);
  };
  return (
    <ReusableTable
      tableData={tableData}
      onClickTableRow={handleTableRowClick}
    />
  );
};

export default TestTable;
