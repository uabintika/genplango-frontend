"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, CirclePlus, Loader2 } from "lucide-react";
import "./style.css";

type RegisterStepType = {
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
      const exists = prev.some((step) => step.id === id);
      if (exists) return prev;

      return [...prev, { id, validate, getData }];
    });
  }, [id, validate, getData, registerStep]);
}

type FormWizardContextType = {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  registeredSteps: RegisterStepType[];
  registerStep: React.Dispatch<React.SetStateAction<RegisterStepType[]>>;
  onComplete: (formData: any) => Promise<void> | void;
  isLoading?: boolean;
  isSubmitting?: boolean;
};

const FormWizardContext = React.createContext<FormWizardContextType | null>(
  null
);

export const useFormWizard = () => {
  const ctx = React.useContext(FormWizardContext);
  if (!ctx) throw new Error("useFormWizard must be used within a FormWizard");
  return ctx;
};

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
          <FormWizardControls isLoading={false} />
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

type FormWizardControlsProps = {
  isLoading: boolean;
};

const FormWizardControls: React.FC<FormWizardControlsProps> = ({
  isLoading,
}: FormWizardControlsProps) => {
  const {
    totalSteps,
    currentStep,
    prevStep,
    nextStep,
    registeredSteps,
    onComplete,
  } = useFormWizard();
  const miscT = useTranslations("Misc");

  const submitButtonContent = isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {miscT("Misc.loading") + "..."}
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
    for (const step of registeredSteps) {
      const isValid = await step.validate();
      if (!isValid) return;
    }

    const allData = Object.assign(
      {},
      ...(await Promise.all(registeredSteps.map((s) => s.getData())))
    );

    await onComplete(allData);
  };

  return (
    <div className="flex justify-between my-5 px-5 sm:px-8 md:px-24 lg:px-52">
      {currentStep !== 1 && (
        <Button color="warning" onClick={() => prevStep()} type="button">
          <ArrowLeft className="w-5 h-5 mr-1" /> Atgal
        </Button>
      )}
      {currentStep !== totalSteps ? (
        <Button
          className="ml-auto"
          onClick={async () => {
            await handleNext();
          }}
          type="button"
        >
          Pirmyn <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      ) : (
        <Button
          color="success"
          type="button"
          disabled={isLoading}
          onClick={async () => {
            await handleSubmit();
          }}
        >
          {submitButtonContent}
        </Button>
      )}
    </div>
  );
};
