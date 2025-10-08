import { Gender } from "@/types/global";
import { useTranslations } from "next-intl";

export const useGenderOptions = () => {
  const t = useTranslations("Enums.Gender");
  const genders = Object.keys(Gender).filter((key) => isNaN(Number(key)));

  return genders.map((label) => ({
    label: t(`${Gender[label as keyof typeof Gender].toString()}`),
    value: Gender[label as keyof typeof Gender].toString(),
  }));
};
