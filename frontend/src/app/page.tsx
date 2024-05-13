import Footer from "@/components/Home/Footer";
import LoginForm from "@/components/Home/LoginForm";
import Navbar from "@/components/Home/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex px-5 lg:px-32 min-h-[calc(100vh-180px)]">
          <div className="flex flex-col gap-8 w-full xl:pr-32 lg:w-1/2">
            <div className="flex flex-col gap-5">
              <p className="text-purple-700 text-[72px] leading-[70px] lg:text-[90px] font-medium lg:leading-[85px] tracking-tight bg-gradient bg-clip-text">
                MHY
                <br /> anytime, anywhere_
              </p>
              <p className="text-lg leading-7 text-gray-600">
                MHY makes it easy and fun to quickly chat with people all
                around the globe.
              </p>
            </div>
            <LoginForm />
          </div>
          <div className="object-cover w-0 lg:w-2/5">
            <img src="/images/Work chat-bro.svg" alt="hero" draggable="false"/>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}