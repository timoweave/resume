import { useEffect, useMemo, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import {
  AddressRow,
  ExperienceRow,
  EducationRow,
  PhoneRow,
  SkillRow,
  ProfileRow,
  LikeRow,
  fetchRowList,
  TableEnum,
  FetchRowListProps,
} from '../api/session.supabase';
import { FieldValues } from 'react-hook-form';

export type Section<TRow extends FieldValues> = {
  id: number;
  title: string;
  table: TableEnum;
  rowList: TRow[];
};

export type UseSupabaseSession = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  profileID: string | null;
  setProfileID: React.Dispatch<React.SetStateAction<string | null>>;

  addressList: AddressRow[];
  setAddressList: React.Dispatch<React.SetStateAction<AddressRow[]>>;
  phoneList: PhoneRow[];
  setPhoneList: React.Dispatch<React.SetStateAction<PhoneRow[]>>;
  experienceList: ExperienceRow[];
  setExperienceList: React.Dispatch<React.SetStateAction<ExperienceRow[]>>;
  educationList: EducationRow[];
  setEducationList: React.Dispatch<React.SetStateAction<EducationRow[]>>;
  skillList: SkillRow[];
  setSkillList: React.Dispatch<React.SetStateAction<SkillRow[]>>;
  likeList: LikeRow[];
  setLikeList: React.Dispatch<React.SetStateAction<LikeRow[]>>;
  profileList: ProfileRow[];
  setProfileList: React.Dispatch<React.SetStateAction<ProfileRow[]>>;

  phoneDefault: PhoneRow | null;
  addressDefault: AddressRow | null;

  sectionList: [
    Section<ProfileRow>,
    Section<ExperienceRow>,
    Section<EducationRow>,
  ];
};

export type UseSupabaseSessionProps = {
  profileID: string;
};

export const useSupabaseSession = (
  props: UseSupabaseSessionProps,
): UseSupabaseSession => {
  const [profileID, setProfileID] = useState<string | null>(props.profileID);
  const [session, setSession] = useState<Session | null>(null);
  const [addressList, setAddressList] = useState<AddressRow[]>([]);
  const [phoneList, setPhoneList] = useState<PhoneRow[]>([]);
  const [experienceList, setExperienceList] = useState<ExperienceRow[]>([]);
  const [educationList, setEducationList] = useState<EducationRow[]>([]);
  const [skillList, setSkillList] = useState<SkillRow[]>([]);
  const [profileList, setProfileList] = useState<ProfileRow[]>([]);
  const [likeList, setLikeList] = useState<LikeRow[]>([]);

  const phoneDefault = useMemo<PhoneRow | null>(
    () =>
      phoneList.filter(({ is_default }) => is_default === true).at(0) ?? null,
    [phoneList],
  );
  const addressDefault = useMemo<AddressRow | null>(
    () =>
      addressList.filter(({ is_default }) => is_default === true).at(0) ?? null,
    [addressList],
  );

  const profileOpt = useMemo(
    () =>
      ({
        id: profileID,
        table: 'profile',
        setRowList: setProfileList,
      } as FetchRowListProps<ProfileRow>),
    [profileID],
  );

  const addressOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'address',
        setRowList: setAddressList,
      } as FetchRowListProps<AddressRow>),
    [profileID],
  );

  const phoneOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'phone',
        setRowList: setPhoneList,
      } as FetchRowListProps<PhoneRow>),
    [profileID],
  );

  const experienceOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'experience',
        setRowList: setExperienceList,
      } as FetchRowListProps<ExperienceRow>),
    [profileID],
  );

  const educationOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'education',
        setRowList: setEducationList,
      } as FetchRowListProps<EducationRow>),
    [profileID],
  );

  const skillOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'skill',
        setRowList: setSkillList,
      } as FetchRowListProps<SkillRow>),
    [profileID],
  );

  const likeOpt = useMemo(
    () =>
      ({
        profileID,
        table: 'like',
        setRowList: setLikeList,
      } as FetchRowListProps<LikeRow>),
    [profileID],
  );

  const profileSection = useMemo<Section<ProfileRow>>(
    () => ({
      id: 1,
      title: 'Profile',
      table: 'profile',
      rowList: profileList,
    }),
    [profileList],
  );

  const experienceSection = useMemo<Section<ExperienceRow>>(
    () => ({
      id: 2,
      title: 'Experience',
      table: 'experience',
      rowList: experienceList,
    }),
    [experienceList],
  );

  const educationSection = useMemo<Section<EducationRow>>(
    () => ({
      id: 3,
      title: 'Education',
      table: 'education',
      rowList: educationList,
    }),
    [educationList],
  );

  const sectionList = useMemo<
    [Section<ProfileRow>, Section<ExperienceRow>, Section<EducationRow>]
  >(
    () => [profileSection, experienceSection, educationSection],
    [profileSection, experienceSection, educationSection],
  );

  useEffect(() => {
    fetchRowList(profileOpt);
    fetchRowList(addressOpt);
    fetchRowList(phoneOpt);
    fetchRowList(educationOpt);
    fetchRowList(experienceOpt);
    fetchRowList(skillOpt);
    fetchRowList(likeOpt);
  }, [
    addressOpt,
    educationOpt,
    experienceOpt,
    likeOpt,
    phoneOpt,
    profileOpt,
    skillOpt,
  ]);

  return {
    session,
    setSession,
    profileID,
    setProfileID,
    addressList,
    setAddressList,
    phoneList,
    setPhoneList,
    experienceList,
    setExperienceList,
    educationList,
    setEducationList,
    skillList,
    setSkillList,
    profileList,
    setProfileList,
    likeList,
    setLikeList,
    sectionList,
    addressDefault,
    phoneDefault,
  };
};
