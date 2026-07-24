import { convertAsesmenStateLabel } from '@/utils/assessmentState';

const BadgeAsesmenState = ({ state }: { state: string }) => {
  return (
    <>
      {(state === 'draft' || state === 'pra_assessment' || state === 'assessment') && (
        <div className="text-nowrap text-[12px] bg-[#FEF8E5] text-[#E88F00] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FCE197] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#E88F00]"></span>
          {convertAsesmenStateLabel(state)}
        </div>
      )}
      {(state === 'assessment_finish' || state === 'pleno' || state === 'pleno_finish') && (
        <div className="text-nowrap text-[12px] bg-[#E5FEFA] text-[#019DCB] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#02CAED] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#019DCB]"></span>
          {convertAsesmenStateLabel(state)}
        </div>
      )}
      {(state === 'print_certificate' || state === 'completed' || state === 'archived') && (
        <div className="text-nowrap text-[12px] bg-[#E5FEF1] text-[#019D51] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#02ED9D] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#019D51]"></span>
          {convertAsesmenStateLabel(state)}
        </div>
      )}
    </>
  );
};

export default BadgeAsesmenState;
