import { ReactNode, useCallback, useRef } from "react";
import ClickAwayListener from "./ClickAwayListners";

interface Props {
  className?: string;
  children: ReactNode;
}
export default function PopupMenu({ className, children }: Props) {
  const boxRef = useRef(null);

  //   const handleClickAway = useCallback((event: Event) => {
  //     if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
  //     }
  //   }, []);
  return (
    <div ref={boxRef} className={`popup ${className}`}>
      <div className="popuppicker">{children}</div>
    </div>
  );
}
