import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { PieChart, Pie, Cell, Legend} from 'recharts';
const pieColors = ["#429be5", "#ffa726", "#e53935", "#43a047", "#8e24aa", "#fdd835", "#3949ab"];
const segmentColors = ["#e53935", "#43a047", "#3949ab"];

// You will need a chart library like Recharts/ECharts later

function App() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [dates, setDates] = useState({ min: '', max: '' });
  const [profit, setProfit] = useState(0);
  const [sales, setSales] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [citySales, setCitySales] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [subCategorySales, setSubCategorySales] = useState([]);
  const [segmentSales, setSegmentSales] = useState([]);






  // Add more states for sales, quantity, discount etc. if needed

  useEffect(() => {
    axios.get('http://localhost:5000/api/states').then(res => {
      setStates(res.data);
      setSelectedState(res.data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/api/dates?state=${selectedState}`).then(res => setDates(res.data));
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState) {
      axios.get(`http://localhost:5000/api/profit?state=${selectedState}`).then(res => setProfit(res.data.profit));
    }
  }, [selectedState]);

  useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales?state=${selectedState}`)
      .then(res => setSales(res.data.sales));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/quantity?state=${selectedState}`)
      .then(res => setQuantity(res.data.quantity));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/discount?state=${selectedState}`)
      .then(res => setDiscount(res.data.discount));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales-by-city?state=${selectedState}`)
      .then(res => setCitySales(res.data));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales-by-product?state=${selectedState}`)
      .then(res => setProductSales(res.data));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales-by-category?state=${selectedState}`)
      .then(res => setCategorySales(res.data));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales-by-subcategory?state=${selectedState}`)
      .then(res => setSubCategorySales(res.data));
  }
}, [selectedState]);

useEffect(() => {
  if (selectedState) {
    axios.get(`http://localhost:5000/api/sales-by-segment?state=${selectedState}`)
      .then(res => setSegmentSales(res.data));
  }
}, [selectedState]);






  // You will need additional API calls and states for each chart/card

  return (
    <div className="container-fluid" style={{ background: '#f4f4f4', minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block bg-dark sidebar" style={{ minHeight: '100vh' }}>
          <div className="sidebar-sticky pt-3">
            <h5 className="text-white px-3 py-2">Sales Dashboard</h5>
            <ul className="nav flex-column mb-4">
              <li className="nav-item"><a className="nav-link text-white" href="#">Sales Overview</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Stores</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Notifications</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Settings</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">Light Theme</a></li>
            </ul>
          </div>
        </nav>
        {/* Main Content */}
        <main className="col-md-10 ml-sm-auto col-lg-10 px-4">
          <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3">
            <div>
              <h4>Sales Overview</h4>
            </div>
            <div>
              <span className="mr-3">Hello User</span>
              <img src="https://i.pravatar.cc/30" alt="user" style={{ borderRadius: '50%' }} />
            </div>
          </div>
          {/* Top Filters */}
          <div className="row mb-4">
            <div className="col-md-3">
              <label>Select a state</label>
              <select className="form-control" value={selectedState} onChange={e => setSelectedState(e.target.value)}>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label>Select From date</label>
              <input className="form-control" type="date" value={dates.min ? dates.min.slice(0,10) : ''} readOnly />
            </div>
            <div className="col-md-3">
              <label>Select To date</label>
              <input className="form-control" type="date" value={dates.max ? dates.max.slice(0,10) : ''} readOnly />
            </div>
          </div>
          {/* Top Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <div style={{ fontSize: '2em', color: 'seagreen' }}>₹</div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>₹{typeof sales === 'number' ? sales.toLocaleString(undefined, {maximumFractionDigits: 2}) : sales}</div>
                  <div>Total Sales</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <div style={{ fontSize: '2em', color: '#3399ff' }}><i className="bi bi-box-seam"></i></div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}> {typeof quantity === 'number' ? quantity.toLocaleString() : quantity}</div>
                  <div>Quantity Sold</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <div style={{ fontSize: '2em', color: '#ffa726' }}><i className="bi bi-percent"></i></div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{typeof discount === 'number' ? discount.toFixed(1) + '%' : discount}</div>
                  <div>Discount%</div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <div style={{ fontSize: '2em', color: '#ef5350' }}><i className="bi bi-cash"></i></div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.5em' }}>
                    ₹{typeof profit === 'number' ? profit.toLocaleString(undefined, { maximumFractionDigits: 2 }) : profit}
                  </div>
                  <div>Profit</div>
                </div>
              </div>
            </div>
          </div>
          {/* Sales by City PRODUCTS etc. */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Sales by City</h6>
                  <div className="py-4 px-3 text-muted"><ResponsiveContainer width="100%" height={250}>
  <BarChart
    data={citySales}
    layout="vertical"
    margin={{ top: 8, right: 20, left: 8, bottom: 8 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis type="number" />
    <YAxis type="category" dataKey="city" width={100} />
    <Tooltip />
    <Bar dataKey="sales" fill="#429be5">
      <LabelList dataKey="sales" position="right" formatter={value => value.toLocaleString()} style={{ fontSize: 10 }}  />
    </Bar>
  </BarChart>
</ResponsiveContainer>
</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Sales by Products</h6>
                  <div className="py-4 px-3 text-muted"><div className="card mb-3">
  <div className="card-body">
    <h6>Sales by Products</h6>
    <div style={{maxHeight: "220px", overflowY: "auto"}}>
      <table className="table table-bordered table-sm">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Sales in ₹</th>
          </tr>
        </thead>
        <tbody>
          {productSales.map(item => (
            <tr key={item.product}>
              <td>{item.product}</td>
              <td>{item.sales.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Sales by Category</h6>
                  <div className="py-4 px-3 text-muted"> 

<div className="card mb-3">
  <div className="card-body">
    <h6>Sales by Category</h6>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={categorySales}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={45}
          label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
        >
          {categorySales.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Sales by Sub Category</h6>
                  <div className="py-4 px-3 text-muted"><div className="card mb-3">
  <div className="card-body">
    <h6>Sales by Sub Category</h6>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart
        data={subCategorySales}
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" width={50} tick={{ fontSize: 10 }} />
        <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
        <Bar dataKey="sales" fill="#43a047">
          <LabelList dataKey="sales" position="right" formatter={value => value.toLocaleString()} style={{ fontSize: 10 }}/>
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>
</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-3">
                <div className="card-body">
                  <h6>Sales by Segment</h6>
                  <div className="py-4 px-3 text-muted"><div className="card mb-3">
  <div className="card-body">
    <h6>Sales by Segment</h6>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={segmentSales}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={45}
          label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
        >
          {segmentSales.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={segmentColors[index % segmentColors.length]} />
          ))}
        </Pie>
        <Tooltip formatter={value => `₹${value.toLocaleString()}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div></div>
                </div>
              </div>
            </div>
          </div>
          {/* Blue Bar at bottom */}
          <div className="row">
            <div className="col-12 text-center py-3" style={{ background: "#3399ff", color: "#fff", borderRadius: "6px" }}>
              {/* Placeholder for notification or action bar */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
