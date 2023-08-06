import React, { useState, useEffect } from "react";

const CardTile = ({cardFront, cardBack}) => {

    return (
        <div>
            <div>
            {cardFront}
            {cardBack}
            </div>
            <div> 
            <button>
            Edit
            </button>
            <button>
            Delete
            </button>
            </div>
        </div>
    )
}

export default CardTile;