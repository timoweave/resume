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
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  Grid,
  Switch,
  Heading,
  Flex,
  Card,
  CardBody,
  ButtonGroup,
  Spacer,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CloseIcon } from '@chakra-ui/icons';
import { ExperienceRow } from '../api/session.supabase';

import { UseEditor } from '../hooks/useEditor';
import { WorkIcon } from './Icon';
import { useExperienceRegister } from '../hooks/useRegister';

export type ExperienceBodyProps = {
  row: ExperienceRow;
  editor?: UseEditor<ExperienceRow>;
};

export const ExperienceBody = (props: ExperienceBodyProps): JSX.Element => {
  const { row, editor } = props;

  return (
    <Card w="100%" variant="unstyled">
      <CardBody>
        <Flex>
          <Heading size="sm">{row.title}</Heading>
          <Spacer />
          {editor != null && (
            <ButtonGroup spacing="2">
              <IconButton
                icon={<DeleteIcon />}
                aria-label="delete"
                variant="ghost"
                size="xs"
                title={`Delete ${row.title}`}
                onClick={() => editor.onOpenModal('DELETE', row)}
              />
              <IconButton
                icon={<EditIcon />}
                aria-label="update"
                variant="ghost"
                size="xs"
                title={`Update ${row.title}`}
                onClick={() => editor.onOpenDrawer('UPDATE', row)}
              />
            </ButtonGroup>
          )}
        </Flex>
        <Grid templateColumns="repeat(2,1fr)" gap={6}>
          <Text size="sm">{row.company}</Text>
          <Text>{row.city}</Text>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap={5}>
          <Text>{row.start}</Text>
          <Text>{row.is_ongoing ? 'Current' : row.end}</Text>
        </Grid>
        <UnorderedList>
          {row.description
            .split(/\n/)
            .filter((line) => line.trim().length > 0)
            .map((line, index) => (
              <ListItem key={index}>{line}</ListItem>
            ))}
        </UnorderedList>
      </CardBody>
    </Card>
  );
};

export type ExperienceCardProps = {
  row: ExperienceRow;
  editor: UseEditor<ExperienceRow>;
};

export const ExperienceCard = (props: ExperienceCardProps): JSX.Element => {
  const { row, editor } = props;

  return (
    <Card m="0.8rem" mt="1rem" variant="unstyled">
      <CardBody>
        <Grid templateColumns="1rem 1fr" gap={6}>
          <GridItem>
            <WorkIcon />
          </GridItem>
          <GridItem>
            <Flex>
              <ExperienceBody row={row} editor={editor} />
              <Spacer />
            </Flex>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export type ExperienceEditorProps = {
  editor: UseEditor<ExperienceRow>;
};

export const ExperienceEditor = (props: ExperienceEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors, register } = editor;
  const {
    registerTitle,
    registerCompany,
    registerCity,
    registerStart,
    registerEnd,
    registerIsOngoing,
  } = useExperienceRegister({ editor });

  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.title != null}>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          id="title"
          placeholder="Please enter title name"
          {...registerTitle}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.company != null}>
        <FormLabel htmlFor="company">Company</FormLabel>
        <Input
          id="company"
          placeholder="Please enter company"
          {...registerCompany}
        />
        <FormErrorMessage>
          {errors.company && errors.company.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.city != null}>
        <FormLabel htmlFor="city">City</FormLabel>
        <Input id="city" placeholder="Please enter city" {...registerCity} />
        <FormErrorMessage>
          {errors.city && errors.city.message}
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

      <FormControl isInvalid={errors.description != null}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Box w="100%">
          <Textarea
            id="description"
            placeholder="Please enter description"
            {...register('description', {
              required: 'description is required',
              minLength: {
                value: 2,
                message: 'Minimum length should be 2',
              },
            })}
            width="100%"
            height="400px"
            resize="vertical"
          />
        </Box>
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export type ExperienceDrawerProps = {
  editor: UseEditor<ExperienceRow>;
};

export const ExperienceDrawer = (props: ExperienceDrawerProps): JSX.Element => {
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
          {editor.editModeName} Experience
        </DrawerHeader>
        <DrawerBody>
          <ExperienceEditor editor={editor} />
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

export type ExperienceModalProps = {
  editor: UseEditor<ExperienceRow>;
};

export const ExperienceModal = (props: ExperienceModalProps): JSX.Element => {
  const { editor } = props;
  const { row, isOpenModal, onCloseModal, onSubmit } = editor;

  return (
    <Modal isCentered size="3xl" isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editor.editModeName} Experience</ModalHeader>

        <ModalBody>
          <ExperienceBody row={row} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button
            colorScheme={editor.editModeColor}
            mr={3}
            onClick={onSubmit}
          >
            {editor.editModeName}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
