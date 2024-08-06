import React from 'react';

const AnimatedFood = () => {
  return (
    <div className="animated-food-container">
      <div className="food-item pizza">
        <img src="/images/pizza.png" alt="Pizza" />
      </div>
      <div className="food-item burger">
        <img src="/images/burger.png" alt="Burger" />
      </div>
      <div className="food-item ice-cream">
        <img src="/images/icecream.png" alt="Ice Cream" />
      </div>
      <div className="food-item donut">
        <img src="/images/donut.png" alt="Donut" />
      </div>
    </div>
  );
};

export default AnimatedFood;
