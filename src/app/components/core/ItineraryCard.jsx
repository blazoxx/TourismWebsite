import { Plane, Train, Car, Utensils, BedDouble, Info } from "lucide-react";

export default function ItineraryCard({
  day,
  title,
  description,
  travelInfo,
  image,
  activities,
  food,
  accommodation,
  bestTime,
  tips,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl shadow-md p-6">
      {/* Left Section */}
      <div className="md:w-1/2">
        {image && (
          <img src={image} alt={title} className="rounded-xl mb-4 w-full object-cover h-56" />
        )}
        <h3 className="text-xl font-bold mb-2">Day {day} - {title}</h3>
        <p className="text-gray-700">{description}</p>

        {/* Activities */}
        {activities && activities.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1">Activities</h4>
            <ul className="list-disc ml-5 text-gray-600">
              {activities.map((act, i) => (
                <li key={i}>{act}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Food */}
        {food && food.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              <Utensils size={16} /> Food
            </h4>
            <ul className="list-disc ml-5 text-gray-600">
              {food.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Accommodation */}
        {accommodation && accommodation.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              <BedDouble size={16} /> Stay
            </h4>
            <ul className="list-disc ml-5 text-gray-600">
              {accommodation.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Best Time */}
        {bestTime && (
          <p className="mt-4 text-sm text-gray-600">
            <strong>Best Time:</strong> {bestTime}
          </p>
        )}

        {/* Tips */}
        {tips && tips.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-1 flex items-center gap-2">
              <Info size={16} /> Travel Tips
            </h4>
            <ul className="list-disc ml-5 text-gray-600">
              {tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col justify-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white font-bold mb-4 mx-auto">
          {day}
        </div>
        <h4 className="font-semibold mb-2">Mode of Travel</h4>
        <ul className="space-y-2 text-gray-700">
          {travelInfo?.map((info, i) => (
            <li key={i} className="flex items-start gap-2">
              {info.type === "flight" && <Plane size={16} />}
              {info.type === "train" && <Train size={16} />}
              {info.type === "car" && <Car size={16} />}
              <span>{info.detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Explore Destination
          </button>
          <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100">
            View Accommodations
          </button>
        </div>
      </div>
    </div>
  );
}
