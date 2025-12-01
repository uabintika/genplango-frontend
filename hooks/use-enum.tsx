import { Gender } from "@/types/global-types";
import { useTranslations } from "next-intl";

export const useGenderOptions = () => {
  const t = useTranslations("Enums.Gender");
  const genders = Object.keys(Gender).filter((key) => isNaN(Number(key)));

  return genders.map((label) => ({
    label: t(`${Gender[label as keyof typeof Gender].toString()}`),
    value: Gender[label as keyof typeof Gender].toString(),
  }));
};

export const useServiceRecipientStatusOptions = () => {
  return [
    {
      label: "Teikiama",
      value: 1,
    },
    {
      label: "Neteikiama",
      value: 2,
    },
    {
      label: "Sustabdyta",
      value: 3,
    },
    {
      label: "Laukia eilėje",
      value: 4,
    },
  ];
};
