import { FC } from "react";
import CountUp from "react-countup";

const Gallery: FC = () => {
  return (
    <div className="text-center space-y-3">
      <p className="text-2xl">
        <CountUp
          end={144}
          formattingFn={(value) => value.toLocaleString()}
          className="font-semibold"
        />{" "}
        Asks
      </p>
      <p>and</p>
      <p className="text-2xl">
        <CountUp
          end={136}
          formattingFn={(value) => value.toLocaleString()}
          className="font-semibold"
        />{" "}
        Bids
      </p>
      <p>on</p>
      <p className="text-2xl">
        <CountUp
          end={48}
          formattingFn={(value) => value.toLocaleString()}
          className="font-semibold"
        />{" "}
        Items
      </p>
    </div>
  );
};

export default Gallery;
