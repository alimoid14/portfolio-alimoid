"use client";

import { useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { gsap } from "gsap";
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        ".name-animation",
        { opacity: 0, rotate: -10, y: -100 },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "back.out(1.7)",
          y: 0,
          duration: 0.75,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title",
        { opacity: 0, x: -100 },
        {
          opacity: 100,
          x: 0,
          duration: 0.75,
          ease: "back.out(2.5)",
          stagger: { each: 0.1, from: "random" },
        }
      );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return null;
    return name.split("").map((letter, index) => {
      if (letter === " ") return " ";
      return (
        <span
          key={index}
          className={`name-animation name-animation-${key} inline-block opacity-0`}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div
        className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center"
        aria-label={slice.primary.first_name + " " + slice.primary.last_name}
      >
        <Shapes />

        <div className=" col-start-1 md:row-start-1">
          <h1 className="mb-8 font-extrabold tracking-tighter leading-none text-[clamp(3rem,20vmin,20rem)]">
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-amber-500 via-yellow-200 to-amber-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
