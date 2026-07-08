export type MenuItem = {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  description: string;
  price: number;           // base price (for pizza: small size)
  priceM?: number;         // medium (pizza only)
  priceL?: number;         // large (pizza only)
  image: string;           // /images/... path
  hasSizes: boolean;       // true for pizza
  popular?: boolean;
};

export const menuCategories = [
  'PIZZA', 'PIZZA BOISÉE', 'BURGER', 'TACOS', 'SANDWICH', 'SANDWICHS MATLOU3',
  'PLATS', 'PASTA', 'MALFOUF', 'CALZONE', 'SALADES', 'POUTINE', 'DESSERT', 'BOISSONS'
];

export const menuItems: MenuItem[] = [
  // ── PIZZA (rouge) ──
  { id: 'pizza-margherita', name: 'Margherita', nameAr: 'مارقوريت', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Tomato sauce, mozzarella, fresh basil', price: 300, priceM: 600, priceL: 1200, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true, popular: true },
  { id: 'pizza-legumes', name: 'Légumes & Fromage', nameAr: 'خضر و شومبينيو', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Fresh vegetables, mushrooms, mozzarella', price: 500, priceM: 1000, priceL: 1500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true },
  { id: 'pizza-thon', name: 'Thon', nameAr: 'طون', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Tuna, olives, tomato sauce, mozzarella', price: 500, priceM: 1000, priceL: 1500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true },
  { id: 'pizza-merguez', name: 'Merguez', nameAr: 'مرقاز', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Merguez sausage, tomato sauce, mozzarella', price: 500, priceM: 1000, priceL: 1500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: true },
  { id: 'pizza-viande', name: 'Viande Hachée', nameAr: 'لحم مفروم', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Ground beef, tomato sauce, mozzarella', price: 500, priceM: 1100, priceL: 1500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: true },
  { id: 'pizza-poulet', name: 'Poulet', nameAr: 'دجاج', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Grilled chicken, mozzarella, herbs', price: 550, priceM: 1100, priceL: 1800, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true, popular: true },
  { id: 'pizza-poulet-fume', name: 'Poulet Fumé', nameAr: 'دجاج مدخن', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Smoked chicken, mozzarella, tomato sauce', price: 700, priceM: 1400, priceL: 2100, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true },
  { id: 'pizza-4fromages', name: '4 Fromages', nameAr: '4 فراماج', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Four cheese blend, cream base', price: 900, priceM: 1800, priceL: 2700, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true, popular: true },
  { id: 'pizza-4saisons', name: '4 Saisons', nameAr: '4 فصول', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Ham, mushrooms, artichoke, olives', price: 900, priceM: 1800, priceL: 2700, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true },
  { id: 'pizza-napolita', name: 'Napolita', nameAr: 'نابوليتا', category: 'PIZZA', categoryAr: 'بيتزا', description: 'Our signature pizza — the ultimate experience', price: 1000, priceM: 2000, priceL: 3000, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: true, popular: true },

  // ── PIZZA BOISÉE (white sauce) ──
  { id: 'boisee-margherita', name: 'Margherita Boisée', nameAr: 'مارقوريت بيضاء', category: 'PIZZA BOISÉE', categoryAr: 'بيتزا بيضاء', description: 'White cream sauce, mozzarella, fresh basil', price: 450, priceM: 900, priceL: 1350, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true },
  { id: 'boisee-poulet', name: 'Poulet Boisée', nameAr: 'دجاج بيضاء', category: 'PIZZA BOISÉE', categoryAr: 'بيتزا بيضاء', description: 'White sauce, chicken, mushrooms, mozzarella', price: 650, priceM: 1300, priceL: 2000, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true, popular: true },
  { id: 'boisee-fume', name: 'Poulet Fumé Boisée', nameAr: 'دجاج مدخن بيضاء', category: 'PIZZA BOISÉE', categoryAr: 'بيتزا بيضاء', description: 'White sauce, smoked chicken, herbs', price: 800, priceM: 1500, priceL: 2300, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true },
  { id: 'boisee-4fromages', name: '4 Fromages Boisée', nameAr: '4 فراماج بيضاء', category: 'PIZZA BOISÉE', categoryAr: 'بيتزا بيضاء', description: 'White sauce, four cheese blend', price: 1000, priceM: 2000, priceL: 2800, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true },
  { id: 'boisee-crispy', name: 'Poulet Crispy Boisée', nameAr: 'دجاج كريسبي بيضاء', category: 'PIZZA BOISÉE', categoryAr: 'بيتزا بيضاء', description: 'White sauce, crispy chicken, mozzarella', price: 750, priceM: 1500, priceL: 2500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497300/menu-four-cheese.jpg', hasSizes: true },

  // ── BURGER ──
  { id: 'burger-marini', name: 'Djaj Marini', nameAr: 'دجاج ماريني', category: 'BURGER', categoryAr: 'برغر', description: 'Marinated chicken breast, lettuce, tomato, special sauce', price: 350, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497306/spec-burger.jpg', hasSizes: false, popular: true },
  { id: 'burger-viande', name: 'Viande Hachée', nameAr: 'لحم مفروم', category: 'BURGER', categoryAr: 'برغر', description: 'Ground beef patty, cheese, onion, sauce', price: 300, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497306/spec-burger.jpg', hasSizes: false },
  { id: 'burger-crispy', name: 'Crispy', nameAr: 'كريسبي', category: 'BURGER', categoryAr: 'برغر', description: 'Crispy fried chicken, pickles, mayo', price: 450, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497306/spec-burger.jpg', hasSizes: false, popular: true },
  { id: 'burger-mixte', name: 'Mixte', nameAr: 'ميكست', category: 'BURGER', categoryAr: 'برغر', description: 'Mixed beef & chicken, double patty, cheese', price: 450, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497306/spec-burger.jpg', hasSizes: false },
  { id: 'burger-napolita', name: 'Napolita', nameAr: 'نابوليتا', category: 'BURGER', categoryAr: 'برغر', description: 'Signature burger — beef, mozzarella, arugula, special sauce', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497306/spec-burger.jpg', hasSizes: false, popular: true },

  // ── TACOS ──
  { id: 'tacos-shawarma', name: 'Shawarma', nameAr: 'شاورما', category: 'TACOS', categoryAr: 'تاكوس', description: 'Chicken shawarma, garlic sauce, vegetables', price: 400, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-viande', name: 'Viande Hachée', nameAr: 'لحم مفروم', category: 'TACOS', categoryAr: 'تاكوس', description: 'Ground beef, tomato sauce, frites', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-merguez', name: 'Merguez', nameAr: 'مرقاز', category: 'TACOS', categoryAr: 'تاكوس', description: 'Merguez sausage, harissa, frites', price: 550, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-kbab', name: 'Kbab', nameAr: 'كباب', category: 'TACOS', categoryAr: 'تاكوس', description: 'Grilled kebab, onions, parsley, sauce', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-crispy', name: 'Crispy', nameAr: 'كريسبي', category: 'TACOS', categoryAr: 'تاكوس', description: 'Crispy chicken, cheese sauce, frites', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false, popular: true },
  { id: 'tacos-3fromages-djaj', name: '3 Fromages Djaj', nameAr: '3 فراماج دجاج', category: 'TACOS', categoryAr: 'تاكوس', description: 'Chicken, three cheeses, cream sauce', price: 650, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-kbdat', name: 'Kbdat Khoruf', nameAr: 'كبدة خروف', category: 'TACOS', categoryAr: 'تاكوس', description: 'Lamb liver, spices, harissa sauce', price: 800, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'tacos-napolita', name: 'Napolita + Fratiini', nameAr: 'نابوليتا فراتيني', category: 'TACOS', categoryAr: 'تاكوس', description: 'Signature tacos + fratiini fries', price: 900, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false, popular: true },

  // ── SANDWICH NAPOLITA ──
  { id: 'sandwich-scaloup', name: 'Scaloup', nameAr: 'سكالوب', category: 'SANDWICH', categoryAr: 'ساندويتش', description: 'Breaded chicken fillet, lettuce, sauce, toasted bread', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'sandwich-crispy', name: 'Crispy', nameAr: 'كريسبي', category: 'SANDWICH', categoryAr: 'ساندويتش', description: 'Crispy chicken, pickles, mayo, toasted bread', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'sandwich-fume', name: 'Poulet Fumé', nameAr: 'دجاج مدخن', category: 'SANDWICH', categoryAr: 'ساندويتش', description: 'Smoked chicken, cheese, sauce, bread', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'sandwich-viande', name: 'Viande Hachée', nameAr: 'لحم مفروم', category: 'SANDWICH', categoryAr: 'ساندويتش', description: 'Ground beef, tomato, onion, sauce, bread', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },

  // ── SANDWICHS MATLOU3 / MALFOUF ──
  { id: 'matlou3-shawarma', name: 'Shawarma Matlou3', nameAr: 'شاورما مطلوع', category: 'SANDWICHS MATLOU3', categoryAr: 'مطلوع', description: 'Chicken shawarma in matlou3 bread', price: 300, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'matlou3-kbab', name: 'Kbab Matlou3', nameAr: 'كباب مطلوع', category: 'SANDWICHS MATLOU3', categoryAr: 'مطلوع', description: 'Kebab, onion, herbs in matlou3', price: 350, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'matlou3-crispy', name: 'Crispy Matlou3', nameAr: 'كريسبي مطلوع', category: 'SANDWICHS MATLOU3', categoryAr: 'مطلوع', description: 'Crispy chicken in matlou3 bread', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'matlou3-stak', name: 'Stak Matlou3', nameAr: 'ستاك مطلوع', category: 'SANDWICHS MATLOU3', categoryAr: 'مطلوع', description: 'Steak slice, onion, pepper, sauce', price: 650, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },
  { id: 'matlou3-kbdat', name: 'Kbdat Khoruf Matlou3', nameAr: 'كبدة خروف مطلوع', category: 'SANDWICHS MATLOU3', categoryAr: 'مطلوع', description: 'Lamb liver in matlou3 bread', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497299/menu-diavola.jpg', hasSizes: false },

  // ── PLATS ──
  { id: 'plat-shawarma', name: 'Shawarma Plat', nameAr: 'شاورما', category: 'PLATS', categoryAr: 'أطباق', description: 'Full plate of chicken shawarma with fries and salad', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false, popular: true },
  { id: 'plat-marini', name: 'Djaj Marini Plat', nameAr: 'دجاج ماريني', category: 'PLATS', categoryAr: 'أطباق', description: 'Marinated chicken plate with fries', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'plat-viande', name: 'Viande Hachée Plat', nameAr: 'لحم مفروم', category: 'PLATS', categoryAr: 'أطباق', description: 'Ground beef plate with fries and salad', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'plat-kbab', name: 'Kbab Plat', nameAr: 'كباب', category: 'PLATS', categoryAr: 'أطباق', description: 'Grilled kebab plate with sides', price: 900, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'plat-crispy', name: 'Crispy Plat', nameAr: 'كريسبي', category: 'PLATS', categoryAr: 'أطباق', description: 'Crispy chicken plate with fries', price: 950, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false, popular: true },
  { id: 'plat-stak', name: 'Stak Plat', nameAr: 'ستاك', category: 'PLATS', categoryAr: 'أطباق', description: 'Steak plate with fries and salad', price: 1400, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'plat-kbdat', name: 'Kbdat Khoruf Plat', nameAr: 'كبدة خروف', category: 'PLATS', categoryAr: 'أطباق', description: 'Lamb liver plate with fries', price: 1500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },

  // ── PASTA ──
  { id: 'pasta-3fromages', name: 'Pasta 3 Fromages', nameAr: '3 فراماج', category: 'PASTA', categoryAr: 'باستا', description: 'Three cheese sauce pasta', price: 700, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false, popular: true },
  { id: 'pasta-fume', name: 'Pasta Poulet Fumé', nameAr: 'دجاج مدخن', category: 'PASTA', categoryAr: 'باستا', description: 'Smoked chicken cream pasta', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'pasta-crispy', name: 'Pasta Crispy', nameAr: 'كريسبي', category: 'PASTA', categoryAr: 'باستا', description: 'Crispy chicken, cream sauce pasta', price: 650, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'pasta-bolognaise', name: 'Bolognaise', nameAr: 'بولونيز', category: 'PASTA', categoryAr: 'باستا', description: 'Classic bolognese with ground beef', price: 650, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },

  // ── CALZONE ──
  { id: 'calzone-poulet', name: 'Calzone Poulet', nameAr: 'كالزون دجاج', category: 'CALZONE', categoryAr: 'كالزون', description: 'Folded pizza with chicken, mozzarella, tomato sauce', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false, popular: true },
  { id: 'calzone-fiondashy', name: 'Calzone Fiondashy', nameAr: 'كالزون فيونداشي', category: 'CALZONE', categoryAr: 'كالزون', description: 'Folded pizza, special fiondashy filling', price: 750, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false },

  // ── SALADES ──
  { id: 'salade-regime', name: 'Salade Régime', nameAr: 'ريجيم', category: 'SALADES', categoryAr: 'سلطات', description: 'Light diet salad, fresh vegetables', price: 350, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false },
  { id: 'salade-thon', name: 'Salade Thon', nameAr: 'طون', category: 'SALADES', categoryAr: 'سلطات', description: 'Tuna salad with vegetables', price: 450, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false },
  { id: 'salade-fume', name: 'Salade Poulet Fumé', nameAr: 'دجاج مدخن', category: 'SALADES', categoryAr: 'سلطات', description: 'Smoked chicken caesar salad', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false },
  { id: 'salade-sezar', name: 'César', nameAr: 'سيزار', category: 'SALADES', categoryAr: 'سلطات', description: 'Classic Caesar with croutons, parmesan', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497303/menu-margherita.jpg', hasSizes: false },

  // ── POUTINE ──
  { id: 'poutine-poulet', name: 'Poutine Poulet', nameAr: 'دجاج', category: 'POUTINE', categoryAr: 'بوتين', description: 'Fries, chicken, cheese sauce, gravy', price: 500, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false, popular: true },
  { id: 'poutine-fume', name: 'Poutine Poulet Fumé', nameAr: 'دجاج مدخن', category: 'POUTINE', categoryAr: 'بوتين', description: 'Fries, smoked chicken, cheese sauce', price: 600, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },
  { id: 'poutine-crispy', name: 'Poutine Crispy', nameAr: 'كريسبي', category: 'POUTINE', categoryAr: 'بوتين', description: 'Fries, crispy chicken, cheese sauce', price: 650, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497298/menu-carbonara.jpg', hasSizes: false },

  // ── DESSERT ──
  { id: 'dessert-tiramisu', name: 'Tiramisu', nameAr: 'تيراميسو', category: 'DESSERT', categoryAr: 'حلويات', description: 'Espresso, mascarpone, ladyfingers, cocoa', price: 400, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497304/menu-tiramisu.jpg', hasSizes: false, popular: true },
  { id: 'dessert-fraise', name: 'Salade de Fraises', nameAr: 'فراولة', category: 'DESSERT', categoryAr: 'حلويات', description: 'Fresh strawberry salad with cream', price: 400, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497304/menu-tiramisu.jpg', hasSizes: false },
  { id: 'dessert-citron', name: 'Citron Classik', nameAr: 'ليمون كلاسيك', category: 'DESSERT', categoryAr: 'حلويات', description: 'Classic lemon dessert', price: 400, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497304/menu-tiramisu.jpg', hasSizes: false },
  { id: 'dessert-bueno', name: 'Bueno', nameAr: 'بوينو', category: 'DESSERT', categoryAr: 'حلويات', description: 'Chocolate Bueno cream dessert', price: 450, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497304/menu-tiramisu.jpg', hasSizes: false },

  // ── BOISSONS ──
  { id: 'boisson-coca-s', name: 'Coca Cola S', nameAr: 'كوكا كولا صغير', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Cold Coca Cola — small', price: 100, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
  { id: 'boisson-coca-l', name: 'Coca Cola L', nameAr: 'كوكا كولا كبير', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Cold Coca Cola — large', price: 150, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
  { id: 'boisson-pepsi-s', name: 'Pepsi S', nameAr: 'بيبسي صغير', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Cold Pepsi — small', price: 100, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
  { id: 'boisson-hamoud-l', name: 'Hamoud L', nameAr: 'حمود كبير', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Algerian Hamoud lemonade — large', price: 150, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
  { id: 'boisson-jus-orange', name: 'Jus d\'Orange', nameAr: 'عصير برتقال', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Fresh squeezed orange juice', price: 350, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
  { id: 'boisson-eau', name: 'Eau Minérale', nameAr: 'ماء', category: 'BOISSONS', categoryAr: 'مشروبات', description: 'Mineral water', price: 50, image: 'https://res.cloudinary.com/lprhfwpu/image/upload/v1783497302/menu-limoncello.jpg', hasSizes: false },
];