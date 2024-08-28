"use client";

import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const MultiSelectDropdown = ({ options }) => {
  const [selectedTests, setSelectedTests] = useState([]);

  const handleSelect = (selectedList) => {
    setSelectedTests(selectedList);
  };

  const handleRemove = (selectedList) => {
    setSelectedTests(selectedList);
  };

  const handle=()=>{
    console.log(selectedTests);
    console.log(JSON.stringify(selectedTests.map((test) => test.name)))
  }
  return (
    <>
      <Multiselect
        options={options.map((test) => ({ name: test.testName, id: test._id }))}
        selectedValues={selectedTests}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue="name"
        showCheckbox={true}
        placeholder="Select tests"
        style={{
          multiselectContainer: {
            width: "100%",
            backgroundColor: "var(--bg)",
            color: "var(--text)",
            border: "2px solid #2e374a",
            borderRadius: "5px",
            marginBottom: "30px",
            padding: "15px",
          },
          searchBox: {
            padding: "0px",
          },
          inputField: {
            color: "var(--text)",
            backgroundColor: "var(--bg)",
          },
          chips: {
            background: "light-blue",
            color: "var(--text)",
            borderRadius: "5px",
          },
          optionContainer: {
            backgroundColor: "var(--bg)",
            color: "var(--text)",
          },
        }}
      />
      {/* Hidden input to store selected values as JSON to submit in form */}
      <input
        type="hidden"
        name="tests"
        value={JSON.stringify(selectedTests.map((test) => test.name))}
      />
    </>
  );
};

export default MultiSelectDropdown;
