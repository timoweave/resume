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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { SkillRow } from '../api/session.supabase';

import { UseEditor } from '../hooks/useEditor';
import { useSkillRegister } from '../hooks/useRegister';

export type SkillCardProps = {
  row: SkillRow;
  editor?: UseEditor<SkillRow>;
};

export const SkillCard = (props: SkillCardProps): JSX.Element => {
  const { row, editor } = props;

  return (
    <Card m="5px">
      <CardHeader>
        <Heading size="sm">{row.skill}</Heading>
      </CardHeader>

      <CardBody>
        <Text>{row.skill}</Text>
      </CardBody>

      {editor != null && (
        <CardFooter justify="end">
          <ButtonGroup spacing="2">
            <IconButton icon={<DeleteIcon />} aria-label="delete" />
            <IconButton icon={<EditIcon />} aria-label="edit" />
          </ButtonGroup>
        </CardFooter>
      )}
    </Card>
  );
};

export type SkillEditorProps = {
  editor: UseEditor<SkillRow>;
};

export const SkillEditor = (props: SkillEditorProps): JSX.Element => {
  const { editor } = props;
  const { errors } = editor;
  const { registerSkill } = useSkillRegister({ editor });

  return (
    <Stack spacing="1rem" mt="1rem">
      <FormControl isInvalid={errors.skill != null}>
        <FormLabel htmlFor="skill">Skill</FormLabel>
        <Input id="kill" placeholder="Please enter skill" {...registerSkill} />
        <FormErrorMessage>
          {errors.skill && errors.skill.message}
        </FormErrorMessage>
      </FormControl>
    </Stack>
  );
};

export type SkillDrawerProps = {
  editor: UseEditor<SkillRow>;
};

export const SkillDrawer = (props: SkillDrawerProps): JSX.Element => {
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
          {editor.editModeName} Skill
        </DrawerHeader>
        <DrawerBody>
          <SkillEditor editor={editor} />
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

export type SkillModalProps = {
  editor: UseEditor<SkillRow>;
};

export const SkillModal = (props: SkillModalProps): JSX.Element => {
  const { editor } = props;
  const { isOpenModal, onCloseModal } = editor;

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>

        <ModalBody>
          <SkillEditor editor={editor} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onCloseModal}>
            Close
          </Button>
          <Button colorScheme="blue">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
