import axios from "axios";
import { useCallback, useRef, useState } from "react";
import ImageThumbnail from "../../common/ImageThumbnail";

const Images = (props: AppProps) => {

  const observer = useRef<IntersectionObserver>();

  const [imageData, setImageData] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const LoadMore = async () => {
    let randomPosts;
    let newImages: any;
    try {
      randomPosts = await axios.get(
        `https://api.unsplash.com/photos/random?page=1&query=${props.folderName}&count=10&client_id=TcS3v_GtSFzM9_jiqfdfLD-l8wmfuIZ_H5__afwvPec`
      );
      newImages = randomPosts.data;
    } catch (error: any) {
      newImages = [];
      if (error.response.status === 404) {
        setErrorMessage("Images Not Found.");
      } else if (error.response.status === 403) {
        setErrorMessage(error.message);
      }
    }
    // TcS3v_GtSFzM9_jiqfdfLD-l8wmfuIZ_H5__afwvPec
    // A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I
    // iCJ88n7zrJEbDaDih1boz9UbAFAb3vXVitmfo6UNWek

    setImageData((prevData: any) => [...prevData, ...newImages]);
  };

  const lastElementRef = useCallback(
    (node: HTMLImageElement) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) LoadMore();
      });

      if (node) observer.current.observe(node);
    },
    [LoadMore]
  );

  return (
    <div>
      {/* error message */}
      {errorMessage.length > 0 && (
        <div
          className={
            errorMessage.length > 0 ? "fsc168Error" : "fsc169DisplayNone"
          }
        >
          <div></div>
          <h2>{errorMessage}</h2>
        </div>
      )}

      {/* images */}
      {errorMessage.length === 0 && (
        <>
          {imageData.map((data: any) => {
            return <ImageThumbnail {...data} />;
          })}
        </>
      )}

      {/* loader */}
      {errorMessage.length === 0 && (
        <div ref={lastElementRef} className="fsc167LoadImagesParent">
          <div className="fsc166LoadImages"></div>
        </div>
      )}
    </div>
  );
};

type AppProps = {
    folderName: string;
}

export default Images;