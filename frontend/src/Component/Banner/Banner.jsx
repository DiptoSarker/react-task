import "./Banner.css";
import bannerImage from "../../assets/banner.jpeg";

function Banner() {
  return (
    <div className="header">
      <img src={bannerImage} alt="" />
    </div>
  );
}

export default Banner;
