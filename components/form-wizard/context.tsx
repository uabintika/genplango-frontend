"use client";

import * as React from "react";

export type RegisterStepType = {
  id: number | string;
  validate: () => Promise<boolean> | boolean;
  getData: () => Promise<any> | any;
};

export function useRegisterWizardStep({
  id,
  validate,
  getData,
}: RegisterStepType) {
  const { registerStep } = useFormWizard();

  React.useEffect(() => {
    registerStep((prev) => {
      const exists = prev.some((s) => s.id === id);

      if (exists) return prev;

      return [...prev, { id, validate, getData }];
    });
  }, [id]);
}

export type FormWizardContextType = {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  registeredSteps: RegisterStepType[];
  registerStep: React.Dispatch<React.SetStateAction<RegisterStepType[]>>;
  onComplete: (formData: any) => Promise<void> | void;
  isSubmitting?: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormWizardContext =
  React.createContext<FormWizardContextType | null>(null);

export const useFormWizard = () => {
  const ctx = React.useContext(FormWizardContext);
  if (!ctx) throw new Error("useFormWizard must be used within a FormWizard");
  return ctx;
};
