"use client";

import * as React from "react";

export type RegisterStepType<T = any> = {
  id: number | string;
  validate: () => Promise<boolean> | boolean;
  getData: () => Promise<T> | T;
};

export type FormWizardContextType<T = any> = {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  registeredSteps: RegisterStepType<T>[];
  registerStep: React.Dispatch<React.SetStateAction<RegisterStepType<T>[]>>;
  onComplete: (formData: T) => Promise<void> | void;
  isSubmitting?: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FormWizardContext =
  React.createContext<FormWizardContextType<any> | null>(null);

export function useFormWizard<T = any>(): FormWizardContextType<T> {
  const ctx = React.useContext<FormWizardContextType<T> | null>(
    FormWizardContext
  );
  if (!ctx) throw new Error("useFormWizard must be used within a FormWizard");
  return ctx;
}

export function useRegisterWizardStep<T>({
  id,
  validate,
  getData,
}: RegisterStepType<T>) {
  const { registerStep } = useFormWizard<T>();

  React.useEffect(() => {
    registerStep((prev) => {
      const exists = prev.some((s) => s.id === id);

      if (exists) return prev;

      return [...prev, { id, validate, getData }];
    });
  }, [id]);
}
