import {
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { PhoneRow } from '../api/session.supabase';

import { UseEditor } from '../hooks/useEditor';
import { usePhoneRegister } from '../hooks/useRegister';

export type PhoneEditorProps = {
  editor: UseEditor<PhoneRow>;
};

export const PhoneEditor = (props: PhoneEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors } = editor;
  const { registerPhone, registerCatalog } = usePhoneRegister({ editor });
  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.catalog != null}>
        <FormLabel htmlFor="catalog">Type</FormLabel>
        <Input
          id="catalog"
          placeholder="Please enter catalog"
          {...registerCatalog}
        />
        <FormErrorMessage>
          {errors.catalog && errors.catalog.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.phone != null}>
        <FormLabel htmlFor="phone">Phone</FormLabel>
        <Input id="phone" placeholder="Please enter phone" {...registerPhone} />
        <FormErrorMessage>
          {errors.phone && errors.phone.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export type PhoneDrawerProps = {
  editor: UseEditor<PhoneRow>;
};

export const PhoneDrawer = (props: PhoneDrawerProps): JSX.Element => {
  const { editor } = props;
  const { editModeName, isLoading, isOpenDrawer, onCloseDrawer, onSubmit } =
    editor;

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
          {editModeName} Phone
        </DrawerHeader>
        <DrawerBody>
          <PhoneEditor editor={editor} />
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
            colorScheme="blue"
            onClick={onSubmit}
            isLoading={isLoading}
            loadingText="Submitting"
            variant={isLoading ? 'outline' : 'solid'}
          >
            {editModeName}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export type PhoneModalProps = {
  editor: UseEditor<PhoneRow>;
};

export const PhoneModal = (props: PhoneModalProps): JSX.Element => {
  const { editor } = props;
  const { onSubmit, isOpenModal, onCloseModal } = editor;

  return (
    <Modal isCentered size="3xl" isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editor.editModeName} Phone</ModalHeader>

        <ModalBody>
          <PhoneEditor editor={editor} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button colorScheme={editor.editModeColor} onClick={onSubmit}>
            {editor.editModeName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
