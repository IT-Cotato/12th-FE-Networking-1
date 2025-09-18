import { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchStore } from "../stores/searchStore";
import { useShallow } from "zustand/shallow";

const SearchBox = () => {
  const [value, setValue] = useState<string>("");
  const debouncedTerm = useDebounce(value, 500);

  const { setSearchTerm } = useSearchStore(
    useShallow((state) => ({
      setSearchTerm: state.setSearchTerm,
    }))
  );

  useEffect(() => {
    setSearchTerm(debouncedTerm);
  }, [setSearchTerm, debouncedTerm]);

  return (
    <InputField
      inputType="text"
      placeholder="검색..."
      name="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ marginBottom: "16px", width: "100%" }}
    />
  );
};

export default SearchBox;
