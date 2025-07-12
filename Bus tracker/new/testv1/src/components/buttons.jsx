export default function Buttons({prop}) {

    return (
            <button key={prop.name} className="bottom-bar-buttons" onClick={prop.func}>
                <img src={prop.icon} height={prop.height}/>
                <label>{prop.name}</label>
            </button>
    )
}