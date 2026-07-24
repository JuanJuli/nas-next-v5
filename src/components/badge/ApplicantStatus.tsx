const BadgeAplStatus = ({ state }: { state: string }) => {
  return (
    <>
      {(state === 'TL' || state === 'BK') && (
        <div className="text-nowrap text-[12px] bg-[#FEF1E9] text-red-500 font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FDC3AA] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-red-500"></span>
          Belum Kompeten
        </div>
      )}
      {(state === 'L' || state === 'K') && (
        <div className="text-nowrap text-[12px] bg-[#E5FEF1] text-[#019D51] font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#02ED9D] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-[#019D51]"></span>
          Kompeten
        </div>
      )}
      {state && state === 'Reset' && (
        <div className="text-nowrap text-[12px] bg-[#FEF1E9] text-red-500 font-semibold rounded-md w-fit p-[2px] px-[8px] border-[#FDC3AA] border-solid border-[1px] flex items-center gap-1">
          <span className="dot bg-red-500"></span>
          Reset
        </div>
      )}

      {state !== 'TL' && state !== 'BK' && state !== 'L' && state !== 'K' && state !== 'Reset' && <div>-</div>}
    </>
  );
};

export default BadgeAplStatus;
