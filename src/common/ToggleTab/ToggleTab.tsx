import "./toggleTab.css"

function ToggleTab(props: AppProps) {

    const showFirst = props.isFirst ? "tgt145ToggleTab tgt146Tab1" : "tgt145ToggleTab";
    const showSecond = props.isFirst ? "tgt145ToggleTab" : "tgt145ToggleTab tgt147Tab2";

  return (
    <div className='tgt148ToggleTabParent'>
        <div className={showFirst} onClick={props.setFirst}>{props.first}</div>
        <div className={showSecond} onClick={props.setSecond}>{props.second}</div>
    </div>
  )
}

type RequiredProps = {
    first: string;
    second: string;
    isFirst: boolean;
}

type DefaultProps = {
    first: string;
    second: string;
    setFirst: any;
    setSecond: any;
    isFirst: boolean;
}

type AppProps = RequiredProps & DefaultProps;

ToggleTab.defaultProps = {
    first: "First",
    second: "Second",
    isFirst: true
} as DefaultProps;

export default ToggleTab;