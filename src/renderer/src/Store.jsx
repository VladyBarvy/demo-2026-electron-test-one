import { useNavigate } from "react-router";
import GoodsCard from "./GoodsCard";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function Store({ user, setUser }) {
  const [goods, setGoods] = useState([]);
  useEffect(() => {
    (async function getGoods() {
      const res = await window.api.getGoods();
      console.log(goods)
      setGoods(res);
    })()
  }, [])
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => { setUser({}); navigate('/') }}>Выйти</button>
      <h1>Магазин</h1>
      <div className="goodsContainer">
        {/* {goods.map((good) => <GoodsCard good={good} key={good.id} />)} */}
        {goods.map((good) => <ProductCard product={good} key={good.id} />)}
      </div>
    </>
  )
}

export default Store
