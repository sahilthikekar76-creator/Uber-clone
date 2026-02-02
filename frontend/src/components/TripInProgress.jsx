const TripInProgress = ({ ride, onEndTrip }) => {
  const { trip } = ride;

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white rounded-t-2xl p-4 shadow-xl z-40">
        <p className="text-xs text-gray-500">Drop location</p>
        <p className="text-lg font-semibold">{trip.drop}</p>

        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{trip.distance} left</span>
          <span>{trip.eta}</span>
        </div>

        <button
          onClick={onEndTrip}
          className="w-full mt-4 bg-black text-white py-3 rounded-lg"
        >
          End Trip
        </button>
      </div>
    </>
  );
};

export default TripInProgress;
