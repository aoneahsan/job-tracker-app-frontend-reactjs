/**
 * Enum's
 */

export enum RouteParams {
  jobId = ':jobId',
  invoiceId = ':invoiceId',
  invoiceType = ':invoiceType'
}

export enum ApiUrlEnum {
  register = '/register',
  profileDetails = '/profile-details',
  currencyDetails = '/currency-details',
  bankDetails = '/bank-details',
  login = '/login',
  logout = '/logout',
  forgotPasswordOtp = '/send-forget-password-otp',
  verifyOtp = '/verify-otp',
  resetPassword = '/reset-password',
  verifyAuthenticationStatus = '/verify-authentication-status',
  changeCredentials = '/change-credentials',

  jobs = '/jobs',
  jobsById = `/jobs/${RouteParams.jobId}`,
  jobsStatus = `/jobs/status/${RouteParams.jobId}`,

  jobNote = `/jobs/${RouteParams.jobId}/notes`,

  jobGuidance = '/job-guidance',


  // Files
  getSingleFile = '/file-upload/getSingleFileUrl',
  uploadSingleFile = '/file-upload/uploadSingleFile',
  deleteSingleFile = '/file-upload/deleteSingleFile',
  checkIfSingleFileExists = '/file-upload/checkIfSingleFileExists',
  uploadFiles = '/file-upload/uploadFiles'
}

export enum ZRQGetRequestExtractEnum {
  extractPage = 'extractPage',
  extractData = 'extractData',
  extractItems = 'extractItems',
  extractItem = 'extractItem'
}

export enum ZRQUpdaterAction {
  add = 'add',
  replace = 'replace',
  updateHole = 'updateHole',
  delete = 'delete'
}
