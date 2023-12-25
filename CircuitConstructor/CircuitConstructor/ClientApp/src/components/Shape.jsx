import {ReactComponent as Inductor} from "./svgElements/circuitElements/Inductor.svg";
import {ReactComponent as Resistor} from "./svgElements/circuitElements/Resistor.svg";
import {ReactComponent as Capacitor} from "./svgElements/circuitElements/Capacitor.svg";
import "./styles/canvasStyles.css";

const Shape = (props) => {
    return (
        <div className="shape">
            {props.post.body}
        </div>
    );
}

export default Shape;