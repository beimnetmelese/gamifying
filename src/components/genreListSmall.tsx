import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

interface genre {
  id: number;
  name: string;
  image_background: string;
}

interface Props {
  errors: string;
  genres: genre[];
  selected_genre: genre | null;
  onclick: (id: genre) => void;
}

function GenreListSmall({ errors, genres, selected_genre, onclick }: Props) {
  return (
    <>
      {errors && <Text> {errors}</Text>}
      <Menu>
        <MenuButton width={"226px"} as={Button} rightIcon={<ChevronDownIcon />}>
          {selected_genre === null ? "Genre" : selected_genre?.name}
        </MenuButton>
        <MenuList>
          {genres.map((genre) => (
            <MenuItem key={genre.id} onClick={() => onclick(genre)}>
              <Box>{genre.name}</Box>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default GenreListSmall;
