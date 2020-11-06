
const APP_TITLE = 'StashResearch'

const api = {
  protocol: 'https',
  domain: 'api.stashresearch.org',
  endpoint: '/v1'
}

const googleCredentials = {
  clientId: process.env.REACT_APP_GOOGLE_API_CLIENT_ID,
  developerKey: process.env.REACT_APP_GOOGLE_API_DEVELOPER_KEY,
  scope: ['https://www.googleapis.com/auth/drive.file'],
  redirectUri: 'https://api.stashresearch.org/v2/googleWebhook/oauthcallback'
}

const formState = {
  submitCount: 0,
  submitting: false,
  success: false,
  // error reply payload
  error: null,
  // success response payload
  payload: null
}

export {
  APP_TITLE,
  api,
  googleCredentials,
  formState
}
