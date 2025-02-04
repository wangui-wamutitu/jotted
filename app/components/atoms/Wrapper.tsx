import { ReactNode } from "react";
import Footer from "../molecules/Footer";
import { Header } from "../molecules/Header";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className={'min-h-screen flex flex-col justify-between'}>
      <Header />

      <div className="w-full flex flex-col items-center justify-center ">
        <div
          className={
            "w-full lg:w-[70%] xl:w-[55%] 2xl:w-[35%] px-[1rem] md:px-[3rem]"
          }
        >
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
