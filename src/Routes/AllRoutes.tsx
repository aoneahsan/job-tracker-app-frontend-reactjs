// #region Packages imports
import {
  lazyRouteComponent,
  redirect,
  createRoute
} from '@tanstack/react-router';
// #endregion

// #region Custom imports
import { Storage } from '@/utils/helpers';
import constants from '@/utils/constants';
import tanstackRootRoute from './RootRoute';
import { AppRoutes } from '@/Routes/AppRoutes';
// #endregion

// on window refresh
const privateRouteHandler = async (): Promise<void> => {
  await Promise.all([
    Storage.get(constants.localstorageKeys.authToken),
    Storage.get(constants.localstorageKeys.userData)
  ]).then(async ([authToken, userData]) => {
    if (authToken === undefined || authToken === null || userData === null) {
      // check api result
      // await zAxiosApiRequest({
      //   _url: ApiUrlEnum.verifyAuthenticationStatus,
      //   _method: "post",
      //   //     search: {
      //   //       redirect: location.href,
      //   //     },
      // });

      // eslint-disable-next-line
      throw redirect({
        to: AppRoutes.login
      });
    }
  });
};

const publicRouteHandler = async (): Promise<void> => {
  await Promise.all([
    Storage.get(constants.localstorageKeys.authToken),
    Storage.get(constants.localstorageKeys.userData)
  ]).then(async ([authToken, userData]) => {
    if (authToken !== undefined && userData !== undefined) {
      // eslint-disable-next-line
      // throw redirect({
      //   to: AppRoutes.authRoutes.invoices,
      //   params: {
      //     invoiceType: ZInvoiceTypeE.inv
      //   }
      // });
    }
  });
};

// #region  ----- Public routes -----
// --- Home
export const homeRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.home,
  // component: ({ navigate }) => {},
  beforeLoad: async ({ location, navigate }) => {
    navigate({
      to: AppRoutes.dashboardSub.jobTracker.completePath
    });
  }
});

// --- Login
export const loginRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.login,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/public/Login')
  ),
  beforeLoad: publicRouteHandler
});

// --- Register
export const registerRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.register,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/public/Register')
  ),
  beforeLoad: publicRouteHandler
});

export const forgotRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.forgotPassword,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/public/ForgotPassword')
  ),
  beforeLoad: publicRouteHandler
});

// #endregion

// #region  ----- Auth routes -----
// --- Purchase
export const purchaseRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.purchase,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Purchase')
  )
  // beforeLoad: async ({ location }) => {},
});

// --- Purchase cart
const purchaseCartRoute = createRoute({
  getParentRoute: () => purchaseRoute,
  path: AppRoutes.purchaseSub.cart.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/purchase/Cart')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase checkout
const purchaseCheckoutRoute = createRoute({
  getParentRoute: () => purchaseRoute,
  path: AppRoutes.purchaseSub.checkout.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/purchase/Checkout')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase completed
const purchaseCompletedRoute = createRoute({
  getParentRoute: () => purchaseRoute,
  path: AppRoutes.purchaseSub.completed.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/purchase/Completed')
  )
  // beforeLoad: privateRouteHandler
});

/// --- -- Purchase form tree
export const purchaseTree = purchaseRoute.addChildren([
  purchaseCartRoute,
  purchaseCheckoutRoute,
  purchaseCompletedRoute
]);

// -- My Account
const myAccountRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.myAccount,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/MyAccount')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase dashboard
const myAccountDashboardRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.dashboard.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/Dashboard')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase orders
const myAccountOrdersRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.orders.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/Orders')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase downloads
const myAccountDownloadsRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.downloads.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/Downloads')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase addresses
const myAccountAddressesRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.addresses.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/Addresses')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase account details
const myAccountDetailsRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.accountDetails.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/AccountDetails')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase shopping address
const myAccountShoppingAddressRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.shoppingAddress.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/ShoppingAddress')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase logout
const myAccountLogoutRoute = createRoute({
  getParentRoute: () => myAccountRoute,
  path: AppRoutes.myAccountSub.logout.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/components/auth/myAccount/Logout')
  )
  // beforeLoad: privateRouteHandler
});

/// --- -- Purchase form tree
export const myAccountTree = myAccountRoute.addChildren([
  myAccountDashboardRoute,
  myAccountOrdersRoute,
  myAccountDownloadsRoute,
  myAccountAddressesRoute,
  myAccountDetailsRoute,
  myAccountShoppingAddressRoute,
  myAccountLogoutRoute
]);

// -- Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.dashboard,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase Job tracker
const jobTrackerRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: AppRoutes.dashboardSub.jobTracker.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard/JobTracker')
  )
  // beforeLoad: privateRouteHandler
});

// --- Purchase Job tracker view
const jobTrackerViewRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: AppRoutes.dashboardSub.jobView.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard/JobView')
  )
  // beforeLoad: privateRouteHandler
});

/// --- Purchase Job tracker view notes
const jobTrackerViewNotesRoute = createRoute({
  getParentRoute: () => jobTrackerViewRoute,
  path: AppRoutes.dashboardSub.jobView.notes.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard/JobView/Notes')
  )
  // beforeLoad: privateRouteHandler
});

/// --- Purchase Job tracker view attachments
const jobTrackerViewAttachmentsRoute = createRoute({
  getParentRoute: () => jobTrackerViewRoute,
  path: AppRoutes.dashboardSub.jobView.attachments.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard/JobView/Attachments')
  )
  // beforeLoad: privateRouteHandler
});

/// --- Purchase Job tracker view contacts
const jobTrackerViewContactsRoute = createRoute({
  getParentRoute: () => jobTrackerViewRoute,
  path: AppRoutes.dashboardSub.jobView.contacts.path,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/authenticated/Dashboard/JobView/Contacts')
  )
  // beforeLoad: privateRouteHandler
});

/// --- -- Job tracker view form tree
const jobTrackerViewTree = jobTrackerViewRoute.addChildren([
  jobTrackerViewNotesRoute,
  jobTrackerViewAttachmentsRoute,
  jobTrackerViewContactsRoute
]);

/// --- -- Dashboard form tree
export const dashboardTree = dashboardRoute.addChildren([
  jobTrackerRoute,
  jobTrackerViewTree
]);
// #endregion

// #region  ----- Common routes -----
// --- Category
export const categoryRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.category,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/common/Category')
  )
  // beforeLoad: async ({ location }) => {},
});

// --- Product
export const productRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.product,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/common/Product')
  )
  // beforeLoad: async ({ location }) => {},
});

export const wishlistRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.wishlist,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/common/Wishlist')
  )
});
// #endregion

// #region  ----- Testing routes -----
export const testingRoute = createRoute({
  getParentRoute: () => tanstackRootRoute,
  path: AppRoutes.Testing,
  component: lazyRouteComponent(
    async (): Promise<Record<string, unknown>> =>
      await import('@/pages/TestingPage')
  )
  // beforeLoad: privateRouteHandler
});

// #endregion
