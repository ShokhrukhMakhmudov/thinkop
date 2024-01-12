import Slider from "'@/components/slider'";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-start p-12">
        <header className="mb-14">
          <h1 className="text-[72px] font-bold text-[#7884A5] mb-14">
            Полезные материалы
          </h1>
          <p className="max-w-[820px] text-2xl text-[#292E3D]">
            Собрали для вас полезные исследования схемы кормления и другие
            материалы, которые пригодятся для лучших результатов на вашем
            хозяйстве
          </p>
        </header>
        <Slider />
      </div>
    </>
  );
}
