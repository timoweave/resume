import { Database } from './database.supabase';
import { FieldValues } from 'react-hook-form';
import {
  AuthChangeEvent,
  Provider,
  REALTIME_LISTEN_TYPES,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
  Session,
  User,
  AuthError,
  createClient,
} from '@supabase/supabase-js';

const { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URI } = import.meta.env;

export const supabaseClient = createClient<Database>(
  VITE_SUPABASE_URI,
  VITE_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  },
);

export const fetchSupabaseSession = (props: {
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}): (() => void) => {
  const { setSession } = props;

  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const {
    data: { subscription },
  } = supabaseClient.auth.onAuthStateChange(
    (_event: AuthChangeEvent, session: Session | null): void => {
      setSession(session);
    },
  );

  return (): void => {
    subscription.unsubscribe();
  };
};

export const signOut = async (props: {
  onSuccess?: () => void;
  onError?: (error: AuthError) => void;
}): Promise<void> => {
  const { onSuccess, onError } = props;
  const { error } = await supabaseClient.auth.signOut();

  if (error != null) {
    if (onError != null) {
      onError(error);
    } else {
      throw error;
    }
  }

  onSuccess != null && onSuccess();
};

export const signInWithEmail = async (props: {
  onSuccess: (
    data:
      | {
          user: User;
          session: Session;
        }
      | {
          user: null;
          session: null;
        },
  ) => void;
  onError?: (error: AuthError) => void;
}): Promise<void> => {
  const { onSuccess, onError } = props;
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  });

  if (error != null) {
    if (onError != null) {
      onError(error);
    } else {
      throw error;
    }
  }

  onSuccess != null && onSuccess(data);
};

export const signInWithOAuth = async (props: {
  provider: Provider;
  onError?: (error: AuthError) => void;
  onSuccess?: (
    data:
      | {
          provider: Provider;
          url: string;
        }
      | {
          provider: Provider;
          url: null;
        },
  ) => void;
}): Promise<void> => {
  const { provider, onError, onSuccess } = props;
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider,
  });

  if (error != null) {
    if (onError != null) {
      onError(error);
    } else {
      throw error;
    }
  }

  onSuccess != null && onSuccess(data);
};

export type TableEnum = keyof Database['public']['Tables'];

export type AddressRow = Database['public']['Tables']['address']['Row'];
export type ProfileRow = Database['public']['Tables']['profile']['Row'];
export type SkillRow = Database['public']['Tables']['skill']['Row'];
export type ExperienceRow = Database['public']['Tables']['experience']['Row'];
export type PhoneRow = Database['public']['Tables']['phone']['Row'];
export type LikeRow = Database['public']['Tables']['like']['Row'];
export type EducationRow = Database['public']['Tables']['education']['Row'];

export type FetchRowListProps<TRow extends FieldValues> = {
  table: TableEnum;
  id?: string | null;
  profileID?: string | null;
  setRowList: (rows: TRow[]) => void; // React.Dispatch<React.SetStateAction<TRow[]>> |  // TBD
};

export const fetchRowList = <TRow extends FieldValues>(
  props: FetchRowListProps<TRow>,
): void => {
  const { table, id, profileID, setRowList } = props;
  if (profileID == null && id == null) {
    throw new Error('must have non-null profileID or id');
  }

  let query = supabaseClient.from(table).select();

  if (profileID != null) {
    query = query.eq('profile_id', profileID);
  }
  if (id != null) {
    query = query.eq('id', id);
  }

  query.then(({ data, error }) => {
    if (error != null) {
      throw error;
    }
    if (data == null) {
      throw new Error(`${table} table return null`);
    }
    const rowList = (data ?? ([] as TRow[])) as unknown as TRow[];
    setRowList(rowList);
  });
};

export type UpdateRowListProps<TRow extends FieldValues> = {
  row: TRow;
  table: TableEnum;
  setRowList: React.Dispatch<React.SetStateAction<TRow[]>>;
};

export const updateRow = async <TRow extends FieldValues>(
  props: UpdateRowListProps<TRow>,
): Promise<void> => {
  const { row, table, setRowList } = props;

  const { error } = await supabaseClient
    .from(table)
    .update(row)
    .eq('id', row.id);
  if (error != null) {
    throw error;
  }

  setRowList((prevRowList: TRow[]): TRow[] => {
    const updatedRowList = prevRowList.map(
      (prevRow: TRow): TRow => (prevRow.id !== row.id ? prevRow : row),
    );

    return updatedRowList;
  });
};

export type InsertRowListProps<TRow extends FieldValues> = {
  row: TRow;
  table: TableEnum;
  setRowList: React.Dispatch<React.SetStateAction<TRow[]>>;
};

export const insertRow = async <TRow extends FieldValues>(
  props: InsertRowListProps<TRow>,
): Promise<void> => {
  const { row, table, setRowList } = props;

  const { error } = await supabaseClient.from(table).insert(row);
  if (error != null) {
    throw error;
  }

  setRowList((prevRowList: TRow[]) => [...prevRowList, row]);
};

export type DeleteRowListProps<TRow extends FieldValues> = {
  row: Partial<TRow>;
  table: TableEnum;
  setRowList: React.Dispatch<React.SetStateAction<TRow[]>>;
};

export const deleteRow = async <TRow extends FieldValues>(
  props: DeleteRowListProps<TRow>,
): Promise<void> => {
  const { row, table, setRowList } = props;
  const { error } = await supabaseClient.from(table).delete().eq('id', row.id);
  if (error != null) {
    throw error;
  }

  setRowList((prevRowList) =>
    prevRowList.filter((row_i) => row_i.id !== row.id),
  );
};

export type ListRowProps<TRow extends FieldValues> = {
  table: TableEnum;
  profileID: string;
  event: 'UPDATE' | 'INSERT' | 'DELETE';
  setRowList: React.Dispatch<React.SetStateAction<TRow[]>>;
  onSubscribe?: (status: string) => void;
};

export const listenRow = <TRow extends FieldValues>(
  props: ListRowProps<TRow>,
): void => {
  const { event, table, profileID, setRowList, onSubscribe } = props;
  const updateRowCB = (gotRow: RealtimePostgresUpdatePayload<TRow>): void => {
    updateRow({ table, setRowList, row: gotRow.new });
  };

  const insertRowCB = (gotRow: RealtimePostgresInsertPayload<TRow>): void => {
    insertRow({
      table,
      setRowList,
      row: { ...gotRow.new, profile_id: profileID } as TRow,
    });
  };

  const deleteRowCB = (gotRow: RealtimePostgresDeletePayload<TRow>): void => {
    deleteRow({ table, setRowList, row: gotRow.old });
  };

  const pg_changes = REALTIME_LISTEN_TYPES.POSTGRES_CHANGES;
  const channel = supabaseClient.channel('onRowChange');

  if (event === 'UPDATE') {
    channel.on(pg_changes, { event: 'UPDATE', schema: 'public' }, updateRowCB);
  }
  if (event === 'INSERT') {
    channel.on(pg_changes, { event: 'INSERT', schema: 'public' }, insertRowCB);
  }
  if (event === 'DELETE') {
    channel.on(pg_changes, { event: 'DELETE', schema: 'public' }, deleteRowCB);
  }
  if (onSubscribe != null) {
    channel.subscribe((status) => {
      onSubscribe(status);
    });
  }
};
