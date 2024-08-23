import {
  Button,
  HStack,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface genre {
  id: number;
  name: string;
  image_background: string;
}

interface Props {
  errors: string;
  isLoading: Boolean;
  genres: genre[];
  selected_genre: genre | null;
  onclick: (id: genre) => void;
}

function GenreList({
  errors,
  isLoading,
  genres,
  selected_genre,
  onclick,
}: Props) {
  return (
    <>
      {errors && <Text> {errors}</Text>}
      {isLoading && <Spinner boxSize={"40px"}></Spinner>}
      {genres.map((genre) => (
        <List key={genre.id} padding={"5px"}>
          <ListItem>
            <HStack>
              <Image
                src={genre.image_background}
                boxSize={"32px"}
                borderRadius={8}
              />
              <Button
                fontWeight={selected_genre?.id == genre.id ? "bold" : "normal"}
                fontSize={"14px"}
                variant={"link"}
                onClick={() => onclick(genre)}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        </List>
      ))}
    </>
  );
}

export default GenreList;
