import { FC } from "react";

export type TimelineData = {
  time: string;
  title: string;
  content: string;
};
type Props = {
  past: TimelineData[];
  future: TimelineData[];
};
const Timeline: FC<Props> = ({ past, future }) => {
  return (
    <div>
      <ol className="relative">
        {past.map((data, i) => (
          <TimeBlock data={data} mode="past" key={data.time + i} />
        ))}
      </ol>
      <ol className="relative">
        {future.map((data, i) => (
          <TimeBlock data={data} mode="future" key={data.time + i} />
        ))}
      </ol>
    </div>
  );
};

export default Timeline;

const TimeBlock: FC<{ data: TimelineData; mode: "future" | "past" }> = ({
  data,
  mode,
}) => {
  return (
    <li
      className={`
        pl-4 border-l 
        ${
          mode === "future"
            ? "border-l-gray-200"
            : "border-l-black last:border-l-gray-200"
        }
      `}
    >
      <div
        className={`
          absolute w-3 h-3 rounded-full -left-1.5 
          ${mode == "future" ? "bg-gray-200" : "bg-black"} 
          border border-white
        `}
      ></div>
      <time className="mb-1 text-xs text-gray-400" dateTime={data.time}>
        {data.time}
      </time>
      <h3 className="font-semibold">{data.title}</h3>
      <p className="pb-4 text-sm text-gray-500">{data.content}</p>
    </li>
  );
};
