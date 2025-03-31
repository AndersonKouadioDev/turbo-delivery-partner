import { Button } from "@heroui/react";
import { Progress } from "@heroui/react";
import { useFormStatus } from "react-dom";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  const percent = () => {
    if (currentStep == steps.length) return 100;

    return (currentStep * 100) / steps.length;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-row gap-2 sm:gap-0 sm:flex-col items-center sm:w-1/5"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1
                  ${
                    index <= currentStep
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
            >
              {index + 1}
            </div>
            <span className="text-xs text-center">{step}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <Progress
          aria-label="Loading..."
          className="w-full"
          size="sm"
          value={percent()}
        />
      </div>
    </div>
  );
};

export function FormControls({
  onPrev,
  onNext,
  isSubmit,
}: {
  onNext?: () => void;
  onPrev?: () => void;
  isSubmit?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <div className="mt-4 gap-2 flex justify-between">
      {onPrev && <Button onClick={onPrev}>Précédent</Button>}
      {onNext && !isSubmit && (
        <Button color="primary" onClick={onNext}>
          Suivant
        </Button>
      )}
      {isSubmit && (
        <Button
          aria-disabled={pending}
          color="primary"
          disabled={pending}
          isLoading={pending}
          type="submit"
          onClick={onNext}
        >
          Soumettre
        </Button>
      )}
    </div>
  );
}
