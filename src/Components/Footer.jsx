import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <section className="py-10 bg-gray-100">
    <div className="flex flex-col items-center justify-center">
      <img src=" /public/images/logo.jpg" className="w-24 mb-2"/>
      <Link to="/">@EBookstore </Link>
    </div>
      <p className="mx-auto w-fit text-sm absolute right-4">
        ❤ By Dev Muliya
      <div className="text-[10px]"> @{year} All rights reserved</div>
      </p>
    </section>
  );
};

export default Footer;
