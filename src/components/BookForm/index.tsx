// @ts-nocheck
import React from "react";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VisuallyHidden,
  Textarea,
  chakra,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Portal,
  useMergeRefs,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";

import { IBook } from "../../types";

interface BookFormProps extends Partial<IBook> {}

const BookForm = (props: BookFormProps) => {
  const { coverURL } = props;

  const { register, errors } = useFormContext();

  const uploadImageRef = React.useRef<HTMLInputElement>(null);

  const [preview, setPreview] = React.useState(coverURL);

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, []);

  const uploadRef = useMergeRefs(register, uploadImageRef);

  return (
    <Box display="flex" flexWrap="wrap">
      <Box
        mr="12"
        display="flex"
        justifyContent="center"
        width={{
          sm: "full",
          md: "auto",
        }}
        mb={{
          md: "0",
          sm: "12",
        }}
      >
        <VisuallyHidden>
          <input
            type="file"
            name="cover"
            multiple={false}
            ref={uploadRef}
            onChange={(e) => {
              setPreview((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                const target = e.target.files[0];
                if (target) {
                  return URL.createObjectURL(target);
                }
                return null;
              });
            }}
          />
        </VisuallyHidden>
        {preview ? (
          <Box
            width="56"
            rounded="md"
            h="72"
            overflow="hidden"
            position="relative"
          >
            <Menu placement="bottom-end">
              <MenuButton
                as={IconButton}
                icon={<FiEdit2 strokeWidth={2} />}
                size="sm"
                position="absolute"
                right={4}
                top={4}
              ></MenuButton>
              <Portal>
                <MenuList minWidth="48">
                  <MenuItem
                    onClick={() => {
                      uploadImageRef.current.click();
                    }}
                  >
                    Upload
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
            <chakra.img
              objectFit="cover"
              h="full"
              maxWidth="auto"
              maxHeight="auto"
              w="full"
              src={preview}
            ></chakra.img>
          </Box>
        ) : (
          <Box
            width="56"
            rounded="md"
            h="72"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderStyle="dashed"
            borderWidth="3px"
            borderColor="gray.400"
          >
            <Button onClick={() => void uploadImageRef.current.click()}>
              Unggah Gambar
            </Button>
          </Box>
        )}
      </Box>
      <Box flexGrow={1}>
        <FormControl id="title" mb="5">
          <FormLabel>Judul Buku</FormLabel>
          <Input
            spellCheck={false}
            type="text"
            name="title"
            placeholder="Judul"
            ref={register}
            autoComplete="off"
            defaultValue={props.title}
          />
        </FormControl>
        <FormControl id="author" mb="5">
          <FormLabel>Pengarang</FormLabel>
          <Input
            spellCheck={false}
            type="text"
            name="author"
            placeholder="Pengarang"
            ref={register}
            autoComplete="off"
            defaultValue={props.autho}
          />
        </FormControl>
        <FormControl
          isInvalid={errors.releaseYear?.message}
          id="releaseYear"
          mb="5"
        >
          <FormLabel>Tahun Terbit</FormLabel>
          <Input
            spellCheck={false}
            type="text"
            name="releaseYear"
            placeholder="Tahun Terbit"
            ref={register}
            autoComplete="off"
            defaultValue={props.releaseYear}
          />
          <FormErrorMessage>{errors.releaseYear?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="synopsis" mb="5">
          <FormLabel>Sinopsis</FormLabel>
          <Textarea
            placeholder="Sinopsis"
            name="synopsis"
            ref={register}
            autoComplete="off"
            defaultValue={props.synopsis}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default BookForm;
