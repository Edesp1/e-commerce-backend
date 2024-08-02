const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.error('Error fetching categories:', err);
      res.status(500).json(err);
    });
});

// Get a single category by its `id`
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        return res.status(404).json({ message: 'No Category found with that ID.' });
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.error('Error fetching category:', err);
      res.status(500).json(err);
    });
});

// Create a new category
router.post('/', (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({ message: 'Category name is required.' });
  }

  Category.create({ category_name })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.error('Error creating category:', err);
      res.status(500).json(err);
    });
});

// Update a category by its `id`
router.put('/:id', (req, res) => {
  const { category_name } = req.body;

  if (!category_name) {
    return res.status(400).json({ message: 'Category name is required.' });
  }

  Category.update({ category_name }, {
    where: { id: req.params.id }
  })
    .then(([affectedRows]) => {
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'No Category found with that ID.' });
      }
      res.json({ message: 'Category updated successfully.' });
    })
    .catch(err => {
      console.error('Error updating category:', err);
      res.status(500).json(err);
    });
});

// Delete a category by its `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(deletedRows => {
      if (deletedRows === 0) {
        return res.status(404).json({ message: 'No Category found with that ID.' });
      }
      res.json({ message: 'Category deleted successfully.' });
    })
    .catch(err => {
      console.error('Error deleting category:', err);
      res.status(500).json(err);
    });
});

module.exports = router;