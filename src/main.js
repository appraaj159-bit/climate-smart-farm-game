const STORAGE_KEY = 'ghana_marketplace_data';

const sellerForm = document.getElementById('sellerForm');
const productForm = document.getElementById('productForm');
const sellerSelect = document.getElementById('sellerSelect');
const productGrid = document.getElementById('productGrid');
const sellerCount = document.getElementById('sellerCount');
const productCount = document.getElementById('productCount');
const cityCount = document.getElementById('cityCount');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const searchInput = document.getElementById('searchInput');
const toast = document.getElementById('toast');
const mediaPreview = document.getElementById('mediaPreview');
const orderModal = document.getElementById('orderModal');
const orderForm = document.getElementById('orderForm');
const orderModalTitle = document.getElementById('orderModalTitle');
const orderModalCopy = document.getElementById('orderModalCopy');
const orderProductId = document.getElementById('orderProductId');
const orderSellerId = document.getElementById('orderSellerId');
const closeOrderModalButton = document.getElementById('closeOrderModal');
const cancelOrderModalButton = document.getElementById('cancelOrderModal');
const reviewForm = document.getElementById('reviewForm');
const reviewProductSelect = document.getElementById('reviewProductSelect');
const orderManagementList = document.getElementById('orderManagementList');
const mediaFields = ['imageUrl', 'videoUrl'];

const orderStatusOptions = ['Pending', 'Confirmed', 'Packed', 'Delivered', 'Canceled'];

function isFileProtocol() {
  return window.location.protocol === 'file:';
}

const icons = {
  'Food & Groceries': '🥕',
  'Fashion & Accessories': '👜',
  'Agriculture': '🌾',
  'Health & Beauty': '✨',
  'Crafts & Home': '🎨',
  'Services': '📦'
};

const defaultState = {
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

let state = defaultState;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2400);
}

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function getStorageData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function normalizeState(data) {
  return {
    sellers: data?.sellers || defaultState.sellers,
    products: data?.products || defaultState.products,
    orders: data?.orders || [],
    reviews: data?.reviews || []
  };
}

async function loadData() {
  if (isFileProtocol()) {
    state = normalizeState(getStorageData() || defaultState);
    populateSellerSelect();
    populateReviewProductSelect();
    renderProducts();
    updateStats();
    return;
  }

  try {
    const response = await fetch('/api/marketplace');
    if (!response.ok) throw new Error('Server unavailable');
    const data = await response.json();
    state = normalizeState(data);
    persistData();
  } catch (error) {
    const fallback = getStorageData();
    state = normalizeState(fallback || defaultState);
  }

  populateSellerSelect();
  populateReviewProductSelect();
  renderProducts();
  renderOrderManagement();
  updateStats();
}

function persistData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

