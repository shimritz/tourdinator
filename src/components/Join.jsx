import React, { useState } from "react";

export default function Join({ tour }) {
  const [ticketsAmount, setTicketsAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const price = Number(tour.price);
  // const amount = Number(tour.ticketsAmount);
  const discount = Number(tour.discount);
  const discountStartAt = Number(tour.discountStartAt);
  const handleChange = (e) => {
    setTicketsAmount(e.target.value);
  };

  // const calculatDiscountedPrice = (e) => {
  //   if (tour.startingfrom === e.target.value) {
  //     {
  //       let discountedAmount = tour.price * tour.discountAmount;
  //       tour.price = tour.price - discountedAmount;
  //     }
  //   }
  // };

  // const totalPrice = 0;
  const totalPriceCalculation = () => {
    let totalPrice = 0;
    // console.log(typeof amount, "amount", amount);

    const isDiscountProvided = discount > 0;
    const shouldCalculateDiscount = ticketsAmount >= discountStartAt;

    totalPrice = price * ticketsAmount;

    if (isDiscountProvided && shouldCalculateDiscount) {
      const discountedPrice = (totalPrice * discount) / 100;
      totalPrice = totalPrice - discountedPrice;
    }

    setTotalPrice(totalPrice);
  };

  function handleJoin() {
    const attending = [];
  }

  return (
    <div className="flex justify-between space-x-3">
      {/* <div className="flex space-x-1 text-sm"> */}
      {/* <p>{price ? "The price is" : "FREE"}</p> */}
      <p>`${tour.price} shekel`</p>

      <label className="text-md">Tickets</label>
      <input
        type="number"
        className="p-3 text-black-50 rounded w-8px"
        placeholder={ticketsAmount}
        value={ticketsAmount}
        onChange={handleChange}
        onClick={totalPriceCalculation}
      >
        {/* {numberTickets} */}
      </input>
      {/* </div> */}
      <span className="p-3 text-black-50 rounded w-8px">{totalPrice}</span>
      <button
        onClick={handleJoin}
        type="button"
        className="w-50% h-20px px-1 py-2 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out "
      >
        Join
      </button>
    </div>
  );
}

/*
- price: variable that is READ only
- discount = number
- discountStartAt - number
- totalPrice - to be calulated, defualt 0


totalPriceCalulaation() {
  if (ticketsAmount >= discountStartAt) {
    totalPrice = price * amount * discount
  } else {
    totalPrice = price * amount
  }
}
*/
