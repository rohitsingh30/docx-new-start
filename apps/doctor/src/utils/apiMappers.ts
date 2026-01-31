import { STRING_CONSTANTS } from '../constants/stringConstants';
import {
  ApiAppointmentStatus,
  ApiBloodType,
  ApiGender,
  AppointmentStatus,
  BloodType,
  Gender,
} from '../types/enums';

export const mapGender = (value?: ApiGender | null): Gender => {
  switch (value) {
    case ApiGender.FEMALE:
      return Gender.FEMALE;
    case ApiGender.OTHER:
      return Gender.OTHER;
    case ApiGender.MALE:
    default:
      return Gender.MALE;
  }
};

export const mapGenderToApi = (value: Gender): ApiGender => {
  switch (value) {
    case Gender.FEMALE:
      return ApiGender.FEMALE;
    case Gender.OTHER:
      return ApiGender.OTHER;
    case Gender.MALE:
    default:
      return ApiGender.MALE;
  }
};

export const mapBloodType = (value?: ApiBloodType | null): BloodType => {
  switch (value) {
    case ApiBloodType.A_NEGATIVE:
      return BloodType.A_NEGATIVE;
    case ApiBloodType.B_POSITIVE:
      return BloodType.B_POSITIVE;
    case ApiBloodType.B_NEGATIVE:
      return BloodType.B_NEGATIVE;
    case ApiBloodType.AB_POSITIVE:
      return BloodType.AB_POSITIVE;
    case ApiBloodType.AB_NEGATIVE:
      return BloodType.AB_NEGATIVE;
    case ApiBloodType.O_POSITIVE:
      return BloodType.O_POSITIVE;
    case ApiBloodType.O_NEGATIVE:
      return BloodType.O_NEGATIVE;
    case ApiBloodType.A_POSITIVE:
    default:
      return BloodType.A_POSITIVE;
  }
};

export const mapBloodTypeToApi = (value: BloodType): ApiBloodType => {
  switch (value) {
    case BloodType.A_NEGATIVE:
      return ApiBloodType.A_NEGATIVE;
    case BloodType.B_POSITIVE:
      return ApiBloodType.B_POSITIVE;
    case BloodType.B_NEGATIVE:
      return ApiBloodType.B_NEGATIVE;
    case BloodType.AB_POSITIVE:
      return ApiBloodType.AB_POSITIVE;
    case BloodType.AB_NEGATIVE:
      return ApiBloodType.AB_NEGATIVE;
    case BloodType.O_POSITIVE:
      return ApiBloodType.O_POSITIVE;
    case BloodType.O_NEGATIVE:
      return ApiBloodType.O_NEGATIVE;
    case BloodType.A_POSITIVE:
    default:
      return ApiBloodType.A_POSITIVE;
  }
};

export const mapAppointmentStatus = (value?: ApiAppointmentStatus | null): AppointmentStatus => {
  switch (value) {
    case ApiAppointmentStatus.CANCELLED:
      return AppointmentStatus.CANCELLED;
    case ApiAppointmentStatus.COMPLETED:
      return AppointmentStatus.COMPLETED;
    case ApiAppointmentStatus.NO_SHOW:
      return AppointmentStatus.NO_SHOW;
    case ApiAppointmentStatus.CONFIRMED:
    case ApiAppointmentStatus.IN_PROGRESS:
    case ApiAppointmentStatus.SCHEDULED:
    default:
      return AppointmentStatus.SCHEDULED;
  }
};

export const splitName = (name?: string | null) => {
  if (!name) {
    return {
      firstName: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
      lastName: STRING_CONSTANTS.MESSAGES.EMPTY_VALUE,
    };
  }

  const parts = name.split(STRING_CONSTANTS.SEPARATORS.SPACE).filter(Boolean);
  const firstName = parts[0] || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE;
  const lastName = parts.slice(1).join(STRING_CONSTANTS.SEPARATORS.SPACE) || STRING_CONSTANTS.MESSAGES.EMPTY_VALUE;

  return { firstName, lastName };
};
