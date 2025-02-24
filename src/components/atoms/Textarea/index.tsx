import clsx from "clsx";
import { forwardRef } from "react";
import styles from "./styles.module.css";

type Props = React.ComponentPropsWithRef<"textarea">;

// forwardRefでrefを親要素から子要素に渡すことができる
export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        {...props}
        ref={ref}
        className={clsx(className, styles.module)}
      />
    );
  }
);
