import "./title.scss";
import lines from "../../assets/lines.png";
import pencil from "../../assets/pencil.png";
import text from "../../assets/text.png";
import write from "../../assets/write.png";
import camera from "../../assets/camera.png";
import style from "../../assets/style.png";
import hamburger from "../../assets/hamburger.png";
function Title() {
  return (
    <div className="main">
      <div className="container1">
        <div className="name">
          D<span className="color">OO</span>DLE
        </div>
      </div>
      <div className="images">
        <img src={lines} className="line" />
        <img src={pencil} className="pencil" />
      </div>
      <div className="container2">
        <div className="sen">
          Start your <br />
          adventure by taking <br /> notes{" "}
          <span className="green"> right away!</span>
        </div>
        <div className="seperator"></div>
        <div className="image">
          <div className="box1">
            <img src={text} />
          </div>
          <div className="box2">
            <img src={write} />
            <img src={camera} />
            <img src={style} />
            <img src={hamburger} />
          </div>
        </div>
        <button className="container3" >
          Get started
        </button>
      </div>
    </div>
  );
}
export default Title;
