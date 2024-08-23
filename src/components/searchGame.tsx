import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  onSubmit: (searchValue: string) => void;
}
function SearchGame({ onSubmit }: Props) {
  const searchInput = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (searchInput.current) onSubmit(searchInput.current.value);
        }}
      >
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            ref={searchInput}
            borderRadius={"20px"}
            placeholder="Search Game"
            variant={"filled"}
          />
        </InputGroup>
      </form>
    </>
  );
}

export default SearchGame;
