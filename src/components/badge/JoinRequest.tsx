import { useTranslations } from 'next-intl';

const BadgeJoinRequest = ({ status, revise_count }: { status: string; revise_count?: number | string }) => {
  const t = useTranslations('badge');

  return (
    <>
      {status === 'REJECTED' && (
        <div className="text-[12px] bg-[#FEF1E9] text-red-500 font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FDC3AA] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-red-500"></span>
          {t('join-rejected')}
        </div>
      )}
      {(status === 'REVISE' || status === 'REVISION_REQUEST') && (
        <div className="text-[12px] bg-[#FEF8E5] text-[#E88F00] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FCE197] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#E88F00]"></span>
          {t('join-revised')}
        </div>
      )}
      {(status === 'ON_REVIEW' || status === 'NEED_APPROVAL') && (
        <div className="text-[12px] bg-[#FEF8E5] text-[#E88F00] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FCE197] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#E88F00]"></span>
          {t('join-waiting-approval')}
        </div>
      )}
      {status === 'REVISED_ACS' && (
        <div className="text-[12px] bg-[#FEF8E5] text-[#E88F00] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FCE197] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#E88F00]"></span>
          {t('join-revised-assessor')}
        </div>
      )}
      {(status === 'REVISE_REVIEW' || status === 'REVISED') && (
        <div className="text-[12px] bg-[#E5FEFA] text-[#019DCB] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#02CAED] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#019DCB]"></span>
          {t('join-revision-submitted')}{revise_count ? ` (${revise_count})` : ''}
        </div>
      )}
      {status === 'APPROVED' && (
        <div className="text-[12px] bg-[#E5FEF1] text-[#019D51] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#02ED9D] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#019D51]"></span>
          {t('join-approved')}
        </div>
      )}
    </>
  );
};

export default BadgeJoinRequest;
