export default function Loading() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="relative inline-block h-16 w-16">
        <div className="loading-dot animation-delay-[-0.036s] after:left-[50px] after:top-[50px]"></div>
        <div className="loading-dot animation-delay-[-0.072s] after:left-[45px] after:top-[54px]"></div>
        <div className="loading-dot animation-delay-[-0.108s] after:left-[39px] after:top-[57px]"></div>
        <div className="loading-dot animation-delay-[-0.144s] after:left-[32px] after:top-[58px]"></div>
        <div className="loading-dot animation-delay-[-0.18s] after:left-[25px] after:top-[57px]"></div>
        <div className="loading-dot animation-delay-[-0.216s] after:left-[19px] after:top-[54px]"></div>
        <div className="loading-dot animation-delay-[-0.252s] after:left-[14px] after:top-[50px]"></div>
        <div className="loading-dot animation-delay-[-0.288s] after:left-[10px] after:top-[45px]"></div>
      </div>
    </div>
  );
}
