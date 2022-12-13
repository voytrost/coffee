function BasketItem(props) {
    const {
        id,
        title,
        price,
        quantity,
        removeFromBasket = Function.Prototype,
        incQuantity = Function.Prototype,
        decQuantity = Function.Prototype,
    } = props;

    return (
        <li className="collection-item">
            {title}
            <i
                className="material-icons basket-quantity"
                onClick={() => decQuantity(id)}
            >
                remove
            </i>
            x {quantity} = {title}{" "}
            <i
                className="material-icons basket-quantity"
                onClick={() => incQuantity(id)}
            >
                add
            </i>
            {price * quantity}$
            <span
                className="secondary-content"
                onClick={() => removeFromBasket(id)}
            >
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>
    );
}

export { BasketItem };
