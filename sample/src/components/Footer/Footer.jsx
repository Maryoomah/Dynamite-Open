import { useRouter } from "next/router";
const Footer = () => {

  const router = useRouter();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full fixed bottom-0 bg-primary">
      {/* {
        router.pathname == "/" && 
        <Sponsors/>
      } */}
      <div className="w-full lg:max-w-[85%] lg:mx-auto flex justify-between items-center lg:flex-row flex-col lg:flex-nowrap flex-wrap p-3 lg:p-4">
        <h3 className="text-white text-sm">
          &copy; {currentYear}. All rights reserved
        </h3>
        <h3 className="text-white text-sm uppercase">KSSA.</h3>
      </div>
    </footer>
  );
};

export default Footer;
