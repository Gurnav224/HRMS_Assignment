import dashboard_preview from "../../../assets/0b16e7d0e54f5ea69def92a8e3982fc5f2d8a09a.png";

const CardLeft = () => {
  return (
    <div className="card-left">
      <div className="card-image">
        <img src={dashboard_preview} alt="Dashboard preview" />
      </div>

      <div className="card-text">
        <h2 className="card-heading">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
        </h2>
        <p className="card-paragraph">
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat.
        </p>

        <div className="slider-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLeft;
