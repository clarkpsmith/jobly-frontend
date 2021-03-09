import React, { useState } from "react";
import "./SearchForm.css";

import { Button } from "reactstrap";

const SearchForm = ({ search }) => {
  const initialData = {
    searchTerm: "",
  };
  const [formData, setFormData] = useState(initialData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({
      [name]: value,
    }));
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    await search(formData.searchTerm);
  };

  return (
    <div className="SearchForm m-4">
      <form className="SearchForm-form form-inline " onSubmit={handleSubmit}>
        <input
          className="SearchForm-input flex-grow-1"
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Enter search term..."
          value={FormData.searchTerm}
          onChange={handleChange}
        />
        <Button size="sm" color="primary" className="SearchForm-btn">
          Submit
        </Button>
      </form>
    </div>
  );
};
export default SearchForm;
