import {
  homeRoute,
  loginRoute,
  registerRoute,
  testingRoute,
  forgotRoute,
  categoryRoute,
  productRoute,
  purchaseTree,
  myAccountTree,
  wishlistRoute,
  dashboardTree
} from './AllRoutes';
import tanstackRootRoute from './RootRoute';

const routeTree = tanstackRootRoute.addChildren([
  homeRoute,
  registerRoute,
  loginRoute,
  testingRoute,
  forgotRoute,
  categoryRoute,
  productRoute,
  purchaseTree,
  myAccountTree,
  wishlistRoute,
  dashboardTree
]);

export default routeTree;
