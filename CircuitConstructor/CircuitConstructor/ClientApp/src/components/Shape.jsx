import "./styles/canvasStyles.css";

const Shape = (props) => {
    return (
        <div className="shape">
            {props.post.body}
        </div>
    );
}

export default Shape;