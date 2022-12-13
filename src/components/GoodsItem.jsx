function GoodsItem(props) {
    const {
        id,
        title,
        price,
        description,
        thumbnail,
        addToBasket = Function.prototype,
    } = props;
    return (
        <div className="card">
            <div className="card-image">
                <img src={thumbnail} alt={title} className="card-img" />
            </div>
            <span className="card-title center-align">{title}</span>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-action">
                <button
                    className="btn"
                    onClick={() => addToBasket({ id, title, price })}
                >
                    Buy
                </button>
                <span className="right" style={{ fontSize: "1.8rem" }}>
                    {price} $
                </span>
            </div>
        </div>
    );
}
export { GoodsItem };
