const connection = require('./connection');

const findAllSales = async () => {
    const [sales] = await connection.execute(`
  SELECT
    sp.sale_id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM
    sales_products AS sp
  JOIN
    sales AS s ON sp.sale_id = s.id
  ORDER BY
    sp.sale_id,
    s.date;
  `);
    return sales;
};

const findSaleById = async (id) => {
    const [sale] = await connection.execute(`
  SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM
    sales_products AS sp
  JOIN
    sales AS s ON sp.sale_id = s.id
  WHERE
    sp.sale_id = ?
  ORDER BY
    sp.sale_id,
    sp.product_id;
  `, [id]);
    return sale;
};

const createNewSale = async (data) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );
  const { insertId } = result;
  await data.forEach((element) => {
 connection.execute(
`
 INSERT INTO
    sales_products (sale_id, product_id, quantity)
  VALUES 
    (?, ?, ?)
  `, 
    [insertId, element.productId, element.quantity],
);
  });
  return insertId;
};

module.exports = {
  findAllSales,
  findSaleById,
  createNewSale,
};