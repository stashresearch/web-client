import createAsyncActionTypes from './../../createAsyncActionTypes'
import Api from './../../ApiV2'

const INVITE_MEMBER = createAsyncActionTypes('INVITE_MEMBER')

function inviteMember ({ projectId, email, role }) {
  return {
    type: INVITE_MEMBER.type,
    payload: Api.post(
      `/projects/${projectId}/invite`, { email, role }
    )
  }
}

export default inviteMember

export {
  INVITE_MEMBER
}
