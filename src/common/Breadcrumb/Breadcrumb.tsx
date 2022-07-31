import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./breadcrumb.css";

const Breadcrumb = (props: AppProps) => {
  const [urlArray, setUrlArray] = useState<any>([]);
  const [backUrl, setBackUrl] = useState<string>("");

  useEffect(() => {
    const urls = props.url.split("/");
    let splitUrl = "";
    const customUrlArray = [];
    for (let i = 1; i < urls.length; i++) {
      splitUrl += "/" + urls[i];
      customUrlArray.push({ name: urls[i], url: splitUrl });
    }
    setUrlArray([...customUrlArray]);
    if (customUrlArray.length >= 2)
      setBackUrl(customUrlArray[customUrlArray.length - 2].url);
  }, [props.url]);

  return (
    <ul className="brd117Breadcrumb">
      {backUrl ? (
        <Link to={backUrl}>
          <div className="brd118NavigateBack">⬆</div>
        </Link>
      ) : (
        <div className="brd118NavigateBack disable">⬆</div>
      )}
      <span className="brd222List">
        {urlArray.map((data: any) => {
          return (
            <React.Fragment key={data.url}>
              <div> / </div>
              <Link to={data.url}>
                <div className={props.url !== data.url ? "brd119MakeLight" : ""}>
                  {data.name}
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      </span>
    </ul>
  );
}

type AppProps = {
  url: string;
};

export default Breadcrumb;
