import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col space-y-10 justify-center m-10">
      <nav className="flex justify-center flex-wrap gap-6 text-white">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-custom-green" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about/who-are-we"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-custom-green" : ""
          }
        >
          About
        </NavLink>
        <NavLink
          to="/bike-listing"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-custom-green" : ""
          }
        >
          Bike Listing
        </NavLink>{" "}
        <NavLink
          to="/contact-info"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "text-custom-green" : ""
          }
        >
          Contact
        </NavLink>
        <div className="hover:text-custom-green">Privacy Policy</div>
        <div className="hover:text-custom-green">Terms of Service</div>
      </nav>

      <div className="flex justify-center space-x-5">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
            alt="Facebook"
          />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
            alt="LinkedIn"
          />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
            alt="Instagram"
          />
        </a>
        <a
          href="https://messenger.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png"
            alt="Messenger"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/fluent/30/000000/twitter.png"
            alt="Twitter"
          />
        </a>
      </div>
      <p className="text-center text-custom-green font-normal text-xs">
        &copy; 2022 Company Ltd. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
