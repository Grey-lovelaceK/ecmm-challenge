const API_URL = "http://127.0.0.1:8000/api";

export type Categoria = {
  id: number;
  nombre: string;
};

export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  categoria: number;
  categoria_nombre: string;
  fecha_creacion: string;
};

export async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}/categorias/`);
  return res.json();
}

export async function getProductos(params?: {
  categoria?: string;
  buscar?: string;
}): Promise<Producto[]> {
  const query = new URLSearchParams();
  if (params?.categoria) query.set("categoria", params.categoria);
  if (params?.buscar) query.set("buscar", params.buscar);
  const res = await fetch(`${API_URL}/productos/?${query.toString()}`);
  return res.json();
}

export async function crearProducto(data: {
  nombre: string;
  descripcion: string;
  precio: string;
  stock: number;
  categoria: number;
}): Promise<{ ok: boolean; data: Producto | Record<string, string[]> }> {
  const res = await fetch(`${API_URL}/productos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  return { ok: res.ok, data: body };
}
