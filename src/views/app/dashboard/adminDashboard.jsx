import React, { Component, Fragment } from "react";
import {
  Row,
} from "reactstrap";
import { Colxx,Separator} from "../../../components/common/CustomBootstrap";
import * as constants from "../../../utils/constants";
import { connect } from "react-redux";
import ChatWidget from "@papercups-io/chat-widget";

/* eslint-disable */
class MetabaseAppEmbed extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {

  }
  getmetabashdashbord = () => {
    var deshbordId ;
    // for INROADS College Links org
    if(this.props.currentUser.organization.id === '79fc47d8-1a63-4156-95e8-786c9d6eeda6')
    {
       deshbordId = 36
    }
    //for Chewy org
    else if(this.props.currentUser.organization.id === '2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1')
    {
       deshbordId = 37
    }
    //for Chewy org
    else if(this.props.currentUser.organization.id === '2d7ca332-9098-4a0d-bcbb-1fbfde76d3a1')
    {
       deshbordId = 37
    }    
    else{
       deshbordId = 2
    }
    //this is use for send the jwt token to metabase
    var jwt = require("jsonwebtoken");
    var METABASE_SITE_URL = constants.METABASE_URL
    var METABASE_SECRET_KEY = constants.METABASE_SECRET_KEY
    var payload = {
      resource: { dashboard: deshbordId },
      params: {
        //send parameter for search by org
        "organization_name": this.props.currentUser.organization.name
      },
      exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);
    var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
    
    return iframeUrl
  }
 
  render() {
    return (
      <div>
      <Fragment>
              <Row>
          <Colxx xxs="12">
            <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
               Dashboard
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" md="12" sm="12" lg="12">
            <iframe
              src={this.getmetabashdashbord()}
              frameBorder="0"
              width="100%"
              height="600"
              allowtransparency
            ></iframe>
            {/* <iframe    src="https://symba.metabaseapp.com/public/dashboard/debe8796-c895-4c18-b75c-fca17b7b002e"    frameborder="0"    width="800"    height="600"    allowtransparency></iframe> */}
          </Colxx>
        </Row>
      </Fragment>
      <ChatWidget
          title="Symba Support"
          subtitle="Ask us your questions in the chat below and we will get back to you within 24 hours. In the meantime, access guides and FAQs within the Help tab."
          primaryColor="#17B298"
          greeting="Hi there, thanks for reaching out to Symba Support! How can we help?"
          customer={{
            name:
              this.props.currentUser.FirstName +
              " " +
              this.props.currentUser.LastName +
              " (" +
              this.props.currentUser.Email +
              ")",
            email: this.props.currentUser.Email,
            external_id: this.props.currentUser.UserId,
          }}
          newMessagePlaceholder="Start typing..."
          accountId="e09d8a48-fb81-4413-bbbc-c032288f6e33"
          baseUrl="https://app.papercups.io"
          showAgentAvailability={false}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser
  };
};
export default connect(
  mapStateToProps
)(MetabaseAppEmbed)
