import {
  useDisclosure,
  ToastPosition,
  UseToastOptions,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import {
  DeepPartial,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { useBoolean, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import {
  TableEnum,
  updateRow,
  insertRow,
  deleteRow,
} from '../api/session.supabase';

export type UseEditor<TRow extends FieldValues> = {
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  register: UseFormRegister<TRow>;
  errors: FieldErrors<TRow>;
  isLoading: boolean;
  isOpenDrawer: boolean;
  onOpenDrawer: (mode: EditModeEnum, row?: TRow) => void;
  onCloseDrawer: () => void;
  isOpenModal: boolean;
  onOpenModal: (mode: EditModeEnum, row?: TRow) => void;
  onCloseModal: () => void;
  row: TRow;
  setRow: React.Dispatch<React.SetStateAction<TRow>>;
  editMode: EditModeEnum;
  setEditMode: React.Dispatch<React.SetStateAction<EditModeEnum>>;
  editModeName: string;
  editModeColor: string;
  form: UseFormReturn<TRow, undefined, undefined>;
};

export type UseEditorProps<TRow extends FieldValues> = {
  profileID: string | null;
  row?: TRow;
  setRowList: React.Dispatch<React.SetStateAction<TRow[]>>;
  table: TableEnum;
  bodyPhrase: (values: TRow) => string;
};

export type EditModeEnum = 'CREATE' | 'UPDATE' | 'DELETE' | 'NONE';

export const makeToastOptions = <TRow extends FieldValues>(props: {
  id: string;
  row: TRow;
  table: TableEnum;
  editModeName: string;
  bodyPhrase: (row: TRow) => string;
}): UseToastOptions => {
  const { id, table, row, editModeName, bodyPhrase } = props;
  return {
    id,
    title: `${editModeName} ${table}`,
    status: 'info',
    duration: null,
    variant: 'left-accent',
    isClosable: true,
    position: 'bottom' as ToastPosition,
    description: `${editModeName} ${bodyPhrase(row)} in progress...`,
  };
};

export const useEditor = <TRow extends FieldValues>(
  props: UseEditorProps<TRow>,
): UseEditor<TRow> => {
  const EMPTY_ROW = {} as TRow;
  const { table, bodyPhrase, setRowList, profileID } = props;
  const [row, setRow] = useState<TRow>(props.row ?? EMPTY_ROW);
  const [editMode, setEditMode] = useState<EditModeEnum>('NONE');
  const drawer = useDisclosure();
  const [isLoading, setIsLoading] = useBoolean();
  const toast = useToast();
  const form = useForm<TRow, undefined>({
    values: row,
    defaultValues: EMPTY_ROW as DeepPartial<TRow>,
  });

  const editModeName = useMemo(() => {
    const [first, ...others] = editMode.split('');
    return `${first}${others.join('').toLowerCase()}`;
  }, [editMode]);

  const editModeColor = useMemo(() => {
    switch (editMode) {
      case 'DELETE':
        return 'red';
      case 'CREATE':
        return 'green';
      case 'UPDATE':
        return 'blue';
      default:
        return 'unstyled';
    }
  }, [editMode]);

  const { handleSubmit, register, formState } = form;

  const isOpenDrawer = drawer.isOpen;
  const onCloseDrawer = drawer.onClose;
  const onOpenDrawer = (mode: EditModeEnum, row?: TRow): void => {
    if (row != null) {
      setRow(row);
      form.reset(row);
    }
    setEditMode(mode);
    drawer.onOpen();
  };

  const modal = useDisclosure();
  const isOpenModal = modal.isOpen;
  const onCloseModal = modal.onClose;
  const onOpenModal = (mode: EditModeEnum, row?: TRow): void => {
    if (row != null) {
      setRow(row);
      form.reset(row);
    }
    setEditMode(mode);
    modal.onOpen();
  };

  const { errors } = formState;

  const submit: SubmitHandler<TRow> = (row: TRow): void => {
    const rowWithProfileID = {
      ...row,
      profile_id: profileID,
    } as TRow;
    setIsLoading.on();
    const toastID: string = uuidv4();
    const toastOptions = makeToastOptions({
      row,
      table,
      bodyPhrase,
      editModeName,
      id: toastID,
    });
    toast(toastOptions);
    switch (editMode) {
      case 'UPDATE':
        updateRow({ table, row, setRowList }).then(() => {
          toast.update(toastID, {
            ...toastOptions,
            status: 'success',
            description: `Updated ${bodyPhrase(row)}!`,
          });
          setIsLoading.off();
        });
        break;
      case 'DELETE':
        deleteRow({ table, row, setRowList }).then(() => {
          toast.update(toastID, {
            ...toastOptions,
            status: 'success',
            description: `Deleted ${bodyPhrase(row)}!`,
          });
          setIsLoading.off();
        });
        break;
      case 'CREATE':
        insertRow({
          table,
          row: rowWithProfileID,
          setRowList,
        }).then(() => {
          toast.update(toastID, {
            ...toastOptions,
            status: 'success',
            description: `Inserted ${bodyPhrase(rowWithProfileID)}!`,
          });
          setIsLoading.off();
        });
        break;
      default:
    }
  };

  const onSubmit = handleSubmit(
    submit,
  ) as React.MouseEventHandler<HTMLButtonElement>;

  return {
    onSubmit,
    register,
    errors,
    isLoading,
    isOpenDrawer,
    onOpenDrawer,
    onCloseDrawer,
    isOpenModal,
    onOpenModal,
    onCloseModal,
    row,
    setRow,
    editMode,
    setEditMode,
    editModeName,
    editModeColor,
    form,
  };
};