async function syncData(payload) {
  if (isFileProtocol()) {
    return false;
  }

  try {
    const response = await fetch('/api/marketplace', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('Server sync failed');
    const data = await response.json();
    state = normalizeState(data);
    persistData();
    return true;
  } catch (error) {
    return false;
  }
}

function populateSellerSelect() {
  const options = ['<option value="">Select a seller</option>'];

  state.sellers.forEach((seller) => {
    options.push(`<option value="${seller.id}">${seller.businessName} — ${seller.sellerName}</option>`);
  });

  sellerSelect.innerHTML = options.join('');
}

function populateReviewProductSelect() {
  const options = ['<option value="">Select a product</option>'];

  state.products.forEach((product) => {
    options.push(`<option value="${product.id}">${product.title} — ${getSellerName(product.sellerId)}</option>`);
  });

  reviewProductSelect.innerHTML = options.join('');
}

function updateStats() {
  const uniqueCities = new Set(state.sellers.map((seller) => seller.city.trim().toLowerCase())).size;
  sellerCount.textContent = String(state.sellers.length);
  productCount.textContent = String(state.products.length);
  cityCount.textContent = String(uniqueCities);

  const locationOptions = ['<option value="all">All locations</option>'];
  const seen = new Set();

  state.products.forEach((product) => {
    if (!seen.has(product.location)) {
      seen.add(product.location);
      locationOptions.push(`<option value="${product.location}">${product.location}</option>`);
    }
  });

  locationFilter.innerHTML = locationOptions.join('');
}

function getSellerName(id) {
  const seller = state.sellers.find((entry) => entry.id === id);
  return seller ? seller.businessName : 'Unknown seller';
}

function getSeller(id) {
  return state.sellers.find((entry) => entry.id === id) || null;
}

function getSellerAvatar(id) {
  const seller = getSeller(id);
  return seller && seller.sellerImageUrl ? seller.sellerImageUrl : '';
}

function normalizePhone(contact) {
  if (!contact) {
    return '';
  }

  const digits = String(contact).replace(/\D/g, '');
  if (!digits) {
    return '';
  }

  return digits;
}

function getContactLinks(product) {
  const seller = getSeller(product.sellerId);
  const phone = seller ? normalizePhone(seller.contact) : '';

  if (!seller || !phone) {
    return '<span class="form-note">Contact seller through the marketplace inbox.</span>';
  }

  const telHref = `tel:${phone}`;
  const whatsappHref = `https://wa.me/233${phone.replace(/^0/, '')}`;

  return `
    <div class="card-actions">
      <a class="btn btn-secondary btn-small" href="${telHref}">Call</a>
      <a class="btn btn-secondary btn-small" href="${whatsappHref}" target="_blank" rel="noreferrer">WhatsApp</a>
      <button type="button" class="btn btn-primary btn-small request-order-btn" data-product-id="${product.id}">Request order</button>
    </div>
  `;
}

function getBadgeMarkup(seller) {
  if (!seller || !seller.sellerBadge) {
    return '';
  }

  return `<span class="badge">${seller.sellerBadge}</span>`;
}

function getReviewsMarkup(product) {
  const reviews = state.reviews.filter((review) => review.productId === product.id);

  if (!reviews.length) {
    return '';
  }

  return `
    <div>
      <h4 style="margin:0.9rem 0 0.45rem;">Buyer reviews</h4>
      ${reviews.map((review) => `
        <div class="review-card">
          <strong>${review.customerName}</strong>
          <div>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
          <p>${review.comment}</p>
        </div>
      `).join('')}
    </div>
  `;
}

function getOrderStatus(product) {
  const orders = state.orders.filter((entry) => entry.productId === product.id);
  if (!orders.length) {
    return '';
  }

  const latest = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  return `<div class="order-status-pill">Order status: ${latest.status}</div>`;
}

function renderOrderManagement() {
  if (!orderManagementList) {
    return;
  }

  const orders = [...state.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!orders.length) {
    orderManagementList.innerHTML = '<p class="form-note">No customer orders yet. Buyers will appear here as soon as they request an order.</p>';
    return;
  }

  orderManagementList.innerHTML = orders.map((order) => {
    const product = state.products.find((entry) => entry.id === order.productId);
    const seller = getSeller(order.sellerId);
    const status = order.status || 'Pending';

    return `
      <div class="order-management-item">
        <div class="order-management-main">
          <div>
            <p class="order-management-title">${product ? product.title : 'Unknown product'}</p>
            <p class="form-note">${order.customerName} • ${order.customerPhone} • Qty ${order.quantity}</p>
          </div>
          <span class="order-status-pill">${status}</span>
        </div>
        <div class="order-management-meta">
          <span>${seller ? seller.businessName : 'Unknown seller'}</span>
          <span>${new Date(order.createdAt).toLocaleString()}</span>
        </div>
        <div class="order-management-controls">
          <label>
            Update status
            <select class="order-status-select" data-order-id="${order.id}">
              ${orderStatusOptions.map((option) => `<option value="${option}" ${option === status ? 'selected' : ''}>${option}</option>`).join('')}
            </select>
          </label>
          <button type="button" class="btn btn-primary btn-small update-order-status-btn" data-order-id="${order.id}">Update</button>
        </div>
        ${order.notes ? `<p class="form-note">Note: ${order.notes}</p>` : ''}
      </div>
    `;
  }).join('');
}

function parseGalleryUrls(value) {
  if (!value) {
    return [];
  }

  return String(value)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function isVideoSource(value) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value);
}

