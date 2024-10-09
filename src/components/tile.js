export const Tile = ({val, i, j, onClick}) => {
    return <div
        onClick={onClick}
        style={{
            backgroundColor : "green",
            height: "8rem",
            width: "8rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            position: "absolute",
            top: "10rem",
            left: "10rem",
            
            transform: `translate(${9*(j-1)}rem, ${9*(i-1)}rem)`,
            transition: "transform 0.3s ease",
            cursor: "pointer",
            fontSize:"2rem"
        }}>
            {val}
    </div>
}

export default Tile;