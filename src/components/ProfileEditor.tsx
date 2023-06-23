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
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  ButtonGroup,
  IconButton,
  Flex,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';

import { ProfileRow } from '../api/session.supabase';

import { UseEditor } from '../hooks/useEditor';
import { UseEditorList } from '../hooks/useEditorList';
import { PhoneEditor } from './PhoneEditor';
import { AddressEditor } from './AddressEditor';
import { PersonIcon } from './Icon';
import { UseSupabaseSession } from '../hooks/useSupabaseSession';
import { useProfileRegister } from '../hooks/useRegister';

export type ProfileBodyProps = {
  row: ProfileRow;
  session: UseSupabaseSession;
  resume: UseEditorList;
};

export const ProfileBody = (props: ProfileBodyProps): JSX.Element => {
  const { row, resume, session } = props;
  const { profileEditor, addressEditor, phoneEditor } = resume;
  const { addressDefault, phoneDefault } = session;

  return (
    <Card w="100%" variant="unstyled">
      <CardBody>
        <Grid templateColumns="1fr">
          <Flex>
            <Heading size="sm">
              {row.last_name} {row.first_name}
            </Heading>
            <Spacer />
            {profileEditor != null && (
              <ButtonGroup spacing="2">
                <IconButton
                  icon={<EditIcon />}
                  aria-label="edit"
                  variant="ghost"
                  size="xs"
                  title={`Update ${row.first_name}`}
                  onClick={() => {
                    phoneEditor.setEditMode('UPDATE');
                    phoneEditor.form.reset(phoneDefault ?? undefined);
                    addressEditor.setEditMode('UPDATE');
                    addressEditor.form.reset(addressDefault ?? undefined);
                    profileEditor.onOpenDrawer('UPDATE', row);
                  }}
                />
              </ButtonGroup>
            )}
          </Flex>
          {phoneDefault != null && <Text>{phoneDefault.phone}</Text>}
          {addressDefault != null && (
            <Flex>
              <Text>{addressDefault.street}</Text>
              <Spacer />
              <Text>{addressDefault.city}</Text>
              <Spacer />
              <Text>{addressDefault.state}</Text>
            </Flex>
          )}
        </Grid>
      </CardBody>
    </Card>
  );
};

export type ProfileCardProps = {
  row: ProfileRow;
  session: UseSupabaseSession;
  resume: UseEditorList;
};

export const ProfileCard = (props: ProfileCardProps): JSX.Element => {
  const { row, resume, session } = props;

  return (
    <Card m="10px" mt="12px" variant="unstyled">
      <CardBody>
        <Grid templateColumns="12px 1fr" gap={6}>
          <GridItem>
            <PersonIcon />
          </GridItem>
          <GridItem>
            <ProfileBody row={row} resume={resume} session={session} />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export type ProfileEditorProps = {
  editor: UseEditor<ProfileRow>;
};

export const ProfileEditor = (props: ProfileEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors } = editor;
  const { registerFirstName, registerLastName } = useProfileRegister({
    editor,
  });

  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.first_name != null}>
        <FormLabel htmlFor="first_name">First Name</FormLabel>
        <Input
          id="first_name"
          placeholder="Please enter first name"
          {...registerFirstName}
        />
        <FormErrorMessage>
          {errors.first_name && errors.first_name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.last_name != null}>
        <FormLabel htmlFor="last_name">Last Name</FormLabel>
        <Input
          id="last_name"
          placeholder="Please enter last name"
          {...registerLastName}
        />
        <FormErrorMessage>
          {errors.last_name && errors.last_name.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export type ProfileDrawerProps = {
  resume: UseEditorList;
};

export const ProfileDrawer = (props: ProfileDrawerProps): JSX.Element => {
  const { resume } = props;
  const { profileEditor, addressEditor, phoneEditor } = resume;
  const { isLoading, isOpenDrawer, onCloseDrawer } = profileEditor;

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
          {profileEditor.editModeName} Profile
        </DrawerHeader>
        <DrawerBody>
          <ProfileEditor editor={profileEditor} />
          <AddressEditor editor={addressEditor} />
          <PhoneEditor editor={phoneEditor} />
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
            colorScheme={profileEditor.editModeColor}
            onClick={(event) => {
              addressEditor.onSubmit(event);
              phoneEditor.onSubmit(event);
              profileEditor.onSubmit(event);
            }}
            isLoading={isLoading}
            loadingText="Submitting"
            variant={isLoading ? 'outline' : 'solid'}
          >
            {profileEditor.editModeName}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export type ProfileModalProps = {
  session: UseSupabaseSession;
  resume: UseEditorList;
};

export const ProfileModal = (props: ProfileModalProps): JSX.Element => {
  const { session, resume } = props;
  const { profileEditor } = resume;
  const { row, isOpenModal, onCloseModal } = profileEditor;

  return (
    <Modal isCentered size="3xl" isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{profileEditor.editModeName} Profile</ModalHeader>

        <ModalBody>
          <ProfileBody row={row} resume={resume} session={session} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button
            colorScheme={profileEditor.editModeColor}
            mr={3}
            onClick={onCloseModal}
          >
            {profileEditor.editModeName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
