import React from 'react'
import { reduxForm, Field } from 'redux-form'
import Card, { CardActions, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { TextField } from 'redux-form-material-ui'

let LoginForm = props =>
  <form
    onSubmit={props.handleSubmit}
    style={{maxWidth: '275px'}}
  >
    <Card>
      <CardText style={{padding: '16px'}}>
        <Field
          component={TextField}
          hintText='Username'
          floatingLabelText='Username'
          name='username'
          type='text'
          style={{width: '100%'}}
        />
        <Field
          component={TextField}
          hintText='Password'
          floatingLabelText='Password'
          name='password'
          type='text'
          style={{width: '100%'}}
        />
      </CardText>
      <CardActions style={{padding: '16px', textAlign: 'right'}}>
        <FlatButton
          label='Login'
          style={{marginRight: 0}}
          type='submit'
          disabled={props.pristine || props.submitting}
        />
      </CardActions>
    </Card>
  </form>

LoginForm = reduxForm({ form: 'login' })(LoginForm)

export default LoginForm
