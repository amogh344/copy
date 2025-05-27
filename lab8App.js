// // import React, { useEffect, useState } from 'react';

// // function App() {
// //   const [products, setProducts] = useState([]);
// //   const [form, setForm] = useState({ name: '', price: '', description: '' });
// //   const [editingId, setEditingId] = useState(null);

// //   const fetchProducts = async () => {
// //     const res = await fetch('http://localhost:5000/products');
// //     const data = await res.json();
// //     setProducts(data);
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (editingId) {
// //       await fetch(`http://localhost:5000/products/${editingId}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(form),
// //       });
// //       setEditingId(null);
// //     } else {
// //       await fetch('http://localhost:5000/products', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(form),
// //       });
// //     }
// //     setForm({ name: '', price: '', description: '' });
// //     fetchProducts();
// //   };

// //   const handleDelete = async (id) => {
// //     await fetch(`http://localhost:5000/products/${id}`, {
// //       method: 'DELETE',
// //     });
// //     fetchProducts();
// //   };

// //   const handleEdit = (product) => {
// //     setForm({ name: product.name, price: product.price, description: product.description });
// //     setEditingId(product._id);
// //   };

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>Product List</h2>
// //       <ul>
// //         {products.map((p) => (
// //           <li key={p._id} style={{ marginBottom: '10px' }}>
// //             <strong>{p.name}</strong> - ${p.price}
// //             <br />
// //             <em>{p.description}</em>
// //             <br />
// //             <button onClick={() => handleEdit(p)}>Edit</button>{' '}
// //             <button onClick={() => handleDelete(p._id)}>Delete</button>
// //           </li>
// //         ))}
// //       </ul>

// //       <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           placeholder="Name"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />
// //         <input
// //           placeholder="Price"
// //           type="number"
// //           value={form.price}
// //           onChange={(e) => setForm({ ...form, price: e.target.value })}
// //         />
// //         <input
// //           placeholder="Description"
// //           value={form.description}
// //           onChange={(e) => setForm({ ...form, description: e.target.value })}
// //         />
// //         <button type="submit">{editingId ? 'Update' : 'Add'}</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default App;



// import React, { useEffect, useState } from 'react';

// function App() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: '', price: '', description: '' });
//   const [editingId, setEditingId] = useState(null);

//   const apiBase = 'http://localhost:5000/products';

//   const fetchProducts = async () => {
//     const res = await fetch(apiBase);
//     setProducts(await res.json());
//   };

//   useEffect(() => { fetchProducts(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const method = editingId ? 'PUT' : 'POST';
//     const url = editingId ? `${apiBase}/${editingId}` : apiBase;

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     setForm({ name: '', price: '', description: '' });
//     setEditingId(null);
//     fetchProducts();
//   };

//   const handleDelete = async (id) => {
//     await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
//     fetchProducts();
//   };

//   const handleEdit = ({ _id, name, price, description }) => {
//     setForm({ name, price, description });
//     setEditingId(_id);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((f) => ({ ...f, [name]: value }));
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Product List</h2>
//       <ul>
//         {products.map(({ _id, name, price, description }) => (
//           <li key={_id} style={{ marginBottom: 10 }}>
//             <strong>{name}</strong> - ${price}
//             <br />
//             <em>{description}</em>
//             <br />
//             <button onClick={() => handleEdit({ _id, name, price, description })}>Edit</button>{' '}
//             <button onClick={() => handleDelete(_id)}>Delete</button>
//           </li>
//         ))}
//       </ul>

//       <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
//       <form onSubmit={handleSubmit}>
//         {['name', 'price', 'description'].map((field) => (
//           <input
//             key={field}
//             name={field}
//             placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//             type={field === 'price' ? 'number' : 'text'}
//             value={form[field]}
//             onChange={handleChange}
//           />
//         ))}
//         <button type="submit">{editingId ? 'Update' : 'Add'}</button>
//       </form>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';

const App = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const api = 'http://localhost:5000/products';

  const load = async () => setProducts(await (await fetch(api)).json());

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch(editingId ? `${api}/${editingId}` : api, {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', price: '', description: '' });
    setEditingId(null);
    load();
  };

  const del = async (id) => {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <b>{p.name}</b> - ${p.price} <br /><i>{p.description}</i><br />
            <button onClick={() => { setForm(p); setEditingId(p._id); }}>Edit</button>{' '}
            <button onClick={() => del(p._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>{editingId ? 'Edit' : 'Add'} Product</h3>
      <form onSubmit={submit}>
        {['name', 'price', 'description'].map(k => (
          <input
            key={k}
            name={k}
            type={k === 'price' ? 'number' : 'text'}
            placeholder={k}
            value={form[k]}
            onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))}
          />
        ))}
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};
export default App;