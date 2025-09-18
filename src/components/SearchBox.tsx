import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchStore } from "../stores/searchStore";
import { useShallow } from "zustand/shallow";
import InputField from "./global/InputField";

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
    />
  );
};

export default SearchBox;
