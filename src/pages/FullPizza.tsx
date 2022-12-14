import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({ imageUrl: '', title: '', price: 0 });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://628e2b5a368687f3e711ad5f.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Нет такой пиццы((');
        navigate('/', { replace: true });
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <h3>{pizza.title}</h3>
      <img src={pizza.imageUrl} alt="pizza" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ab maxime eveniet consequuntur. Nisi eum
        dignissimos ab praesentium suscipit veniam libero minus modi amet! Doloribus dolor sed voluptate! Quo, error!
      </p>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
