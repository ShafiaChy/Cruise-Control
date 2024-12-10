
import { FaFacebook,FaSquareXTwitter,FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer  className="background-image bg-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Logo and Contact */}
        <div>
          <div className="flex items-center mb-4">
            <div className="text-orange-500 text-3xl mr-2">
              <i className="fas fa-car"></i>
            </div>
            <h1 className="text-2xl font-bold text-white">Cruise Control</h1>
          </div>
          <address className="not-italic mb-4">
            57 heol isaf Station Road, <br />
            Cardiff, UK
          </address>
          <p className="mb-2">info@example.com</p>
          <p>029-2021-4012</p>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Our Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-bold mb-4">Community</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Area Details
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog Grid
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Service Areas
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Subscribe Newsletter</h3>
          <p className="mb-4 text-gray-400">
            Our estimated global carbon emissions by investing in greenhouse
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white mb-4"
            />
            <button
              type="submit"
              className="h-2/5  bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black container mx-auto mt-10 border-t border-gray-700 pt-4 px-4 flex justify-between items-center">
        <p className="text-gray-400 text-sm">
          Copyright © 2024 <span className="text-orange-500">Cruise Control</span>, Inc.
          All Rights Reserved
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-3xl hover:text-orange-500">
          <FaFacebook />

          </a>
          <a href="#" className="text-3xl hover:text-orange-500">
            <FaSquareXTwitter/>
          </a>
          <a href="#" className="text-3xl hover:text-orange-500">
          <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
