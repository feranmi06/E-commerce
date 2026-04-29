from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, OrderSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CartView(APIView):
    """Session-backed cart API.

    GET: return current cart
    POST: { action: 'add'|'remove'|'clear', product_id: int, quantity: int }
    """
    def get(self, request):
        cart = request.session.get('cart', {})
        items = []
        total = 0
        for pid, qty in cart.items():
            try:
                product = Product.objects.get(pk=pid)
            except Product.DoesNotExist:
                continue
            items.append({'product': ProductSerializer(product).data, 'quantity': qty})
            total += float(product.price) * int(qty)
        return Response({'items': items, 'total': total})

    def post(self, request):
        action = request.data.get('action')
        product_id = str(request.data.get('product_id'))
        qty = int(request.data.get('quantity') or 1)

        cart = request.session.get('cart', {})

        if action == 'add':
            cart[product_id] = cart.get(product_id, 0) + qty
        elif action == 'remove':
            if product_id in cart:
                del cart[product_id]
        elif action == 'clear':
            cart = {}
        else:
            return Response({'detail': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        request.session['cart'] = cart
        request.session.modified = True
        return Response({'cart': cart})

class CheckoutView(APIView):
    def post(self, request):
        cart = request.session.get('cart', {})
        if not cart:
            return Response({'detail': 'Cart empty'}, status=status.HTTP_400_BAD_REQUEST)

        email = request.data.get('email', '')
        order = Order.objects.create(email=email)
        total = 0
        for pid, qty in cart.items():
            product = get_object_or_404(Product, pk=pid)
            price = float(product.price)
            OrderItem.objects.create(order=order, product=product, quantity=qty, price=price)
            total += price * int(qty)

        order.total = total
        order.save()
        # clear cart
        request.session['cart'] = {}
        request.session.modified = True

        return Response({'order_id': order.id, 'total': total})
