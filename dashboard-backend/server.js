const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
const salesData = JSON.parse(fs.readFileSync('Sales.json', 'utf8'));
app.get('/api/states', (req, res) => {
  const states = [...new Set(salesData.map(item => item.State))];
  res.json(states);
});
app.get('/api/dates', (req, res) => {
  const { state } = req.query;
  const filtered = salesData.filter(item => item.State === state);
  if (filtered.length === 0) return res.json({ min: null, max: null });
  const dates = filtered.map(item => new Date(item["Order Date"]));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));
  res.json({ min: minDate.toISOString(), max: maxDate.toISOString() });
});
app.get('/api/profit',(req,res)=>{
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });
  const filtered = salesData.filter(item => item.State === state);
  const totalProfit = filtered.reduce((sum, item) => sum + Number(item.Profit || 0), 0);
  res.json({profit: totalProfit});

});

app.get('/api/sales', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });
  const filtered = salesData.filter(item => item.State === state);
  const totalSales = filtered.reduce((sum, item) => sum + Number(item.Sales || 0), 0);
  res.json({ sales: totalSales });
});

app.get('/api/quantity', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });
  const filtered = salesData.filter(item => item.State === state);
  const totalQuantity = filtered.reduce((sum, item) => sum + Number(item.Quantity || 0), 0);
  res.json({ quantity: totalQuantity });
});

app.get('/api/discount', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });
  const filtered = salesData.filter(item => item.State === state);
  if (filtered.length === 0) return res.json({ discount: 0 });
  // Find average discount or total discount percentage as needed
  // Here, calculating average discount percentage
  const totalDiscount = filtered.reduce((sum, item) => sum + Number(item.Discount || 0), 0);
  const avgDiscount = (totalDiscount / filtered.length) * 100;
  res.json({ discount: avgDiscount });
});

app.get('/api/sales-by-city', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });

  const filtered = salesData.filter(item => item.State === state);

  // Calculate sales by city
  const citySales = {};
  filtered.forEach(item => {
    if (!citySales[item.City]) {
      citySales[item.City] = 0;
    }
    citySales[item.City] += Number(item.Sales || 0);
  });

  // Format as array of objects for charting
  const result = Object.entries(citySales).map(([city, sales]) => ({
    city,
    sales,
  }));

  res.json(result);
});

app.get('/api/sales-by-product', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });

  const filtered = salesData.filter(item => item.State === state);

  // Calculate sales by product name
  const productSales = {};
  filtered.forEach(item => {
    if (!productSales[item["Product Name"]]) {
      productSales[item["Product Name"]] = 0;
    }
    productSales[item["Product Name"]] += Number(item.Sales || 0);
  });

  // Format as array of objects for frontend
  const result = Object.entries(productSales).map(([product, sales]) => ({
    product,
    sales,
  }));

  res.json(result);
});

app.get('/api/sales-by-category', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });

  const filtered = salesData.filter(item => item.State === state);

  // Calculate sales by category
  const categorySales = {};
  filtered.forEach(item => {
    if (!categorySales[item.Category]) {
      categorySales[item.Category] = 0;
    }
    categorySales[item.Category] += Number(item.Sales || 0);
  });

  // Format as array of objects for pie chart
  const result = Object.entries(categorySales).map(([category, sales]) => ({
    name: category,
    value: sales,
  }));

  res.json(result);
});

app.get('/api/sales-by-subcategory', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });

  const filtered = salesData.filter(item => item.State === state);

  // Calculate sales by sub-category
  const subCatSales = {};
  filtered.forEach(item => {
    if (!subCatSales[item["Sub-Category"]]) {
      subCatSales[item["Sub-Category"]] = 0;
    }
    subCatSales[item["Sub-Category"]] += Number(item.Sales || 0);
  });

  // Format for chart
  const result = Object.entries(subCatSales).map(([name, sales]) => ({
    name,
    sales,
  }));

  res.json(result);
});

app.get('/api/sales-by-segment', (req, res) => {
  const { state } = req.query;
  if (!state) return res.status(400).json({ error: 'State is required' });

  const filtered = salesData.filter(item => item.State === state);

  // Calculate sales by segment
  const segmentSales = {};
  filtered.forEach(item => {
    if (!segmentSales[item.Segment]) {
      segmentSales[item.Segment] = 0;
    }
    segmentSales[item.Segment] += Number(item.Sales || 0);
  });

  // Format for chart
  const result = Object.entries(segmentSales).map(([name, sales]) => ({
    name: name,
    value: sales,
  }));

  res.json(result);
});


app.listen(5000, () => console.log('API server running on port 5000'));
