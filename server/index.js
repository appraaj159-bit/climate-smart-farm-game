const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dataFile = path.join(__dirname, 'marketplace.json');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

function defaultData() {
  return {
    sellers: [
      {
        id: 'seller-1',
        sellerName: 'Nana Mensah',
        businessName: 'Nana Fresh Foods',
        city: 'Accra',
        category: 'Food & Groceries',
        contact: '0244 000 000',
        bio: 'Fresh produce and pantry staples for busy households.',
        sellerImageUrl: '',
        sellerBadge: 'Verified seller'
      },
      {
        id: 'seller-2',
        sellerName: 'Amina Boateng',
        businessName: 'Amina Chic Wear',
        city: 'Kumasi',
        category: 'Fashion & Accessories',
        contact: '0201 222 333',
        bio: 'Affordable fashion essentials and accessories for everyday wear.',
        sellerImageUrl: '',
        sellerBadge: 'Fast delivery'
      },
      {
        id: 'seller-3',
        sellerName: 'Kwame Sarpong',
        businessName: 'Sarpong Farm Supply',
        city: 'Tamale',
        category: 'Agriculture',
        contact: '0544 555 666',
        bio: 'Seeds, tools, and farm inputs for local growers and cooperatives.',
        sellerImageUrl: '',
        sellerBadge: 'Trusted local'
      },
      {
        id: 'seller-4',
        sellerName: 'Efua Addo',
        businessName: 'Efua Herbal Glow',
        city: 'Cape Coast',
        category: 'Health & Beauty',
        contact: '0266 777 888',
        bio: 'Natural beauty and wellness products made with locally sourced ingredients.',
        sellerImageUrl: '',
        sellerBadge: 'New seller'
      }
    ],
    products: [
      {
        id: 'product-1',
        sellerId: 'seller-1',
        title: 'Fresh tomatoes and peppers basket',
        category: 'Food & Groceries',
        price: 35,
        location: 'Madina, Accra',
        delivery: 'Same-day delivery in Accra',
        description: 'Clean, well-sorted vegetables sourced daily from trusted local farms.'
      },
      {
        id: 'product-2',
        sellerId: 'seller-1',
        title: 'Palm oil and cassava flour combo',
        category: 'Food & Groceries',
        price: 48,
        location: 'Tema, Accra',
        delivery: 'Pickup or doorstep delivery',
        description: 'A staple cooking bundle for households and small food businesses.'
      },
      {
        id: 'product-3',
        sellerId: 'seller-2',
        title: 'Printed African-inspired headwrap set',
        category: 'Fashion & Accessories',
        price: 29,
        location: 'Kumasi Central Market',
        delivery: 'Available for pick-up within Kumasi',
        description: 'Stylish headwraps in vibrant colours for everyday and event wear.'
      },
      {
        id: 'product-4',
        sellerId: 'seller-2',
        title: 'Simple leather tote bag',
        category: 'Fashion & Accessories',
        price: 55,
        location: 'Kumasi, Ashanti',
        delivery: 'Delivery available on request',
        description: 'A durable tote for market runs, work, and casual outings.'
      },
      {
        id: 'product-5',
        sellerId: 'seller-3',
        title: 'Vegetable seed pack',
        category: 'Agriculture',
        price: 18,
        location: 'Tamale North',
        delivery: 'Pickup at the farm supply point',
        description: 'A beginner-friendly seed bundle for home gardens and vegetable plots.'
      },
      {
        id: 'product-6',
        sellerId: 'seller-3',
        title: 'Hand trowel and watering can set',
        category: 'Agriculture',
        price: 32,
        location: 'Tamale, Northern Region',
        delivery: 'Local delivery available',
        description: 'Useful tools for small-scale farming and nursery care.'
      },
      {
        id: 'product-7',
        sellerId: 'seller-4',
        title: 'Herbal face mask kit',
        category: 'Health & Beauty',
        price: 24,
        location: 'Cape Coast',
        delivery: 'Pickup or delivery within Cape Coast',
        description: 'A natural skin-care kit for daily hydration and gentle care.'
      },
      {
        id: 'product-8',
        sellerId: 'seller-4',
        title: 'Locally made soap gift pack',
        category: 'Health & Beauty',
        price: 27,
        location: 'Cape Coast Harbour',
        delivery: 'Delivered with care to nearby areas',
        description: 'A small gift pack of handcrafted soaps made from local ingredients.'
      }
    ],
    orders: [],
    reviews: [
      {
        id: 'review-1',
        productId: 'product-1',
        sellerId: 'seller-1',
        customerName: 'Abena K.',
        rating: 5,
        comment: 'Fresh produce and the delivery was prompt.'
      },
      {
        id: 'review-2',
        productId: 'product-3',
        sellerId: 'seller-2',
        customerName: 'Yaw M.',
        rating: 5,
        comment: 'The headwrap arrived quickly and looks beautiful.'
      }
    ]
  };
}

function readData() {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify(defaultData(), null, 2));
    }

    const raw = fs.readFileSync(dataFile, 'utf8');
    const parsed = JSON.parse(raw);

    if (!parsed.sellers || !parsed.products) {
      throw new Error('Invalid store format');
    }

    return parsed;
  } catch (error) {
    const fallback = defaultData();
    fs.writeFileSync(dataFile, JSON.stringify(fallback, null, 2));
    return fallback;
  }
}

function writeData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.get('/api/marketplace', (req, res) => {
  res.json(readData());
});

app.post('/api/marketplace', (req, res) => {
  const { type, action, data } = req.body || {};

  if (!type || !data) {
    return res.status(400).json({ error: 'Missing type or data' });
  }

  const store = readData();

  if (type === 'seller') {
    store.sellers.push(data);
  } else if (type === 'product') {
    store.products.push(data);
  } else if (type === 'order') {
    if (action === 'update') {
      const index = store.orders.findIndex((entry) => entry.id === data.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      store.orders[index] = { ...store.orders[index], ...data };
    } else {
      store.orders.push(data);
    }
  } else if (type === 'review') {
    store.reviews.push(data);
  } else {
    return res.status(400).json({ error: 'Unsupported type' });
  }

  writeData(store);
  res.json(store);
});

app.listen(PORT, () => {
  console.log(`Marketplace server running on http://localhost:${PORT}`);
});
