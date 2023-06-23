import { FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import {
  AddressRow,
  EducationRow,
  ExperienceRow,
  PhoneRow,
  ProfileRow,
  SkillRow,
} from '../api/session.supabase';
import { UseEditor } from './useEditor';

export type UseRegisterProps<TRow extends FieldValues> = {
  editor: UseEditor<TRow>;
};

export type UseProfileRegister = {
  registerFirstName: UseFormRegisterReturn<'first_name'>;
  registerLastName: UseFormRegisterReturn<'last_name'>;
};

export const useProfileRegister = (
  props: UseRegisterProps<ProfileRow>,
): UseProfileRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerFirstName = register('first_name', {
    required: 'first_name is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerLastName = register('last_name', {
    required: 'last_name is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });

  return {
    registerFirstName,
    registerLastName,
  };
};

export type UseSkillRegister = {
  registerSkill: UseFormRegisterReturn<'skill'>;
};

export const useSkillRegister = (
  props: UseRegisterProps<SkillRow>,
): UseSkillRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerSkill = register('skill', {
    required: 'Skill is required',
    minLength: {
      value: 8,
      message: 'Minimum length should be 8',
    },
  });

  return {
    registerSkill,
  };
};

export type UsePhoneRegister = {
  registerPhone: UseFormRegisterReturn<'phone'>;
  registerCatalog: UseFormRegisterReturn<'catalog'>;
};

export const usePhoneRegister = (
  props: UseRegisterProps<PhoneRow>,
): UsePhoneRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerPhone = register('phone', {
    required: 'Phone is required',
    minLength: {
      value: 8,
      message: 'Minimum length should be 8',
    },
  });

  const registerCatalog = register('catalog', {
    required: 'catalog is required',
    minLength: {
      value: 3,
      message: 'Minimum length should be 3',
    },
  });

  return {
    registerPhone,
    registerCatalog,
  };
};

export type UseAddressRegister = {
  registerStreet: UseFormRegisterReturn<'street'>;
  registerCity: UseFormRegisterReturn<'city'>;
  registerState: UseFormRegisterReturn<'state'>;
  registerZipCode: UseFormRegisterReturn<'zip_code'>;
  registerIsOngoing: UseFormRegisterReturn<'is_ongoing'>;
};

export const useAddressRegister = (
  props: UseRegisterProps<AddressRow>,
): UseAddressRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerStreet = register('street', {
    required: 'street is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerCity = register('city', {
    required: 'city is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerState = register('state', {
    required: 'state is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerZipCode = register('zip_code', {
    required: 'zip_code is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerIsOngoing = register('is_ongoing', { required: false });

  return {
    registerStreet,
    registerCity,
    registerState,
    registerZipCode,
    registerIsOngoing,
  };
};

export type UseEducationRegister = {
  registerSchool: UseFormRegisterReturn<'school'>;
  registerDegree: UseFormRegisterReturn<'degree'>;
  registerMajor: UseFormRegisterReturn<'major'>;
  registerStart: UseFormRegisterReturn<'start'>;
  registerEnd: UseFormRegisterReturn<'end'>;
  registerIsOngoing: UseFormRegisterReturn<'is_ongoing'>;
};

export const useEducationRegister = (
  props: UseRegisterProps<EducationRow>,
): UseEducationRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerSchool = register('school', {
    required: 'School is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerDegree = register('degree', {
    required: 'Degree is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerMajor = register('major', {
    required: 'Major is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerStart = register('start', {
    required: 'Start Date is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerEnd = register('end', {
    required: false,
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerIsOngoing = register('is_ongoing', { required: false });

  return {
    registerSchool,
    registerDegree,
    registerMajor,
    registerStart,
    registerEnd,
    registerIsOngoing,
  };
};

export type UseExperienceRegister = {
  registerTitle: UseFormRegisterReturn<'title'>;
  registerCompany: UseFormRegisterReturn<'company'>;
  registerCity: UseFormRegisterReturn<'city'>;
  registerStart: UseFormRegisterReturn<'start'>;
  registerEnd: UseFormRegisterReturn<'end'>;
  registerIsOngoing: UseFormRegisterReturn<'is_ongoing'>;
};

export const useExperienceRegister = (
  props: UseRegisterProps<ExperienceRow>,
): UseExperienceRegister => {
  const { editor } = props;
  const { register } = editor;

  const registerTitle = register('title', {
    required: 'title is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerCompany = register('company', {
    required: 'company is required',
    minLength: {
      value: 2,
      message: 'Minimum length should be 2',
    },
  });
  const registerCity = register('city', {
    required: 'city is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerStart = register('start', {
    required: 'Start Date is required',
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerEnd = register('end', {
    required: false,
    minLength: {
      value: 4,
      message: 'Minimum length should be 4',
    },
  });
  const registerIsOngoing = register('is_ongoing', { required: false });

  return {
    registerTitle,
    registerCompany,
    registerCity,
    registerStart,
    registerEnd,
    registerIsOngoing,
  };
};
