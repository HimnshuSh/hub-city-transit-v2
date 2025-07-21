export default function ButtonComponent({ prop, isActive, onClick }) {
    return (
        <button
            key={prop.name}
            className={`bottom-bar-buttons ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <img src={prop.icon} height={prop.height} />
            <label>{prop.name}</label>
        </button>
    );
}