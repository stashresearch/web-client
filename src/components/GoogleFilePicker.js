import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { googleCredentials } from './../config/'
import history from './../history'
import createDataSource from './../actions/projects/createDataSource.action'
import GoogleApiProvider from './google/GoogleApiProvider'
import GoogleAuthorize from './google/GoogleAuthorize'
import GooglePicker from './google/GooglePicker'

const provider = 'google'

class GoogleFilePicker extends React.Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    text: PropTypes.string,
    onPicked: PropTypes.func,
    createDataSource: PropTypes.func.isRequired
  }

  static defaultProps = {
    text: 'Pick a file',
    onPicked: function () {}
  }

  constructor (props) {
    super(props)
    this.onPicked = this.onPicked.bind(this)
  }

  // onChange (data) {
  //   console.log('onchange', data)
  //   switch (data.action) {
  //     case 'loaded':
  //       return null
  //     case 'picked':
  //       this.props.createDataSource({
  //         projectId: this.props.projectId,
  //         accessToken: this.props.accessToken,
  //         dataSource: dataSourceName,
  //         fileId: data.docs[0].id
  //       })
  //       return null
  //     default:
  //       return null
  //   }
  // }

  async onPicked (doc) {
    console.log(doc)
    this.props.onPicked({
      projectId: this.props.projectId,
      provider,
      sourceId: doc.id,
      sourceName: doc.name,
      sourceUrl: doc.url,
      sourceEmbedUrl: doc.embedUrl
    })
  }

  render () {
    return (
      <GoogleApiProvider>
        <GoogleAuthorize config={ googleCredentials }>
          <GooglePicker onPicked={this.onPicked} config={ googleCredentials }>
            <Button variant="primary">{this.props.text}</Button>
          </GooglePicker>
        </GoogleAuthorize>
      </GoogleApiProvider>
      // <GooglePicker
      //   clientId={ googleCredentials.clientId }
      //   developerKey={ googleCredentials.developerKey }
      //   scope={ googleCredentials.scope }
      //   state={ this.props.state }
      //   redirectUri={ googleCredentials.redirectUri }
      //   onChange={ this.onChange }
      //   multiselect={false}
      //   navHidden={true}
      //   authImmediate={false}
      //   query={''}
      //   viewId={'DOCS'}>
      //   <Button variant="link">{this.props.text}</Button>
      // </GooglePicker>
    )
  }
}

function mapState (state) {
  const { session } = state
  return { state: session.token }
}

const actionCreators = {
  createDataSource
}

export default connect(mapState, actionCreators)(GoogleFilePicker)
