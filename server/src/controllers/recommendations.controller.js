import products from "../data/products.js";

export function getHomeRecommendations(req, res) {
  const popular = products
    .filter((p) => p.rating >= 4.5)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 8);

  const onSale = products
    .filter((p) => p.isOnSale)
    .sort((a, b) => {
      const discountA = (a.oldPrice - a.price) / a.oldPrice;
      const discountB = (b.oldPrice - b.price) / b.oldPrice;
      return discountB - discountA;
    })
    .slice(0, 8);

  const newArrivals = products
    .filter((p) => p.isNew)
    .slice(0, 8);

  res.json({ popular, onSale, newArrivals });
}

export function getFallbackRecommendations(req, res) {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const suggestions = shuffled.slice(0, 8);

  res.json({ suggestions });
}
