import React, { useState} from "react";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import "./Filter.css";

export default function Filter(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {

    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
    props.setFunction(value);
  }

  return (
    <div>
      <ReactMultiSelectCheckboxes
        className="filter-checkbox"
        options={[{ label: "All", value: "*" }, ...props.filterData]}
        placeholderButtonLabel={props.filterTitle}
        getDropdownButtonLabel={getDropdownButtonLabel}
        value={selectedOptions}
        onChange={onChange}
        setState={setSelectedOptions}
      />
    </div>
  );
}