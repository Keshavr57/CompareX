import { FaSearch, FaBalanceScale, FaStar, FaLightbulb } from "react-icons/fa";

const features = [
  { icon: <FaSearch size={30} className="text-indigo-600"/>, title: "Search Products", desc: "Quickly find mobiles, laptops, and gadgets." },
  { icon: <FaBalanceScale size={30} className="text-indigo-600"/>, title: "Side-by-Side Comparison", desc: "Compare specs, prices, and features easily." },
  { icon: <FaStar size={30} className="text-indigo-600"/>, title: "User Reviews", desc: "Read feedback and ratings from real users." },
  { icon: <FaLightbulb size={30} className="text-indigo-600"/>, title: "Smart Suggestions", desc: "Get the best product recommendations." },
];

export default function KeyFeatures() {
  return (
    <div className="py-16 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Why CompareX?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f, idx) => (
          <div key={idx} className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
