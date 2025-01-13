import { Typography } from "antd";
import { useState } from "react";
import SearchForm from "../../../components/SearchForm";
import PlayersList from "./PlayersList";

const TransferList = () => {
  const { Title } = Typography;

  const [filters, setFilters] = useState({});

  const handleSearch = (values) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(
        ([, value]) => value !== undefined && value !== ""
      )
    );
    setFilters(filteredValues);
  };

  const handleClear = () => {
    setFilters({});
  };

  return (
    <>
      <div className="p-2">
        <div className="mb-2">
          <Title level={3}>Transfer Market</Title>
        </div>
        <div className="mb-2 mt-2 p-2">
          <SearchForm onSearch={handleSearch} onClear={handleClear} />
        </div>
        <PlayersList filters={filters} />
      </div>
    </>
  );
};

export default TransferList;
