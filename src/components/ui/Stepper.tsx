import { Check } from "lucide-react";

export interface StepItem {
  num: number;
  label: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  className?: string;
}

export default function Stepper({
  steps,
  currentStep,
  onStepClick,
  className = "",
}: StepperProps) {
  return (
    <div className={`flex items-center justify-between relative ${className}`}>
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
      {steps.map((s) => {
        const isCompleted = s.num < currentStep;
        const isCurrent = s.num === currentStep;
        const clickable = Boolean(onStepClick);

        return (
          <button
            key={s.num}
            type="button"
            disabled={!clickable}
            onClick={() => onStepClick && onStepClick(s.num)}
            className={`relative z-10 flex flex-col items-center ${
              clickable ? "cursor-pointer" : "cursor-default"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isCompleted
                  ? "bg-navy-900 text-white shadow"
                  : isCurrent
                  ? "bg-gold-500 text-navy-950 ring-4 ring-gold-100 shadow-md font-bold"
                  : "bg-white text-slate-400 border border-slate-200"
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className="hidden sm:block text-[10px] text-slate-500 mt-1 font-medium">
              {s.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
