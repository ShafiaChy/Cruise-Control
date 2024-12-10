import WorkingStepsBg from '../../assets/adv-car.png'
interface Step {
    id: number;
    title: string;
    description: string;
  }
const WorkingSteps = () => {
    const steps: Step[] = [
        { id: 1, title: "Choose A Car", description: "Check out our range of cars and choose the car of your choice" },
        { id: 2, title: "Pick Up Date", description: "Check out our range of cars and choose the car of your choice" },
        { id: 3, title: "Confirm Your Booking", description: "Check out our range of cars and choose the car of your choice" },
        { id: 4, title: "Enjoy Driving", description: "Check out our range of cars and choose the car of your choice" },
      ];

  return (
    <section className="mt-32 relative bg-white" style={{ backgroundImage: `url(${WorkingStepsBg})`, backgroundRepeat:"no-repeat" ,backgroundSize:"cover"}}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h3 className="bg-white pt-7 text-orange-500 text-xl tracking-wider uppercase text-center">
          - How It Work -
        </h3>
        <h2 className="pb-10 bg-white text-5xl font-bold text-center mb-12">
           Following Working Steps 
        </h2>
        <div className=" py-10" >
            <div className="container mx-auto px-4">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step) => (
                    <div key={step.id} className="bg-gray-100 relative rounded-md shadow-md p-6">
                    {/* Step Number Badge */}
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                        {step.id < 10 ? `0${step.id}` : step.id}
                    </div>
                    {/* Content */}
                    <div className="mt-8 text-center">
                        <h3 className="text-lg font-bold">{step.title}</h3>
                        <p className="text-gray-600 mt-2 text-sm">{step.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
      </div>
      
    </section>
  );
};

export default WorkingSteps;
