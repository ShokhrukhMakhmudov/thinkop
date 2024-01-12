"use client";
import Image from "next/image";
import React, { useRef, useState, useMemo } from "react";
import data from "../data/mockData";

type Wrapper = null | {
  current?: {
    scrollBy: (options: { left: number }) => void;
  };
};
function Slider() {
  const wrapper = useRef<Wrapper & HTMLDivElement>(null);
  const item = useRef(null);

  const slidesIndex = useMemo(() => {
    return data.reduce(
      (acc, { title }, i) => {
        let index = title.length > 35 ? 688 : 344;
        return [...acc, acc[i] + index];
      },
      [0]
    );
  }, [data.length]);

  const handleNext = () => {
    let scroll = wrapper?.current?.scrollLeft ?? 0;
    for (let item of slidesIndex) {
      if (item > scroll + 1) {
        wrapper?.current?.scroll({ left: item });
        break;
      }
    }
  };

  const handlePrevious = () => {
    let scroll = wrapper?.current?.scrollLeft ?? 0;
    for (let item of [...slidesIndex].reverse()) {
      if (item < scroll) {
        wrapper?.current?.scroll({ left: item });
        break;
      }
    }
  };

  return (
    <div className="w-full">
      <div
        ref={wrapper}
        className="wrapper overflow-x-auto grid grid-flow-col auto-cols-max mb-10"
        onWheel={(event) => {
          wrapper?.current?.scrollBy({
            left: event.deltaY < 0 ? -86 : 86,
          });
        }}
        onMouseEnter={() => (document.body.style.overflowY = "hidden")}
        onMouseLeave={() => (document.body.style.overflowY = "auto")}>
        {data &&
          data.map(({ id, types, img, title, date }, ind) => {
            return (
              <div
                ref={item}
                className={`${title.length > 35 ? "col-span-2" : "col-span-1"}`}
                key={id}>
                <Image
                  className="frame4 mb-8 w-[100%] h-[344px] object-cover"
                  src={img}
                  alt={title}
                  width={344}
                  height={344}
                />
                <h3 className="mb-4 text-[28px] font-semibold text-[#525C7A]">
                  {title}
                </h3>
                <p className="text-[18px] text-[#A2ACC7]">{date}</p>
              </div>
            );
          })}
      </div>
      <div className="flex items-center justify-between py-3">
        <button
          className="text-[#C9D0E1] hover:text-[#7884A5]"
          onClick={handlePrevious}>
          <svg
            width="173"
            height="23"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M1 10h172v3H1z" />
            <path
              d="M12 0v0c0 6.075-4.925 11-11 11H0M12 23v0c0-6.075-4.925-11-11-11H0"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </button>
        <button
          className="text-[#C9D0E1] hover:text-[#7884A5]"
          onClick={handleNext}>
          <svg
            width="173"
            height="23"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M172 10H0v3h172z" />
            <path
              d="M161 0v0c0 6.075 4.925 11 11 11h1M161 23v0c0-6.075 4.925-11 11-11h1"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Slider;
