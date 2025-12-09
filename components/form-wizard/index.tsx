"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FormWizardContext,
  FormWizardContextType,
  RegisterStepType,
  useFormWizard,
} from "./context";

import { Form } from "../ui/form";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, CirclePlus } from "lucide-react";
import "./style.css";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import Loader from "../ui/loader";

type FormWizardProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  isLoading?: boolean;
  onComplete: (formData: T) => Promise<void> | void;
  children:
    | React.ReactElement<FormWizardStepProps>
    | React.ReactElement<FormWizardStepProps>[];
};

export const FormWizard = <T extends FieldValues>({
  form,
  isLoading = false,
  onComplete,
  children,
}: FormWizardProps<T>) => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(isLoading);

  const steps = React.useMemo(
    () =>
      React.Children.toArray(
        children
      ) as React.ReactElement<FormWizardStepProps>[],
    [children]
  );

  const totalSteps = steps.length;

  const registeredSteps = React.useMemo<RegisterStepType[]>(() => {
    return steps.map((child) => ({
      validate: child.props.onValidate,
    }));
  }, [steps]);

  const progressBarElements = steps.map((child, index) => (
    <FormWizardProgressBarStep
      key={index}
      currentStep={index + 1}
      {...child.props}
    />
  ));

  const currentChild = steps[currentStep - 1];

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const contextValue: FormWizardContextType<T> = {
    form,
    currentStep,
    totalSteps,
    registeredSteps,
    goToStep,
    nextStep,
    prevStep,
    onComplete,
    isSubmitting,
    setIsSubmitting,
  };

  return (
    <FormWizardContext.Provider value={contextValue}>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="wizard">
            {/* progress bar */}
            <FormWizardProgressBar steps={progressBarElements} />

            {/* wizard steps */}
            <motion.div
              key={currentStep}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {currentChild}
            </motion.div>

            {/* buttons(prev, next, submit) */}
            <FormWizardControls />
          </div>
        </form>
      </Form>
    </FormWizardContext.Provider>
  );
};

type FormWizardProgressBarStepProps = {
  currentStep: number;
  title?: string;
  icon?: React.JSX.Element;
};

const FormWizardProgressBarStep: React.FC<FormWizardProgressBarStepProps> = ({
  currentStep,
  title,
}: FormWizardProgressBarStepProps) => {
  const { currentStep: activeStep } = useFormWizard();

  return (
    <div
      className={cn("step", {
        "text-success border-success": currentStep === activeStep,
      })}
    >
      <div
        className={cn(
          "indicator relative flex justify-center items-center border-2 border-default/20 rounded-full full w-16 h-16",
          {
            "text-success border-success": currentStep === activeStep,
          }
        )}
      >
        {currentStep}
      </div>
      {title && <p className="title">{title}</p>}
    </div>
  );
};

type FormWizardProgressBarProps = {
  steps: React.JSX.Element[];
};

const FormWizardProgressBar: React.FC<FormWizardProgressBarProps> = ({
  steps,
}: FormWizardProgressBarProps) => {
  return (
    <div className="progress-bar pb-5 mb-5 pt-5 border-b-2 dark:border-b-default/20">
      {steps}
    </div>
  );
};

type FormWizardStepProps = {
  title?: string;
  icon?: React.JSX.Element;
  onValidate?: () => Promise<boolean> | boolean;
  children: React.ReactNode;
};

export const FormWizardStep: React.FC<FormWizardStepProps> = ({
  children,
}: FormWizardStepProps) => {
  return <div className="px-5 sm:px-8 md:px-24 lg:px-52">{children}</div>;
};

const FormWizardControls = <T extends FieldValues>() => {
  const {
    form,
    totalSteps,
    currentStep,
    prevStep,
    nextStep,
    registeredSteps,
    onComplete,
    isSubmitting,
    setIsSubmitting,
  } = useFormWizard<T>();

  const submitButtonContent = isSubmitting ? (
    <Loader className="mr-2" />
  ) : (
    <>
      Sukurti <CirclePlus className="w-5 h-5 ml-1" />
    </>
  );

  const handleNext = async () => {
    const step = registeredSteps[currentStep - 1];

    if (!step) return;

    if (step.validate) {
      const isValid = await step.validate();
      if (!isValid) return;
    }

    nextStep();
  };

  const handleSubmit = async () => {
    try {
      for (const step of registeredSteps) {
        if (!step.validate) continue;

        const isValid = await step.validate();
        if (!isValid) return;
      }

      await onComplete(form.getValues());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-between my-5 px-5 sm:px-8 md:px-24 lg:px-52">
      {currentStep !== 1 && (
        <Button
          color="warning"
          type="button"
          disabled={isSubmitting}
          onClick={() => prevStep()}
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Atgal
        </Button>
      )}
      {currentStep !== totalSteps ? (
        <Button
          className="ml-auto"
          type="button"
          disabled={isSubmitting}
          onClick={handleNext}
        >
          Pirmyn <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      ) : (
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            await handleSubmit();
          }}
        >
          {submitButtonContent}
        </Button>
      )}
    </div>
  );
};
