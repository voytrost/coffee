import { Preloader } from "./Preloader";
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

import { API_URL } from "../config";

import { useState, useEffect } from "react";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        );
        if (itemIndex < 0) {
            const newItem = { ...item, quantity: 1 };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return { ...orderItem, quantity: orderItem.quantity + 1 };
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder);
        }
        setAlertTitle(item.title);
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if ((el.id = itemId)) {
                const newQuantity = el.quantity + 1;
                return { ...el, quantity: newQuantity };
            } else return el;
        });
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if ((el.id = itemId)) {
                const newQuantity = el.quantity - 1;
                return { ...el, quantity: newQuantity >= 0 ? newQuantity : 0 };
            } else return el;
        });
        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertTitle("");
    };

    useEffect(function getGoods() {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                data.products.slice(0, 28) &&
                    setGoods(data.products.slice(0, 28));

                setLoading(false);
            });
    }, []);

    return (
        <main className="container content">
            <Cart
                quantity={order.length}
                handleBasketShow={handleBasketShow}
                removeFromBasket={removeFromBasket}
            />
            {loading ? (
                <Preloader />
            ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertTitle && <Alert title={alertTitle} closeAlert={closeAlert} />}
        </main>
    );
}
export { Shop };
