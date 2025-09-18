import styled from "styled-components";

const Wrap = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
`;

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <Wrap>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "제목/연도/평점 검색…"}
      />
    </Wrap>
  );
}
