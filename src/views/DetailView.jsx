import React from "react";
import { useParams } from "react-router-dom";
import CardDetail from "../components/CardDetail";

const DetailView = () => {
    const { type, id } = useParams();

    return (
        <div className="container mt-5">
            <CardDetail type={type} id={id} />
        </div>
    );
};

export default DetailView;