function getProductMediaEntries(product) {
  const entries = [];

  if (product.imageUrl) {
    entries.push({ type: 'image', src: product.imageUrl });
  }

  if (product.videoUrl) {
    entries.push({ type: 'video', src: product.videoUrl });
  }

  const gallery = Array.isArray(product.galleryUrls) ? product.galleryUrls : parseGalleryUrls(product.galleryUrls);
  gallery.forEach((item) => {
    entries.push({ type: isVideoSource(item) ? 'video' : 'image', src: item });
  });

  return entries;
}

function getMediaMarkup(product, activeIndex = 0) {
  const entries = getProductMediaEntries(product);

  if (!entries.length) {
    return '';
  }

  const current = entries[activeIndex] || entries[0];
  const mediaHtml = current.type === 'video'
    ? `<video controls preload="metadata"><source src="${current.src}" /></video>`
    : `<img src="${current.src}" alt="${product.title}" loading="lazy" />`;

  if (entries.length <= 1) {
    return `<div class="product-media" data-product-id="${product.id}" data-active-index="0"><div class="product-media-grid">${mediaHtml}</div></div>`;
  }

  return `
    <div class="product-media" data-product-id="${product.id}" data-active-index="${activeIndex}">
      <div class="product-media-grid">
        ${mediaHtml}
      </div>
      <div class="gallery-controls">
        <button type="button" class="gallery-prev" data-product-id="${product.id}">‹</button>
        <span>${activeIndex + 1} / ${entries.length}</span>
        <button type="button" class="gallery-next" data-product-id="${product.id}">›</button>
      </div>
    </div>
  `;
}

