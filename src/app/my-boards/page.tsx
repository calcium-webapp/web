import Navbar from "@/components/MyBoards/navbar";
import { TypographyH3 } from "@/components/ownui/typography";

export default function Boards() {
  return (
    <>
      <Navbar />
      <main>
        <div className="main_content mt-5 mx-auto max-w-screen-xl">
          <TypographyH3>My boards</TypographyH3>
        </div>
      </main>
    </>
  );
}
