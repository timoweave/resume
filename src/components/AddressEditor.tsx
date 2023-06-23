import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Grid,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { AddressRow } from '../api/session.supabase';

import { UseEditor } from '../hooks/useEditor';
import { useAddressRegister } from '../hooks/useRegister';

export type AddressEditorProps = {
  editor: UseEditor<AddressRow>;
};

export const AddressEditor = (props: AddressEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors } = editor;
  const {
    registerStreet,
    registerCity,
    registerState,
    registerZipCode,
    registerIsOngoing,
  } = useAddressRegister({ editor });
  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.street != null}>
        <FormLabel htmlFor="street">Street</FormLabel>
        <Input
          id="street"
          placeholder="Please enter street name"
          {...registerStreet}
        />
        <FormErrorMessage>
          {errors.street && errors.street.message}
        </FormErrorMessage>
      </FormControl>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <FormControl isInvalid={errors.city != null}>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input id="city" placeholder="Please enter city" {...registerCity} />
          <FormErrorMessage>
            {errors.city && errors.city.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.state != null}>
          <FormLabel htmlFor="state">State</FormLabel>
          <Input
            id="state"
            placeholder="Please enter state"
            {...registerState}
          />
          <FormErrorMessage>
            {errors.state && errors.state.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.zip_code != null}>
          <FormLabel htmlFor="zip_code">Zip Code</FormLabel>
          <Input
            type="text"
            id="zip_code"
            placeholder="Please enter zip_code"
            {...registerZipCode}
          />
          <FormErrorMessage>
            {errors.zip_code && errors.zip_code.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.is_ongoing != null}>
          <FormLabel htmlFor="is_ongoing">Current</FormLabel>
          <Box pt="5px">
            <Switch size="lg" id="is_ongoing" {...registerIsOngoing} />
          </Box>

          <FormErrorMessage>
            {errors.is_ongoing && errors.is_ongoing.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>
    </Stack>
  );
};

export type AddressDrawerProps = {
  editor: UseEditor<AddressRow>;
};

export const AddressDrawer = (props: AddressDrawerProps): JSX.Element => {
  const { editor } = props;
  const { isLoading, isOpenDrawer, onCloseDrawer, onSubmit } = editor;

  return (
    <Drawer
      size="lg"
      isOpen={isOpenDrawer}
      placement="right"
      onClose={onCloseDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader borderBottomWidth="1px">
          {editor.editModeName} Address
        </DrawerHeader>
        <DrawerBody>
          <AddressEditor editor={editor} />
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button
            leftIcon={<CloseIcon />}
            variant="outline"
            mr={3}
            onClick={onCloseDrawer}
          >
            Cancel
          </Button>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={editor.editModeColor}
            onClick={(e) => {
              onSubmit(e);
            }}
            isLoading={isLoading}
            loadingText="Submitting"
            variant={isLoading ? 'outline' : 'solid'}
          >
            {editor.editModeName}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export type AddressModalProps = {
  editor: UseEditor<AddressRow>;
};

export const AddressModal = (props: AddressModalProps): JSX.Element => {
  const { editor } = props;
  const { editModeName, onSubmit, isOpenModal, onCloseModal } = editor;

  return (
    <Modal isCentered size="3xl" isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>

        <ModalBody>
          <AddressEditor editor={editor} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={onSubmit}>
            {editModeName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
