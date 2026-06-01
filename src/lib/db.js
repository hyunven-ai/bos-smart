/**
 * BOS SMART - API Client Layer
 * Replaces the old localStorage database with real API calls to Neon.
 */

export const BOS_DB = {
  // 1. SETTINGS
  getSettings: async function () {
    const res = await fetch('/api/settings');
    if (!res.ok) return null;
    return await res.json();
  },
  updateSettings: async function (newSettings) {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    });
    return await res.json();
  },

  // 2. PAGES CONTENT
  getPages: async function () {
    const res = await fetch('/api/pages');
    if (!res.ok) return null;
    return await res.json();
  },
  updatePageContent: async function (pageKey, content) {
    const res = await fetch('/api/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageKey, content })
    });
    return await res.json();
  },

  // 3. CATEGORIES
  getCategories: async function () {
    const res = await fetch('/api/categories');
    if (!res.ok) return [];
    return await res.json();
  },
  saveCategory: async function (category) {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category)
    });
    return await res.json();
  },
  deleteCategory: async function (catId) {
    const res = await fetch(`/api/categories?id=${catId}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // 4. PRODUCTS
  getProducts: async function () {
    const res = await fetch('/api/products');
    if (!res.ok) return [];
    return await res.json();
  },
  saveProduct: async function (product) {
    if (!product.id) {
      product.id = 'p-' + Date.now();
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    return await res.json();
  },
  deleteProduct: async function (prodId) {
    const res = await fetch(`/api/products?id=${prodId}`, {
      method: 'DELETE'
    });
    return await res.json();
  },

  // 5. INBOX
  getInbox: async function () {
    const res = await fetch('/api/inbox');
    if (!res.ok) return [];
    return await res.json();
  },
  addMessage: async function (message) {
    const res = await fetch('/api/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    return await res.json();
  },
  markMessageStatus: async function (msgId, status) {
    const res = await fetch('/api/inbox', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msgId, status })
    });
    return await res.json();
  },
  deleteMessage: async function (msgId) {
    const res = await fetch(`/api/inbox?id=${msgId}`, {
      method: 'DELETE'
    });
    return await res.json();
  }
};
