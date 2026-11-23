// ==================================================
// Optima POS V2 (AAA) — Konfigurasi web production
// Backend: https://pos-api.optimadigitalselaras.com
// ==================================================
window.CFG = {
  API_BASE:     'https://pos-api.optimadigitalselaras.com/api/v1',
  APP_VERSION:  '2.0.1',
  APP_NAME:     'Optima POS V2',
  STORE_NAME:   'Demo Warung',
  CASHIER_NAME: 'Kasir',
  SESSION_KEY:  'aaa_pos_session',
  TOKEN_KEY:    'aaa_pos_token',
  CACHE_KEY:    'aaa_pos_products',
  QUEUE_KEY:    'aaa_pos_queue',
  // category_id → label (dari seed DB demo)
  CATEGORIES:   { '1': 'Minuman', '2': 'Makanan' },
};
