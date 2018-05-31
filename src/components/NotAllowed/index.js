import React from "react";
import Card from "../Card";
import PageTitle from "../PageTitle";
import PageWrapper from "../PageWrapper";

const LandingPage = () => (
  <React.Fragment>
    <PageTitle title="Fida IMU Key Indicator Reports" />
    <PageWrapper>
      <Card title="Access denied">
        <h2>Access denied</h2>
        <p>Your user account does not have rights to access this area.</p>
      </Card>
    </PageWrapper>
  </React.Fragment>
);

export default LandingPage;
