"use client";

import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

export type RegisterStepType = {
  validate?: () => Promise<boolean> | boolean;
};

export type FormWizardContextType<T extends FieldValues> = {
  form: UseFormReturn<T>;
  currentStep: number;
  totalSteps: number;
  registeredSteps: RegisterStepType[];
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  onComplete: (formData: T) => Promise<void> | void;
  isSubmitting?: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormWizardContext =
  React.createContext<FormWizardContextType<any> | null>(null);

export function useFormWizard<
  T extends FieldValues
>(): FormWizardContextType<T> {
  const ctx = React.useContext<FormWizardContextType<T> | null>(
    FormWizardContext
  );
  if (!ctx) throw new Error("useFormWizard must be used within a FormWizard");
  return ctx;
}
