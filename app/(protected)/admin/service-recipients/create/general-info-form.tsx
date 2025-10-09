"use client";

import { useGenderOptions } from "@/hooks/use-enum";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import { useEffect, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Cake, MapPin, MapPinHouse } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ValidationError from "@/components/ui/validation-error";
import { useRegisterWizardStep } from "@/components/form-wizard";

type Municipality = {
  id: number;
  name: string;
};

type KinshipRelation = {
  id: number;
  name: string;
};

type RelativeServiceRecipient = {
  id: number;
  fullName: string;
};

export const generalInfoSchema = z
  .object({
    firstName: z.string().min(1, { message: "required" }),
    lastName: z.string().min(1, { message: "required" }),
    gender: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" }),

    birthDate: z
      .string()
      .min(1, { message: "required" })
      .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "invalid_date_format" }),

    municipalityId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" })
      .transform((val) => Number(val)),

    address: z.string().min(1, { message: "required" }),
    houseNr: z.string().optional(),
    appartmentNr: z.string().optional(),

    coordLat: z
      .string()
      .min(1, { message: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "must_be_a_number" }),
    coordLng: z
      .string()
      .min(1, { message: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "must_be_a_number" }),

    relativeServiceRecipientId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" })
      .optional(),
    relativeKinshipRelationId: z
      .string({ error: "required" })
      .refine((val) => !isNaN(Number(val)), { message: "required" })
      .optional(),
  })
  .superRefine((val, ctx) => {
    if (
      val.relativeServiceRecipientId?.length &&
      !val.relativeKinshipRelationId?.length
    ) {
      ctx.addIssue({
        code: "custom",
        message: "required_with",
        path: ["relativeServiceRecipientId"],
      });
    }
  });

