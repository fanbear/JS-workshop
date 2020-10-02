'use strict';

import './storage.js';
import generateHeader from './generateHeader.js';
import generateFooter from './generateFooter.js';
import generateCatalog from './generateCatalog.js';
import generateGoodsPage from './generateGoodsPage.js';
import generateItemPage from './generateItemPage.js';
import generateCartPage from './generateCartPage.js';

generateCartPage();
generateHeader();
generateFooter();
generateCatalog();
generateGoodsPage();
generateItemPage();
