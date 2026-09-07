"use client";

import {
  Categoria,
  Producto,
  crearProducto,
  getCategorias,
  getProductos,
} from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [buscar, setBuscar] = useState("");

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [categoriaForm, setCategoriaForm] = useState("");
  const [errores, setErrores] = useState<Record<string, string[]>>({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    getCategorias().then(setCategorias);
  }, []);

  useEffect(() => {
    getProductos({ categoria: filtroCategoria, buscar }).then(setProductos);
  }, [filtroCategoria, buscar]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrores({});
    setCargando(true);

    const { ok, data } = await crearProducto({
      nombre,
      descripcion,
      precio,
      stock: Number(stock),
      categoria: Number(categoriaForm),
    });

    setCargando(false);

    if (!ok) {
      setErrores(data as Record<string, string[]>);
      return;
    }

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setCategoriaForm("");
    getProductos({ categoria: filtroCategoria, buscar }).then(setProductos);
  }

  return (
    <div className="max-w-3xl mx-auto p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6">Catálogo de productos</h1>

      <section className="mb-8 border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-3">Nuevo producto</h2>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border rounded px-3 py-2"
          />
          {errores.nombre && (
            <p className="text-red-600 text-sm">{errores.nombre[0]}</p>
          )}

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="border rounded px-3 py-2"
          />

          <input
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border rounded px-3 py-2"
          />
          {errores.precio && (
            <p className="text-red-600 text-sm">{errores.precio[0]}</p>
          )}

          <input
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border rounded px-3 py-2"
          />
          {errores.stock && (
            <p className="text-red-600 text-sm">{errores.stock[0]}</p>
          )}

          <select
            value={categoriaForm}
            onChange={(e) => setCategoriaForm(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Selecciona categoría</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {errores.categoria && (
            <p className="text-red-600 text-sm">{errores.categoria[0]}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {cargando ? "Guardando..." : "Crear producto"}
          </button>
        </form>
      </section>

      <section className="mb-4 flex gap-3">
        <input
          placeholder="Buscar por nombre..."
          value={buscar}
          onChange={(e) => setBuscar(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </section>

      <ul className="grid gap-3">
        {productos.map((p) => (
          <li key={p.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <span className="font-semibold">{p.nombre}</span>
              <span>${p.precio}</span>
            </div>
            <p className="text-sm text-gray-600">{p.descripcion}</p>
            <p className="text-sm text-gray-500">
              {p.categoria_nombre} · stock: {p.stock}
            </p>
          </li>
        ))}
        {productos.length === 0 && (
          <p className="text-gray-500">No hay productos.</p>
        )}
      </ul>
    </div>
  );
}