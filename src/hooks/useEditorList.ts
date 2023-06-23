/* eslint-disable react-refresh/only-export-components */
import { UseEditor, useEditor } from './useEditor';
import {
  EducationRow,
  ExperienceRow,
  ProfileRow,
  PhoneRow,
  AddressRow,
  SkillRow,
} from '../api/session.supabase';
import { UseSupabaseSession } from './useSupabaseSession';

export type UseEditorList = {
  educationEditor: UseEditor<EducationRow>;
  experienceEditor: UseEditor<ExperienceRow>;
  profileEditor: UseEditor<ProfileRow>;
  phoneEditor: UseEditor<PhoneRow>;
  addressEditor: UseEditor<AddressRow>;
  skillEditor: UseEditor<SkillRow>;
};

export type UseEditorListProps = {
  session: UseSupabaseSession;
};

export const useEditorList = (props: UseEditorListProps): UseEditorList => {
  const { session } = props;
  const {
    profileID,
    setEducationList,
    setExperienceList,
    setProfileList,
    setPhoneList,
    setAddressList,
    setSkillList,
  } = session;
  const educationEditor = useEditor<EducationRow>({
    profileID,
    table: 'education',
    setRowList: setEducationList,
    bodyPhrase: (values: EducationRow) => {
      const { major, degree, school } = values;
      return [major, degree, school].join(', ');
    },
  });

  const experienceEditor = useEditor<ExperienceRow>({
    profileID,
    table: 'experience',
    setRowList: setExperienceList,
    bodyPhrase: (values: ExperienceRow) => {
      const { title, company } = values;
      return [title, company].join(', ');
    },
  });

  const profileEditor = useEditor<ProfileRow>({
    profileID,
    table: 'profile',
    setRowList: setProfileList,
    bodyPhrase: (values: ProfileRow) => {
      const { first_name, last_name } = values;
      return [first_name, last_name].join(', ');
    },
  });

  const phoneEditor = useEditor<PhoneRow>({
    profileID,
    table: 'phone',
    setRowList: setPhoneList,
    bodyPhrase: (values: PhoneRow) => {
      return values.phone;
    },
  });

  const addressEditor = useEditor<AddressRow>({
    profileID,
    table: 'address',
    setRowList: setAddressList,
    bodyPhrase: (values: AddressRow) => {
      const { street, city, state } = values;
      return [street, city, state].join(', ');
    },
  });

  const skillEditor = useEditor<SkillRow>({
    profileID,
    table: 'skill',
    setRowList: setSkillList,
    bodyPhrase: (values: SkillRow) => {
      return values.skill;
    },
  });

  return {
    educationEditor,
    experienceEditor,
    profileEditor,
    phoneEditor,
    addressEditor,
    skillEditor,
  };
};
