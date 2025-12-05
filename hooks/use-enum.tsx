import { Gender, NoteType, ServiceRecipientStatus } from "@/types/enum.types";

interface SelectOption<T> {
  value: T;
  label: string;
}

export function enumToArrayAndMap<T>(
  enumType: { [key: string]: string | number },
  customLabels?: (key: string, value: T) => string
) {
  const isNumericEnum = typeof Object.values(enumType)[0] === "number";

  const keys = Object.keys(enumType);

  const enumKeys = isNumericEnum
    ? keys.filter((key) => isNaN(Number(key)))
    : keys;

  const array: SelectOption<T>[] = [];
  const map: Record<string | number, string> = {};

  enumKeys.forEach((key) => {
    const value = enumType[key] as T;
    const label = customLabels
      ? customLabels(key, value)
      : key.replace(/([A-Z])/g, " $1").trim();

    array.push({ value, label });
    map[value as string | number] = label;
  });

  return { array, map };
}

export const useGenderOptions = () => {
  return enumToArrayAndMap<Gender>(Gender, (key, value) => {
    switch (value) {
      case Gender.Male:
        return "Vyras";
      case Gender.Female:
        return "Moteris";
      case Gender.Other:
        return "Kita";
    }
  });
};

export const useServiceRecipientStatusOptions = () => {
  return enumToArrayAndMap<ServiceRecipientStatus>(
    ServiceRecipientStatus,
    (key, value) => {
      switch (value) {
        case ServiceRecipientStatus.Active:
          return "Teikiama";
        case ServiceRecipientStatus.Inactive:
          return "Neteikiama";
        case ServiceRecipientStatus.Suspended:
          return "Sustabdyta";
        case ServiceRecipientStatus.Pending:
          return "Laukia eilėje";
      }
    }
  );
};

export const useNotesOptions = () => {
  return enumToArrayAndMap<NoteType>(NoteType, (key, value) => {
    switch (value) {
      case NoteType.AmbulatoryCare:
        return "Iš Ambulatorijos";
      case NoteType.Municipality:
        return "Iš Savivaldybės";
      case NoteType.OTHER:
        return "Kita";
    }
  });
};
