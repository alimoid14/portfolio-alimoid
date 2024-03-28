import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { div } from "three/examples/jsm/nodes/Nodes.js";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  return (
    <div className=" max-w-prose">
      <PrismicRichText field={slice.primary.text} />
    </div>
  );
};

export default TextBlock;
