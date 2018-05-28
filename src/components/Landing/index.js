import React from 'react'
import { FormattedMessage } from 'react-intl'
import Card from '../Card'
import PageTitle from '../PageTitle'
import PageWrapper from '../PageWrapper'

const LandingPage = () => {
  return (
    <React.Fragment>
      <PageTitle title={<FormattedMessage id="app.greeting.pageTitle" />} />
      <PageWrapper>
        <Card titleIntheBody title={<FormattedMessage id="app.greeting.title" />}>
          <p>
            <FormattedMessage id="app.greeting.body" />
          </p>
        </Card>
      </PageWrapper>
    </React.Fragment>
  )
}
export default LandingPage
