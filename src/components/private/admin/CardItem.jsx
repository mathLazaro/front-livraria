import React from "react";

export default function CardItem({ item }) {
    console.log(item);
    return (
        <div>
            <div>{item.titulo}</div>
            <div>{item.autor}</div>
            <div>
                <img src={item.capa} alt="capa" />
            </div>
        </div>
    );
}
