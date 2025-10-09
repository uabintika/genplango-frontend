"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import {
  FormWizardContext,
  FormWizardContextType,
  RegisterStepType,
  useFormWizard,
} from "./context";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, CirclePlus, Loader2 } from "lucide-react";
import "./style.css";

type FormWizardProps = {
  onComplete: () => Promise<void> | void;
  children:
    | React.ReactElement<FormWizardStepProps>
    | React.ReactElement<FormWizardStepProps>[];
};

export const FormWizard: React.FC<FormWizardProps> = ({
  onComplete,
  children,
}: FormWizardProps) => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [registeredSteps, registerStep] = React.useState<RegisterStepType[]>(
    []
  );
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const progressBarElements = React.useMemo(() => {
    return React.Children.map(children, (child, index) => (
      <FormWizardProgressBarStep currentStep={index + 1} {...child.props} />
    ));
  }, [children, currentStep]);

  const totalSteps = React.useMemo(
    () => React.Children.count(children),
    [children]
  );

  const currentChild = React.Children.toArray(children)[currentStep - 1];

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => goToStep(currentStep + 1);
  const prevStep = () => goToStep(currentStep - 1);

  const contextValue: FormWizardContextType = {
    currentStep,
    totalSteps,
    goToStep,
    nextStep,
    prevStep,
    registeredSteps,
    registerStep,
    onComplete,
    isSubmitting,
    setIsSubmitting,
  };

  return (
    <FormWizardContext.Provider value={contextValue}>
      <form>
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
  children: React.ReactNode;
};

export const FormWizardStep: React.FC<FormWizardStepProps> = ({
  children,
}: FormWizardStepProps) => {
  return <div className="px-5 sm:px-8 md:px-24 lg:px-52">{children}</div>;
};

type FormWizardControlsProps = {};

const FormWizardControls: React.FC<FormWizardControlsProps> = () => {
  const {
    totalSteps,
    currentStep,
    prevStep,
    nextStep,
    registeredSteps,
    onComplete,
    isSubmitting,
    setIsSubmitting,
  } = useFormWizard();
  const miscT = useTranslations("Misc");

  const submitButtonContent = isSubmitting ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {miscT("loading") + "..."}
    </>
  ) : (
    <>
      Sukurti <CirclePlus className="w-5 h-5 ml-1" />
    </>
  );

  const handleNext = async () => {
    const step = registeredSteps.find((s) => s.id === currentStep);
    if (step) {
      const isValid = await step.validate();
      if (!isValid) return;
    }
    nextStep();
  };

  const handleSubmit = async () => {
    try {
      for (const step of registeredSteps) {
        const isValid = await step.validate();
        if (!isValid) return;
      }

      const allData = Object.assign(
        {},
        ...(await Promise.all(registeredSteps.map((s) => s.getData())))
      );

      console.log(registeredSteps[0].getData());
      await onComplete(allData);
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
          color="success"
          type="button"
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
