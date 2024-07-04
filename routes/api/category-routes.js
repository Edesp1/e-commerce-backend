const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Get all categories and include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get categories' });
  }
});

// Get one category by its `id` value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get category' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Category.update(
      { category_name: req.body.category_name },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }

    const updatedCategory = await Category.findOne({ where: { id: req.params.id } });
    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// Delete a category by its `id` value
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No Category found with that ID.' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;