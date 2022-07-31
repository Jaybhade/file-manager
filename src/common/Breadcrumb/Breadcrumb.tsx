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
          <li className="brd118NavigateBack">⬆</li>
        </Link>
      ) : (
        <li className="brd118NavigateBack disable">⬆</li>
      )}
      <span className="list">
        {urlArray.map((data: any) => {
          return (
            <React.Fragment key={data.url}>
              <li> / </li>
              <Link to={data.url}>
                <li className={props.url !== data.url ? "brd119MakeLight" : ""}>
                  {data.name}
                </li>
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
