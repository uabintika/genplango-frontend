"use client";

import { useGenderOptions } from "@/hooks/use-enum";
import useSWR from "swr";
import { API_ROUTES } from "@/routes/api";
import { useState } from "react";
import { useTranslations } from "next-intl";
import z from "zod";

import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Cake, MapPin, MapPinHouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const schema = z.object({
  firstName: z.string().min(1, { message: "required" }),
  lastName: z.string().min(1, { message: "required" }),
});

export default function GeneralInfoForm() {
  const t = useTranslations("ServiceRecipients.GeneralInfoForm");
  const genders = useGenderOptions();
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    string | null
  >(null);
  const [gender, setGender] = useState<string | null>(null);
  const [relativeKinship, setRelativeKinship] = useState<string | null>(null);
  const [relativeSR, setRelativeSR] = useState<string | undefined>();
  const [inputValues, setInputValues] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

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
    API_ROUTES.SERVICE_RECIPIENTS.RELATIVES
  );

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
          <Label htmlFor="firstName" className="lg:min-w-[160px]">
            {t("firstName")}
          </Label>
          <Input
            name="firstName"
            type="text"
            placeholder={t("firstName")}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
          <Label htmlFor="lastName" className="lg:min-w-[160px]">
            {t("lastName")}
          </Label>
          <Input
            name="lastName"
            type="text"
            placeholder={t("lastName")}
            onChange={handleChange}
          />
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
          <Label htmlFor="gender" className="lg:min-w-[160px]">
            {t("gender")}
          </Label>
          <Select name="gender" onValueChange={setGender}>
            <SelectTrigger>
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
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
          <Label htmlFor="birthDate" className="lg:min-w-[160px]">
            {t("birthDate")}
          </Label>
          <InputGroup merged>
            <InputGroupText>
              <Cake className="w-5 h-5" />
            </InputGroupText>
            <Input
              name="birthDate"
              type="text"
              placeholder={t("birthDate")}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
          <Label htmlFor="municipalityId" className="lg:min-w-[160px]">
            {t("municipalityId")}
          </Label>
          <Select
            name="municipalityId"
            disabled={loadingMunicipalities || validatingMunicipalities}
            onValueChange={(val) => {
              setSelectedMunicipality(val);
              setRelativeSR(undefined);
            }}
          >
            <SelectTrigger>
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
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
          <Label htmlFor="address" className="lg:min-w-[160px]">
            {t("address")}
          </Label>
          <InputGroup merged className="flex">
            <InputGroupText>
              <MapPinHouse className="w-5 h-5" />
            </InputGroupText>
            <Input
              name="address"
              type="text"
              placeholder={t("address")}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
          <Label htmlFor="houseNr" className="lg:min-w-[160px]">
            {t("houseNr")}
          </Label>
          <InputGroup merged className="flex">
            <InputGroupText>
              <MapPinHouse className="w-5 h-5" />
            </InputGroupText>
            <Input
              name="houseNr"
              type="text"
              placeholder={t("houseNr")}
              onChange={handleChange}
            />
          </InputGroup>
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
              name="appartmentNr"
              type="text"
              placeholder={t("appartmentNr")}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
          <Label htmlFor="coordLat" className="lg:min-w-[160px]">
            {t("coordLat")}
          </Label>
          <InputGroup merged className="flex">
            <InputGroupText>
              <MapPin className="w-5 h-5" />
            </InputGroupText>
            <Input
              name="coordLat"
              type="text"
              placeholder={t("coordLat")}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row lg:gap-0 gap-2">
          <Label htmlFor="coordLng" className="lg:min-w-[160px]">
            {t("coordLng")}
          </Label>
          <InputGroup merged className="flex">
            <InputGroupText>
              <MapPin className="w-5 h-5" />
            </InputGroupText>
            <Input
              name="coordLng"
              type="text"
              placeholder={t("coordLng")}
              onChange={handleChange}
            />
          </InputGroup>
        </div>

        <div className="col-span-2 flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0">
          <Label
            htmlFor="relativeServiceRecipientId"
            className="lg:min-w-[160px] lg:max-w-[160px]"
          >
            {t("relativeServiceRecipientId")}
          </Label>
          <Select
            name="relativeServiceRecipientId"
            disabled={loadingRelativeSRs || validatingRelativeSRs}
            value={relativeSR}
            onValueChange={setRelativeSR}
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
          <Select
            name="relativeKinshipRelationId"
            disabled={loadingKinships || validatingKinships || !relativeSR}
            onValueChange={setRelativeKinship}
          >
            <SelectTrigger>
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
        </div>

        <div className="col-span-2 ml-auto">
          <Button type="submit">Sukurti</Button>
        </div>
      </div>
    </form>
  );
}
