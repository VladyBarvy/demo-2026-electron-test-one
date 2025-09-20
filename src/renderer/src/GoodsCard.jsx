export default function goodCard({ good }) {
  return <>
    <div className="goodsCard">
      <div className="goodsPhoto"><p>{good.photo}</p></div>
      <div className="goodsInfo">
        <div className="goodsHeading">{`${good.category} | ${good.type}`}</div>
        <p>{good.name}</p>
        <p>{good.description}</p>
        <p>{good.supplier}</p>
        <p>{good.manufacturer}</p>
        <p>{good.quantity}</p></div>
      <div className="goodsDiscount"><p>{good.discount}</p></div>
    </div>
  </>
}
