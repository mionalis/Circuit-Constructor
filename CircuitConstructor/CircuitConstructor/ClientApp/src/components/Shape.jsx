import "./styles/canvasStyles.css";

/**
 * Элемент электрической цепи, отображаемый на монтажной поверхности.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Shape = (props) => {
    return (
        <div className="shape">
            {props.post.body}
        </div>
    );
}

export default Shape;