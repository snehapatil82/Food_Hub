import Menu from '../models/Menu.js';

// @desc    Get menus for a restaurant
// @route   GET /api/restaurants/:restaurantId/menu
// @access  Public
export const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find({ restaurantId: req.params.restaurantId });
    res.status(200).json({ success: true, count: menus.length, data: menus });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Create new menu item
// @route   POST /api/restaurants/:restaurantId/menu
// @access  Private/Admin
export const createMenu = async (req, res, next) => {
  try {
    req.body.restaurantId = req.params.restaurantId;
    const menu = await Menu.create(req.body);
    res.status(201).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
export const updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
export const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu item not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
