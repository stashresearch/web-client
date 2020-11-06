import React from 'react'
import {
  Router,
  Switch,
  Route
} from 'react-router-dom'
import history from './history'
import './assets/bootstrap-custom.scss'
import './assets/App.css'
import * as screens from './screens/'
import Header from './components/Header'
import ErrorBoundary from './lib/ErrorBoundary'

function App () {
  return (
    <Router history={ history }>
      <ErrorBoundary>
        <Header />
        <Switch>
          <Route path="/" exact component={screens.HomeScreen} />
          <Route path="/login" exact component={screens.LoginScreen} />
          <Route path="/signup" exact component={screens.SignupScreen} />
          <Route path="/settings" exact component={screens.SettingsScreen} />
          <Route path="/reset_password/:token?" exact component={screens.ResetPassword} />
          <Route path="/dashboard" exact component={screens.DashboardScreen} />
          <Route path="/invitation" exact component={screens.projects.InvitationReply} />
          <Route path="/projects/new" exact component={screens.ProjectNewScreen} />
          <Route path="/projects/new/:step" exact component={screens.ProjectNewScreen} />
          <Route path="/projects/recovery" exact component={screens.projects.Recovery} />
          <Route path="/projects/:projectId/setup" exact component={screens.ProjectSetupScreen} />
          <Route path="/projects/:projectId/data/:dataSourceId?" component={screens.DataPreview} />
          <Route path="/projects/:id/history" component={screens.ProjectHistoryScreen} />
          <Route path="/projects/:id/settings/:section?" component={screens.ProjectSettingsScreen} />
          <Route path="/projects/:id/new_source" component={screens.ProjectNewDataSourceScreen} />
          <Route path="/projects/:projectId/dataSources/:dataSourceId/diff/:target/:source?"
            component={screens.ProjectDiffScreen} />
          <Route path="/dataSources/:id/setup" exact component={screens.DataSourceSetupScreen} />
          <Route path="/dataSources/:id/csv_setup" exact component={screens.projects.dataSources.CsvSetupScreen} />
          <Route path="/dataSources/:id/sync_settings" exact component={screens.projects.dataSources.SyncSettingsScreen} />
          <Route path="/projects/:id" component={screens.ProjectDetailScreen} />
          <Route path="/profile/edit" component={screens.ProfileEditScreen} />
          <Route path="/profile/:handle" component={screens.ProfileScreen} />
        </Switch>
      </ErrorBoundary>
    </Router>
  )
}

export default App
