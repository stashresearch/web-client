import PropTypes from 'prop-types'

const USER_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  locale: PropTypes.string,
  profileImage: PropTypes.string
})

const DATA_SOURCE_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  createdByUserId: PropTypes.string.isRequired,
  sourceId: PropTypes.string,
  sourceName: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  // localPath: PropTypes.string.isRequired,
  syncMethod: PropTypes.string,
  syncStatus: PropTypes.string,
  syncExpiresAt: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})

const PROJECT_MEMBER_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired
})

const PROJECT_TYPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  salt: PropTypes.string.isRequired,
  gitRepo: PropTypes.string,
  embargoEndAt: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  dataSources: PropTypes.arrayOf(DATA_SOURCE_TYPE),
  members: PropTypes.arrayOf(PROJECT_MEMBER_TYPE).isRequired
})

const METADATA_TYPE = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  access: PropTypes.oneOf(['public', 'private']),
  path: PropTypes.string,
  gitRepo: PropTypes.string,
  embargoEndAt: PropTypes.string,
  projectUsers: PropTypes.array,
  dataSources: PropTypes.array,
  rows: PropTypes.number,
  columns: PropTypes.number
})

const GOOGLE_API_CONFIG_TYPE = PropTypes.shape({
  clientId: PropTypes.string.isRequired,
  developerKey: PropTypes.string.isRequired,
  scope: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  redirectUri: PropTypes.string.isRequired
})

const GOOGLE_API_TYPE = PropTypes.shape({
  loadingApi: PropTypes.bool.isRequired,
  apiLoaded: PropTypes.bool.isRequired,
  apiLoadError: PropTypes.string,
  accessToken: PropTypes.string,
  fetchingToken: PropTypes.bool.isRequired,
  tokenError: PropTypes.string
})

export {
  USER_TYPE,
  DATA_SOURCE_TYPE,
  PROJECT_TYPE,
  METADATA_TYPE,
  GOOGLE_API_CONFIG_TYPE,
  GOOGLE_API_TYPE
}
