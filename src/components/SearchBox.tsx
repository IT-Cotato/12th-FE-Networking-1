import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDebounce } from "../hooks/useDebounce";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    console.log(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <InputField
      inputType="text"
      placeholder="검색..."
      name="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: "16px", width: "100%" }}
    />
  );
};

export default SearchBox;
