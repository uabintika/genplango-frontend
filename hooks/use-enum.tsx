import {
  Gender,
  NoteType,
  ServiceRecipientStatus,
  WorkerStatus,
} from "@/types/enum.types";

interface SelectOption<T> {
  value: T;
  label: string;
}

export function enumToArrayAndMap<T>(
  enumType: { [key: string]: string | number },
  customLabels?: (key: string, value: T) => string
) {
  const values = Object.values(enumType);
  const numOfItems = values.length / 2;

  const array: SelectOption<T>[] = [];
  const map: Record<string | number, string> = {};

  for (let i = 0; i < numOfItems; i++) {
    const key = values[i] as string;
    const value = values[numOfItems + i] as T;
    const label = customLabels
      ? customLabels(key, value)
      : key.replace(/([A-Z])/g, " $1").trim();

    array.push({ value, label });
    map[value as string | number] = label;
  }

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

export const useWorkerStatusOptions = () => {
  return enumToArrayAndMap<WorkerStatus>(WorkerStatus, (key, value) => {
    switch (value) {
      case WorkerStatus.Working:
        return "Dirba";
      case WorkerStatus.NotWorking:
        return "Nedirba";
    }
  });
};
