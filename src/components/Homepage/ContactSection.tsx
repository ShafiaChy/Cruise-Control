import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const ContactSection = () => {
  return (
    <div className=" my-40 grid sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-4xl bg-transparent font-[sans-serif]">
      <div>
        <h1 className="text-custom-green font-teko text-5xl font-medium">
          Let's Talk
        </h1>
        <p className="text-sm text-gray-300 mt-4">
          Have some big idea or brand to develop and need help? Then reach out,
          we'd love to hear about your project and provide help.
        </p>

        <div className="mt-12">
          <h2 className="text-gray-400 font-teko text-2xl font-medium">
            Email
          </h2>
          <ul className="mt-2">
            <li className="flex items-center">
              <div className="bg-transparent h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <FaEnvelope className="text-custom-green  w-8 h-8" />
              </div>
              <a
                href="mailto:info@example.com"
                className="text-gray-200 text-sm ml-4"
              >
                <small className="block">Mail</small>
                <strong className="italic underline">info@example.com</strong>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-gray-400 font-teko text-2xl font-medium">
            Socials
          </h2>

          <ul className="flex mt-2 space-x-6">
            <li className="bg-transparent h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="">
                <FaFacebookF className="text-custom-green w-5 h-5" />
              </a>
            </li>
            <li className="bg-transparent h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="">
                <FaLinkedinIn className="text-custom-green w-5 h-5" />
              </a>
            </li>
            <li className="bg-transparent h-10 w-10 rounded-full flex items-center justify-center shrink-0">
              <a href="">
                <FaInstagram className="text-custom-green w-5 h-5" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <form className="ml-auto space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full rounded-none py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-none "
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-none py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-none "
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded-none py-3 px-4 bg-gray-100 text-gray-800 text-sm outline-none "
        />
        <textarea
          placeholder="Message"
          rows={6}
          className="w-full rounded-none px-4 bg-gray-100 text-gray-800 text-sm pt-3 outline-none "
        ></textarea>
        <button
          type="button"
          className="text-white bg-custom-green hover:bg-green-600 tracking-wide rounded-none text-sm px-4 py-3 w-full !mt-6"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
