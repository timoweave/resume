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
  GridItem,
  Switch,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  ButtonGroup,
  IconButton,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { EducationRow } from '../api/session.supabase';
import {
  FieldErrors,
  FieldValues,
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { UseEditor } from '../hooks/useEditor';
import { SchoolIcon } from './Icon';
import { useEducationRegister } from '../hooks/useRegister';

export type UseEducationEditor<TEducationRow extends FieldValues> = {
  onSubmit: (values: TEducationRow) => VideoEncoderBitrateMode;
  handleSubmit: UseFormHandleSubmit<TEducationRow, undefined>;
  register: UseFormRegister<TEducationRow>;
  errors: FieldErrors<TEducationRow>;
  formState: FormState<TEducationRow>;
  isLoading: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type EducationBodyProps = {
  row: EducationRow;
  editor?: UseEditor<EducationRow>;
};

export const EducationBody = (props: EducationBodyProps): JSX.Element => {
  const { row, editor } = props;

  return (
    <Card w="100%" variant="unstyled">
      <CardBody>
        <Flex>
          <Heading size="sm">{row.major}</Heading>
          <Spacer />
          {editor != null && (
            <ButtonGroup spacing="2">
              <IconButton
                icon={<DeleteIcon />}
                aria-label="delete"
                variant="ghost"
                size="xs"
                title={`Delete ${row.major}`}
                onClick={() => editor.onOpenModal('DELETE', row)}
              />
              <IconButton
                icon={<EditIcon />}
                aria-label="update"
                variant="ghost"
                size="xs"
                title={`Update ${row.major}`}
                onClick={() => editor.onOpenDrawer('UPDATE', row)}
              />
            </ButtonGroup>
          )}
        </Flex>
        <Grid templateColumns="repeat(2,1fr)" gap={5}>
          <Text size="sm">{row.degree}</Text>
          <Text>{row.school}</Text>
        </Grid>
        <Grid templateColumns="repeat(2,1fr)" gap={5}>
          <Text>{row.start}</Text>
          <Text>{row.is_ongoing ? 'Current' : row.end}</Text>
        </Grid>
      </CardBody>
    </Card>
  );
};

export type EducationCardProps = {
  row: EducationRow;
  editor: UseEditor<EducationRow>;
};

export const EducationCard = (props: EducationCardProps): JSX.Element => {
  const { row, editor } = props;

  return (
    <Card m="0.8rem" mt="1rem" variant="unstyled">
      <CardBody>
        <Grid templateColumns="0.5rem 1fr" gap={6}>
          <GridItem>
            <SchoolIcon />
          </GridItem>
          <GridItem>
            <EducationBody row={row} editor={editor} />
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export type EducationEditorProps = {
  editor: UseEditor<EducationRow>;
};

export const EducationEditor = (props: EducationEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors } = editor;
  const {
    registerSchool,
    registerDegree,
    registerMajor,
    registerStart,
    registerEnd,
    registerIsOngoing,
  } = useEducationRegister({ editor });

  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.school != null}>
        <FormLabel htmlFor="school">School</FormLabel>
        <Input
          id="school"
          placeholder="Please enter school name"
          {...registerSchool}
        />
        <FormErrorMessage>
          {errors.school && errors.school.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.degree != null}>
        <FormLabel htmlFor="degree">Degree</FormLabel>
        <Input
          id="degree"
          placeholder="Please enter degree"
          {...registerDegree}
        />
        <FormErrorMessage>
          {errors.degree && errors.degree.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.major != null}>
        <FormLabel htmlFor="major">Major</FormLabel>
        <Input id="major" placeholder="Please enter major" {...registerMajor} />
        <FormErrorMessage>
          {errors.major && errors.major.message}
        </FormErrorMessage>
      </FormControl>

      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <FormControl isInvalid={errors.start != null}>
          <FormLabel htmlFor="start">Start</FormLabel>
          <Input
            type="date"
            id="start"
            placeholder="Please enter start date"
            {...registerStart}
          />
          <FormErrorMessage>
            {errors.start && errors.start.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.end != null}>
          <FormLabel htmlFor="end">End</FormLabel>
          <Input
            type="date"
            id="end"
            placeholder="Please enter end date"
            {...registerEnd}
          />
          <FormErrorMessage>
            {errors.end && errors.end.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.is_ongoing != null}>
          <FormLabel htmlFor="is_ongoing">Current</FormLabel>
          <Box pt="0.5rem">
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

export type EducationDrawerProps = {
  editor: UseEditor<EducationRow>;
};

export const EducationDrawer = (props: EducationDrawerProps): JSX.Element => {
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
        <DrawerHeader borderBottomWidth="0.1rem">
          {editor.editModeName} Education
        </DrawerHeader>
        <DrawerBody>
          <EducationEditor editor={editor} />
        </DrawerBody>

        <DrawerFooter borderTopWidth="0.1rem">
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
            onClick={onSubmit}
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

export type EducationModalProps = {
  editor: UseEditor<EducationRow>;
};

export const EducationModal = (props: EducationModalProps): JSX.Element => {
  const { editor } = props;
  const { onSubmit, row, isOpenModal, onCloseModal } = editor;

  return (
    <Modal isCentered size="3xl" isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {editor.editModeName}
          Education
        </ModalHeader>

        <ModalBody>
          <EducationBody row={row} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button colorScheme={editor.editModeColor} mr={3} onClick={onSubmit}>
            {editor.editModeName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