export default function GeneralInfoForm() {
  const t = useTranslations("ServiceRecipients.GeneralInfoForm");
  const validationsT = useTranslations("Validations");
  const genders = useGenderOptions();
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    string | null
  >(null);
  const [gender, setGender] = useState<string | null>("");
  const [relativeKinship, setRelativeKinship] = useState<string | null>("");
  const [relativeSR, setRelativeSR] = useState<string | undefined>("");

  const {
    data: municipalities,
    isLoading: loadingMunicipalities,
    isValidating: validatingMunicipalities,
  } = useSWR<Array<Municipality>>(API_ROUTES.MUNICIPALITIES.ALLOWED);

  const {
    data: kinshipRelations,
    isLoading: loadingKinships,
    isValidating: validatingKinships,
  } = useSWR<Array<KinshipRelation>>(API_ROUTES.KINSHIP_RELATIONS.ALLOWED);

  const {
    data: relativeServiceRecipients,
    isLoading: loadingRelativeSRs,
    isValidating: validatingRelativeSRs,
  } = useSWR<Array<RelativeServiceRecipient>>(
    selectedMunicipality
      ? `${API_ROUTES.SERVICE_RECIPIENTS.RELATIVES}?municipalityId=${parseInt(
          selectedMunicipality
        )}`
      : API_ROUTES.SERVICE_RECIPIENTS.RELATIVES
  );

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(generalInfoSchema),
    mode: "all",
  });

  useRegisterWizardStep({
    id: 1,
    validate: async () => await trigger(),
    getData: () => getValues(),
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
        <Label htmlFor="firstName" className="lg:min-w-[160px]">
          {t("firstName")}
        </Label>
        <div className="w-full">
          <InputGroup>
            <Input
              {...register("firstName")}
              name="firstName"
              type="text"
              placeholder={t("firstName")}
              className={cn("", {
                "border-destructive ": errors.firstName,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.firstName}
            message={
              errors?.firstName && validationsT(`${errors?.firstName.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
        <Label htmlFor="lastName" className="lg:min-w-[160px]">
          {t("lastName")}
        </Label>
        <div className="w-full">
          <InputGroup>
            <Input
              {...register("lastName")}
              name="lastName"
              type="text"
              placeholder={t("lastName")}
              className={cn("", {
                "border-destructive ": errors.lastName,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.lastName}
            message={
              errors?.lastName && validationsT(`${errors?.lastName.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
        <Label htmlFor="gender" className="lg:min-w-[160px]">
          {t("gender")}
        </Label>
        <div className="w-full">
          <Select
            onValueChange={(val) => {
              setGender(val);
              setValue("gender", val);
              clearErrors("gender");
            }}
            {...register("gender")}
          >
            <SelectTrigger
              className={cn("", {
                "border-destructive ": errors.gender,
              })}
            >
              <SelectValue placeholder={t("gender")} />
            </SelectTrigger>
            <SelectContent>
              {genders.map((gender) => (
                <SelectItem value={gender.value} key={gender.value}>
                  {gender.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ValidationError
            validationError={errors.gender}
            message={
              errors?.gender && validationsT(`${errors?.gender.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="birthDate" className="lg:min-w-[160px]">
          {t("birthDate")}
        </Label>
        <div className="w-full">
          <InputGroup merged>
            <InputGroupText
              className={cn("", {
                "border-destructive ": errors.birthDate,
              })}
            >
              <Cake className="w-5 h-5" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t("birthDate")}
              {...register("birthDate")}
              className={cn("", {
                "border-destructive ": errors.birthDate,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.birthDate}
            message={
              errors?.birthDate && validationsT(`${errors?.birthDate.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
        <Label htmlFor="municipalityId" className="lg:min-w-[160px]">
          {t("municipalityId")}
        </Label>
        <div className="w-full">
          <Select
            disabled={loadingMunicipalities || validatingMunicipalities}
            onValueChange={(val) => {
              setSelectedMunicipality(val);
              setValue("municipalityId", val);
              clearErrors("municipalityId");
              setRelativeSR(undefined);
            }}
            {...register("municipalityId")}
          >
            <SelectTrigger
              className={cn("", {
                "border-destructive ": errors.municipalityId,
              })}
            >
              <SelectValue
                placeholder={
                  loadingMunicipalities || validatingMunicipalities
                    ? t("loading_municipalities")
                    : t("municipalityId")
                }
              />
            </SelectTrigger>
            <SelectContent>
              {municipalities?.map((municipality) => (
                <SelectItem
                  value={municipality.id.toString()}
                  key={municipality.id}
                >
                  {municipality.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ValidationError
            validationError={errors.municipalityId}
            message={
              errors?.municipalityId &&
              validationsT(`${errors?.municipalityId.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="address" className="lg:min-w-[160px]">
          {t("address")}
        </Label>
        <div className="w-full">
          <InputGroup merged className="flex">
            <InputGroupText
              className={cn("", {
                "border-destructive ": errors.address,
              })}
            >
              <MapPinHouse className="w-5 h-5" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t("address")}
              {...register("address")}
              className={cn("", {
                "border-destructive ": errors.address,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.address}
            message={
              errors?.address && validationsT(`${errors?.address.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="houseNr" className="lg:min-w-[160px]">
          {t("houseNr")}
        </Label>
        <div className="w-full">
          <InputGroup merged className="flex">
            <InputGroupText>
              <MapPinHouse className="w-5 h-5" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t("houseNr")}
              {...register("houseNr")}
            />
          </InputGroup>
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="appartmentNr" className="lg:min-w-[160px]">
          {t("appartmentNr")}
        </Label>
        <InputGroup merged className="flex">
          <InputGroupText>
            <MapPinHouse className="w-5 h-5" />
          </InputGroupText>
          <Input
            type="text"
            placeholder={t("appartmentNr")}
            {...register("appartmentNr")}
          />
        </InputGroup>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="coordLat" className="lg:min-w-[160px]">
          {t("coordLat")}
        </Label>
        <div className="w-full">
          <InputGroup merged className="flex">
            <InputGroupText
              className={cn("", {
                "border-destructive ": errors.coordLat,
              })}
            >
              <MapPin className="w-5 h-5" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t("coordLat")}
              {...register("coordLat")}
              className={cn("", {
                "border-destructive ": errors.coordLat,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.coordLat}
            message={
              errors?.coordLat && validationsT(`${errors?.coordLat.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
        <Label htmlFor="coordLng" className="lg:min-w-[160px]">
          {t("coordLng")}
        </Label>
        <div className="w-full">
          <InputGroup merged className="flex">
            <InputGroupText
              className={cn("", {
                "border-destructive ": errors.coordLng,
              })}
            >
              <MapPin className="w-5 h-5" />
            </InputGroupText>
            <Input
              type="text"
              placeholder={t("coordLng")}
              {...register("coordLng")}
              className={cn("", {
                "border-destructive ": errors.coordLng,
              })}
            />
          </InputGroup>
          <ValidationError
            validationError={errors.coordLng}
            message={
              errors?.coordLng && validationsT(`${errors?.coordLng.message}`)
            }
          />
        </div>
      </div>

      <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
        <Label
          htmlFor="relativeServiceRecipientId"
          className="lg:min-w-[160px] lg:max-w-[160px]"
        >
          {t("relativeServiceRecipientId")}
        </Label>
        <Select
          disabled={loadingRelativeSRs || validatingRelativeSRs}
          value={relativeSR}
          onValueChange={(val) => {
            setRelativeSR(val);
            setValue("relativeServiceRecipientId", val);
            clearErrors("relativeServiceRecipientId");
          }}
          {...register("relativeServiceRecipientId")}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                loadingRelativeSRs || validatingRelativeSRs
                  ? t("loading_relative_service_recipients")
                  : t("relativeServiceRecipientId")
              }
            />
          </SelectTrigger>
          <SelectContent>
            {relativeServiceRecipients?.map((sr) => (
              <SelectItem value={sr.id.toString()} key={sr.id}>
                {sr.fullName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0"
        hidden={!relativeSR}
      >
        <Label
          htmlFor="relativeKinshipRelationId"
          className="lg:min-w-[160px] lg:max-w-[160px]"
        >
          {t("relativeKinshipRelationId")}
        </Label>
        <div className="w-full">
          <Select
            disabled={loadingKinships || validatingKinships || !relativeSR}
            onValueChange={(val) => {
              setRelativeKinship(val);
              setValue("relativeKinshipRelationId", val);
              clearErrors("relativeKinshipRelationId");
            }}
            {...register("relativeKinshipRelationId")}
          >
            <SelectTrigger
              className={cn("", {
                "border-destructive ": errors.address,
              })}
            >
              <SelectValue
                placeholder={
                  loadingKinships || validatingKinships
                    ? t("loading_relative_kinship_relations")
                    : t("relativeKinshipRelationId")
                }
              />
            </SelectTrigger>
            <SelectContent>
              {kinshipRelations?.map((kinshipRelation) => (
                <SelectItem
                  value={kinshipRelation.id.toString()}
                  key={kinshipRelation.id}
                >
                  {kinshipRelation.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ValidationError
            validationError={errors?.relativeKinshipRelationId}
            message={
              errors?.relativeKinshipRelationId &&
              validationsT(`${errors?.relativeKinshipRelationId.message}`)
            }
          />
        </div>
      </div>
    </div>
  );
}
