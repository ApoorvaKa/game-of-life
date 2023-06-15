import ReactSlider from "react-slider";
import "./Slider.css";
    
const Slider = ({percentage}) => {
    return (
        <div>
            <ReactSlider
                className="customSlider"
                trackClassName="customSlider-track"
                thumbClassName="customSlider-thumb"
                min={0}
                max={100}
                defaultValue={30}
                value={percentage}
            />
        </div>
    );
};
    
export default Slider;