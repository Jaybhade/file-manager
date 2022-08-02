import { useEffect, useRef, useState } from "react";
import { JsxAttribute } from "typescript";

type Props = {
  onBottomHit: () => void;
  isLoading: boolean;
  hasMoreData: boolean;
  loadOnMount: boolean;
  children: JsxAttribute;
};

const InfiniteScroll = ({
  onBottomHit,
  isLoading,
  loadOnMount,
  children,
}: any) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const isBottom = (ref: React.RefObject<HTMLDivElement>) =>  {
    if (!ref.current) {
      return false;
    }
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  };

  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit();
      setInitialLoad(false);
    }
  }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (isBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [onBottomHit, isLoading]);

  return <div ref={contentRef}>{children}</div>;
};

export default InfiniteScroll;
