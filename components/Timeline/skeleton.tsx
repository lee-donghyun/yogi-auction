const TimelineSkeleton = () => (
  <div>
    <div className="relative">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <TimeBlock key={i} />
        ))}
    </div>
  </div>
);

export default TimelineSkeleton;

const TimeBlock = () => (
  <div className="pl-4 pb-4 border-l border-l-gray-100">
    <div className="absolute w-3 h-3 rounded-full -left-1.5 bg-gray-100 border border-white"></div>
    <div className="mb-1 bg-gray-100 h-4 w-36"></div>
    <div className="bg-gray-100 w-24 h-6"></div>
    <div className="text-sm mt-1 bg-gray-100 w-full h-16"></div>
  </div>
);
