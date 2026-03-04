export const calculateScore = (product, filters) => {
    let score = 0;
  
    // Category weight 40
    if (filters.category && product.category === filters.category) {
      score += 40;
    }
  
    // Age weight 20
    if (filters.age && product.age === filters.age) {
      score += 20;
    }
  
    // Keyword match 20
    if (filters.keywords && filters.keywords.length > 0) {
      const description = product.description.toLowerCase();
  
      filters.keywords.forEach((keyword) => {
        if (description.includes(keyword)) {
          score += 5;
        }
      });
    }
  
    // Rating weight 10
    score += product.rating * 2;
  
    // Reviews weight 10
    score += Math.min(product.reviewsCount / 10, 10);
  
    return score;
  };