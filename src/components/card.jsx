const Card = (props) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        {props.poster_path && (
            <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
                alt={`Poster ${props.title}`}
            />
        )}
    </div>
    
    
    );
};

export default Card;
