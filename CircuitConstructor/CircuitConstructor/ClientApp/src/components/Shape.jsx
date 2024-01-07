import "./styles/canvasStyles.css";

// Элемент электрической цепи.
const Shape = (props) => {
    return (
        <div className="shape">
            {props.post.body}
        </div>
    );
}

export default Shape;