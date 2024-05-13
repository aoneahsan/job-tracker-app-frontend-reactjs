const authUrlCommonPath = '/app';

const routeParams = {
  jobId: '$jobId'
} as const;

const AppRoutesCommonPath = {
  onBoarding: '/onboarding',
  purchase: '/purchase',
  myAccount: '/my-account',
  dashboard: '/dashboard',
} as const;

const AppRoutesE = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  category: '/category',
  product: '/product',
  wishlist: '/wishlist',

  dashboardSub: {
    jobTracker: {
      path: '/job-tracker',
      completePath: `${AppRoutesCommonPath.dashboard}/job-tracker`
    },
    jobView: {
      path: `/job-tracker/${routeParams.jobId}`,
      completePath: `${AppRoutesCommonPath.dashboard}/job-tracker/${routeParams.jobId}`,

      notes: {
        path: '/notes',
        completePath: `${AppRoutesCommonPath.dashboard}/job-tracker/${routeParams.jobId}/notes`,
      },

      attachments: {
        path: '/attachments',
        completePath: `${AppRoutesCommonPath.dashboard}/job-tracker/${routeParams.jobId}/attachments`,
      },

      contacts: {
        path: '/contacts',
        completePath: `${AppRoutesCommonPath.dashboard}/job-tracker/${routeParams.jobId}/contacts`,
      }
    }
  },

  purchaseSub: {
    cart: {
      path: '/cart',
      completePath: `${AppRoutesCommonPath.purchase}/cart`
    },
    checkout: {
      path: '/checkout',
      completePath: `${AppRoutesCommonPath.purchase}/checkout`
    },
    completed: {
      path: '/completed',
      completePath: `${AppRoutesCommonPath.purchase}/completed`
    }
  },

  onBoardingSub: {
    profileDetailsStep: {
      path: '/profile-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/profile-details`
    },
    currencyDetailsStep: {
      path: '/currency-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/currency-details`
    },
    bankDetailsStep: {
      path: '/bank-details',
      completePath: `${AppRoutesCommonPath.onBoarding}/bank-details`
    }
  },

  myAccountSub: {
    dashboard: {
      path: '/dashboard',
      completePath: `${AppRoutesCommonPath.myAccount}/dashboard`
    },
    orders: {
      path: '/orders',
      completePath: `${AppRoutesCommonPath.myAccount}/orders`
    },
    downloads: {
      path: '/downloads',
      completePath: `${AppRoutesCommonPath.myAccount}/downloads`
    },
    addresses: {
      path: '/addresses',
      completePath: `${AppRoutesCommonPath.myAccount}/addresses`
    },
    accountDetails: {
      path: '/account-details',
      completePath: `${AppRoutesCommonPath.myAccount}/account-details`
    },
    shoppingAddress: {
      path: '/shopping-address',
      completePath: `${AppRoutesCommonPath.myAccount}/shopping-address`
    },
    wishlist: {
      path: '/wishlist',
      completePath: `${AppRoutesCommonPath.myAccount}/wishlist`
    },
    logout: {
      path: '/logout',
      completePath: `${AppRoutesCommonPath.myAccount}/logout`
    }
  },

  Testing: '/testing'
} as const;

// export const getFullPage

export const AppRoutes = {
  ...AppRoutesCommonPath,
  ...AppRoutesE
} as const;
