# Backend (Django + DRF) for E-commerce demo

Quick setup instructions (Windows):

1. Create and activate a virtualenv

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install requirements

```powershell
pip install -r requirements.txt
```

3. Run migrations and seed sample products

```powershell
python manage.py migrate
python manage.py loaddata  # optional fixtures
python manage.py seed_products
python manage.py createsuperuser
```

4. Run the dev server

```powershell
python manage.py runserver
```

APIs:
- `GET /api/products/` — list products
- `GET /api/products/<id>/` — product detail
- `GET /api/cart/` — session cart
- `POST /api/cart/` — manage cart (action:add/remove/clear)
- `POST /api/checkout/` — create order from session cart

Notes: this scaffold uses a simple `Product.image` text field pointing to `images/` in the repo. In production, switch to `ImageField` + media storage and enable secure settings.
