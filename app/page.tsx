// app/page.tsx
import HomeShowcaseMock from "@/components/HomeShowcaseMock";
import HeroFrame from "@/components/HeroFrame";

export default function Page() {
  return (
    <HeroFrame>
      <HomeShowcaseMock />
    </HeroFrame>
  );
}