function updateMediaPreview() {
  if (!mediaPreview) {
    return;
  }

  const imageUrl = productForm.elements.imageUrl.value.trim();
  const videoUrl = productForm.elements.videoUrl.value.trim();

  if (!imageUrl && !videoUrl) {
    mediaPreview.innerHTML = '<p class="form-note">Preview will appear here as you add your image or video URL.</p>';
    return;
  }

  const pieces = [];

  if (imageUrl) {
    pieces.push(`<img src="${imageUrl}" alt="Preview image" />`);
  }

  if (videoUrl) {
    pieces.push(`<video controls preload="metadata"><source src="${videoUrl}" /></video>`);
  }

  mediaPreview.innerHTML = pieces.join('');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

function openOrderModal(product) {
  orderProductId.value = product.id;
  orderSellerId.value = product.sellerId;
  orderModalTitle.textContent = `Request ${product.title}`;
  orderModalCopy.textContent = `Send a request to ${getSellerName(product.sellerId)} about ${product.title}.`;
  orderModal.classList.remove('hidden');
  orderModal.setAttribute('aria-hidden', 'false');
}

function closeOrderModal() {
  orderModal.classList.add('hidden');
  orderModal.setAttribute('aria-hidden', 'true');
  orderForm.reset();
  orderProductId.value = '';
  orderSellerId.value = '';
}

async function handleMediaUpload(event) {
  const { name, files } = event.target;

  if (!files || !files.length) {
    return;
  }

  const file = files[0];

  try {
    const dataUrl = await readFileAsDataUrl(file);

    if (name === 'imageFile') {
      productForm.elements.imageUrl.value = dataUrl;
    }

    if (name === 'videoFile') {
      productForm.elements.videoUrl.value = dataUrl;
    }

    updateMediaPreview();
  } catch (error) {
    showToast('Could not load that file. Please try another one.');
  }
}

async function handleSellerImageUpload(event) {
  const { files } = event.target;

  if (!files || !files.length) {
    return;
  }

  try {
    const dataUrl = await readFileAsDataUrl(files[0]);
    sellerForm.elements.sellerImageUrl.value = dataUrl;
  } catch (error) {
    showToast('Could not load that profile image. Please try another one.');
  }
}

function renderProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const selectedLocation = locationFilter.value;

  const filtered = state.products.filter((product) => {
    const matchesSearch = !search ||
      product.title.toLowerCase().includes(search) ||
      getSellerName(product.sellerId).toLowerCase().includes(search);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || product.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (!filtered.length) {
    productGrid.innerHTML = '<div class="empty-state">No products match your filters yet. Add a new listing to get started.</div>';
    return;
  }

  productGrid.innerHTML = filtered.map((product) => {
    const seller = getSeller(product.sellerId);
    const sellerAvatar = seller && seller.sellerImageUrl ? `<img class="seller-avatar" src="${seller.sellerImageUrl}" alt="${seller.businessName}" loading="lazy" />` : '';

    return `
      <article class="product-card">
        <div class="product-header">
          <div>
            <span class="product-icon">${icons[product.category] || '📦'}</span>
            <h3>${product.title}</h3>
            <div class="seller-block">
              ${sellerAvatar}
              <div class="seller-meta">
                <p>${getSellerName(product.sellerId)}</p>
                <p>${seller ? seller.city : ''}</p>
                <div>${getBadgeMarkup(seller)}</div>
              </div>
            </div>
          </div>
          <strong>GH₵ ${Number(product.price).toFixed(2)}</strong>
        </div>
        <div class="product-meta">
          <span class="product-tag">${product.category}</span>
          <span class="product-tag">${product.location}</span>
        </div>
        ${getMediaMarkup(product)}
        <p>${product.description}</p>
        <div class="product-footer">
          <span>${product.delivery}</span>
          <span>Contact seller for order</span>
        </div>
        ${getContactLinks(product)}
        ${getOrderStatus(product)}
        ${getReviewsMarkup(product)}
      </article>
    `;
  }).join('');
}

function renderGalleryControls(productId, activeIndex) {
  const product = state.products.find((entry) => entry.id === productId);
  if (!product) {
    return;
  }

  const mediaWrapper = productGrid.querySelector(`[data-product-id="${productId}"]`);
  if (!mediaWrapper) {
    return;
  }

  mediaWrapper.innerHTML = getMediaMarkup(product, activeIndex);
}

sellerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(sellerForm);
  const seller = {
    id: createId('seller'),
    sellerName: formData.get('sellerName').toString().trim(),
    businessName: formData.get('businessName').toString().trim(),
    city: formData.get('city').toString().trim(),
    category: formData.get('category').toString().trim(),
    contact: formData.get('contact').toString().trim(),
    sellerImageUrl: formData.get('sellerImageUrl').toString().trim(),
    sellerBadge: formData.get('sellerBadge').toString().trim(),
    bio: formData.get('bio').toString().trim()
  };

  state.sellers.push(seller);
  persistData();
  const synced = await syncData({ type: 'seller', data: seller });

  if (!synced) {
    showToast('Saved locally. Connect the server to sync across devices.');
  } else {
    showToast('Seller profile saved successfully.');
  }

  sellerForm.reset();
  updateMediaPreview();
  loadData();
});

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(productForm);
  const sellerId = formData.get('sellerId').toString().trim();

  if (!sellerId) {
    showToast('Choose a seller before publishing a product.');
    return;
  }

  const product = {
    id: createId('product'),
    sellerId,
    title: formData.get('title').toString().trim(),
    category: formData.get('category').toString().trim(),
    price: Number(formData.get('price')),
    location: formData.get('location').toString().trim(),
    delivery: formData.get('delivery').toString().trim(),
    imageUrl: formData.get('imageUrl').toString().trim(),
    videoUrl: formData.get('videoUrl').toString().trim(),
    galleryUrls: parseGalleryUrls(formData.get('galleryUrls').toString().trim()),
    description: formData.get('description').toString().trim()
  };

  state.products.push(product);
  persistData();
  const synced = await syncData({ type: 'product', data: product });

  if (!synced) {
    showToast('Product saved locally. Connect the server to sync it.');
  } else {
    showToast('Product published successfully.');
  }

  productForm.reset();
  updateMediaPreview();
  loadData();
});

reviewForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(reviewForm);
  const productId = formData.get('productId').toString().trim();

  if (!productId) {
    showToast('Choose a product to review.');
    return;
  }

  const product = state.products.find((entry) => entry.id === productId);
  if (!product) {
    showToast('That product is no longer available.');
    return;
  }

  const review = {
    id: createId('review'),
    productId,
    sellerId: product.sellerId,
    customerName: formData.get('customerName').toString().trim(),
    rating: Number(formData.get('rating')),
    comment: formData.get('comment').toString().trim()
  };

  state.reviews.push(review);
  persistData();
  const synced = await syncData({ type: 'review', data: review });

  if (!synced) {
    showToast('Review saved locally. Connect the server to sync it.');
  } else {
    showToast('Review posted successfully.');
  }

  reviewForm.reset();
  loadData();
});

orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(orderForm);
  const order = {
    id: createId('order'),
    productId: formData.get('productId').toString().trim(),
    sellerId: formData.get('sellerId').toString().trim(),
    customerName: formData.get('customerName').toString().trim(),
    customerPhone: formData.get('customerPhone').toString().trim(),
    quantity: Number(formData.get('quantity')),
    notes: formData.get('notes').toString().trim(),
    createdAt: new Date().toISOString(),
    status: 'Pending'
  };

  state.orders.push(order);
  persistData();
  const synced = await syncData({ type: 'order', data: order });

  if (!synced) {
    showToast('Order request saved locally. Connect the server to sync it.');
  } else {
    showToast('Order request sent successfully.');
  }

  closeOrderModal();
  renderProducts();
  renderOrderManagement();
});

async function updateOrderStatus(orderId, status) {
  const order = state.orders.find((entry) => entry.id === orderId);

  if (!order) {
    showToast('That order is no longer available.');
    return;
  }

  order.status = status;
  order.updatedAt = new Date().toISOString();
  persistData();

  const synced = await syncData({ type: 'order', action: 'update', data: order });

  if (!synced) {
    showToast('Order status saved locally. Connect the server to sync it.');
  } else {
    showToast('Order status updated successfully.');
  }

  renderProducts();
  renderOrderManagement();
}

[categoryFilter, locationFilter, searchInput].forEach((element) => {
  element.addEventListener('input', renderProducts);
  element.addEventListener('change', renderProducts);
});

mediaFields.forEach((fieldName) => {
  const field = productForm.elements[fieldName];
  if (field) {
    field.addEventListener('input', updateMediaPreview);
  }
});

productForm.elements.imageFile.addEventListener('change', handleMediaUpload);
productForm.elements.videoFile.addEventListener('change', handleMediaUpload);
sellerForm.elements.sellerImageFile.addEventListener('change', handleSellerImageUpload);

closeOrderModalButton.addEventListener('click', closeOrderModal);
cancelOrderModalButton.addEventListener('click', closeOrderModal);

productGrid.addEventListener('click', (event) => {
  const requestButton = event.target.closest('.request-order-btn');
  if (requestButton) {
    const product = state.products.find((entry) => entry.id === requestButton.dataset.productId);
    if (product) {
      openOrderModal(product);
    }
    return;
  }

  const galleryPrev = event.target.closest('.gallery-prev');
  if (galleryPrev) {
    const wrapper = event.target.closest('.product-media');
    const productId = galleryPrev.dataset.productId;
    const current = Number(wrapper.dataset.activeIndex || 0);
    const nextIndex = current <= 0 ? getProductMediaEntries(state.products.find((entry) => entry.id === productId)).length - 1 : current - 1;
    wrapper.dataset.activeIndex = String(nextIndex);
    renderGalleryControls(productId, nextIndex);
    return;
  }

  const galleryNext = event.target.closest('.gallery-next');
  if (galleryNext) {
    const wrapper = event.target.closest('.product-media');
    const productId = galleryNext.dataset.productId;
    const product = state.products.find((entry) => entry.id === productId);
    const entries = getProductMediaEntries(product);
    const current = Number(wrapper.dataset.activeIndex || 0);
    const nextIndex = current >= entries.length - 1 ? 0 : current + 1;
    wrapper.dataset.activeIndex = String(nextIndex);
    renderGalleryControls(productId, nextIndex);
  }
});

if (orderManagementList) {
  orderManagementList.addEventListener('click', async (event) => {
    const updateButton = event.target.closest('.update-order-status-btn');
    if (!updateButton) {
      return;
    }

    const orderId = updateButton.dataset.orderId;
    const statusSelect = orderManagementList.querySelector(`select[data-order-id="${orderId}"]`);
    if (!statusSelect) {
      return;
    }

    await updateOrderStatus(orderId, statusSelect.value);
  });
}

closeOrderModal();
loadData();
