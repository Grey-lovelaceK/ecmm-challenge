from rest_framework import status
from rest_framework.test import APITestCase

from .models import Categoria, Producto


class ProductoAPITests(APITestCase):
    def setUp(self):
        self.categoria = Categoria.objects.create(nombre="Higiene Dental")

    def test_crear_producto_valido(self):
        payload = {
            "nombre": "Cepillo dental",
            "descripcion": "Cepillo de cerdas suaves",
            "precio": "1990.00",
            "stock": 50,
            "categoria": self.categoria.id,
        }
        response = self.client.post("/api/productos/", payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Producto.objects.count(), 1)
        self.assertEqual(Producto.objects.get().nombre, "Cepillo dental")

    def test_rechaza_producto_con_precio_negativo(self):
        payload = {
            "nombre": "Pasta dental",
            "descripcion": "Pasta con flúor",
            "precio": "-10.00",
            "stock": 20,
            "categoria": self.categoria.id,
        }
        response = self.client.post("/api/productos/", payload)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Producto.objects.count(), 0)