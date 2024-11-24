const Team = () => {
  return (
    <div className="my-40 lg:max-w-5xl sm:max-w-2xl max-sm:max-w-sm mx-auto ">
      <h2 className="text-center text-5xl font-medium font-teko text-custom-green">
        Our Team
      </h2>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-md:justify-center mt-12">
        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-1.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">John Doe</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">Fleet Manager</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-2.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">Mark Adair</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">
              Customer Relations Manager
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-3.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">Simon Konecki</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">Operations Manager</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-4.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">Jane Smith</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">Logistics Coordinator</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-5.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">Alen</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">Marketing Specialist</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center bg-gray-200 p-4 rounded-none relative">
          <div className="col-span-2 min-h-[190px]">
            <img
              src="https://readymadeui.com/team-6.webp"
              className="rounded-none"
              alt="Team member"
            />
          </div>

          <div className="bg-white rounded-none p-4 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
            <h4 className="text-gray-800 text-sm font-bold">Sophia</h4>
            <p className="text-[10px] text-gray-500 mt-0.5">United States</p>
            <p className="text-gray-800 mt-2 text-xs">Web Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
