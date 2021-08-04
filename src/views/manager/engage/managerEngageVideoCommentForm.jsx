import React, { Component, Fragment } from "react";

import {
  Row,
  // Card,
  // CardBody,
  // Input,
  // CardTitle,
  // FormGroup,
  // Label,
  // CustomInput,
  Button,
  // FormText,
  // Form,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // Table,
  // Modal,
} from "reactstrap";
// import { NavLink } from "react-router-dom";
// import { injectIntl } from "react-intl";

// import IntlMessages from "../../../helpers/IntlMessages";

// import DatePicker from "react-datepicker";
// import moment from "moment";
// import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import Breadcrumb from "../../../containers/navs/Breadcrumb";

// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
import {
  Field,
  reduxForm,
  // FieldArray,
  //formValueSelector,
  // reset,
} from "redux-form";
import {
  renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getEngageVideoDetails,
  getEngageVideoCommentsList,
} from "../../../action/engage/engage";

// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
import ReactPlayer from "react-player";
// import EngageReducer from "../../../reducers/engage_reducer";

class managerEngageVideoCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    if (this.props.EngageVideoId != null) {
      this.props.getEngageVideoDetails({
        engagevideoid: this.props.EngageVideoId,
        engagecategoryid: this.props.EnageCategoryId,
        orgid: this.props.organizationId,
      });
    }

    var queryObj = {
      engagevideoid: this.props.EngageVideoId,
      orgid: this.props.currentUser.organization.id,
    };

    this.props.getEngageVideoCommentsList(queryObj);
  }

  handelInitialValues = () => {
    const overviewObj = {
      commenttext: " ",
    };
    this.props.initialize(overviewObj);
  };

  getEngageVideo = () => {
    let div = [];

    if (this.props.engageVideoDetail) {
      let Container = [];
      let Row = [];

      if (this.props.engageVideoDetail.EngageVideoUrl != null) {
        Row.push(
          <div className="managerEngagevideo_rplayer_learningcenter">
            {
              <ReactPlayer
                url={this.props.engageVideoDetail.EngageVideoUrl}
                //playing
                controls={true}
                className="react-player"
                width="100%"
                height="100%"
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
            }
          </div>
        );
      } else {
        Row.push(<div>{}</div>);
      }
      Container.push(<div>{Row}</div>);
      div.push(<div>{Container}</div>);
    }
    return div;
  };
  getEngageVideoTitle = () => {
    let div = [];

    if (this.props.engageVideoDetail) {
      let Container = [];
      let Row = [];
      let Row1 = [];

      if (this.props.engageVideoDetail.EngageVideoTitle != null) {
        Row.push(
          <Colxx xxs="12" md="12" sm="12" lg="12">
            {
              <div style={{ marginTop: "-20px" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#3B3A4A",
                    fontSize: "22px",
                    marginBottom: "0px",
                  }}
                >
                  {this.props.engageVideoDetail.EngageVideoTitle}
                </h2>
                <span>
                  {" "}
                  {new Intl.DateTimeFormat("us-GB", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(this.props.engageVideoDetail.CreateDate))}
                </span>
              </div>
            }
            <br></br>
          </Colxx>
        );
      }
      if (this.props.engageVideoDetail.EngageVideoDescription != null) {
        Row1.push(
          <Colxx xxs="12" md="12" sm="12" lg="12">
            {
              <span style={{ color: "#3B3A4A", fontSize: "17px" }}>
                {this.props.engageVideoDetail.EngageVideoDescription}
              </span>
            }
          </Colxx>
        );
      }

      Container.push(<div>{Row}</div>);
      Container.push(<div>{Row1}</div>);
      div.push(<div>{Container}</div>);
    }
    return div;
  };
  getEngageVideoComments = () => {
    let table = [];

    if (this.props.videoCommentList) {
      if (this.props.videoCommentCount > 0) {
        let Title = [];
        for (let i = 0; i < this.props.videoCommentCount; i++) {
          if (this.props.videoCommentList[i].Commentuserimage != null) {
            Title.push(
              <Colxx xxs="2" sm="6" md="1" lg="1" xl="1">
                {
                  <img
                    style={{ borderRadius: "0.1rem", width: "100%" }}
                    src={this.props.videoCommentList[i].Commentuserimage}
                    alt=""
                  ></img>
                }
              </Colxx>
            );
          } else {
            Title.push(
              <Colxx xxs="2" md="1" lg="1" xl="1">
                {
                  <img
                    style={{ borderRadius: "0.1rem", width: "100%" }}
                    src="/assets/img/profile_icon.png"
                    alt=""
                  />
                }
              </Colxx>
            );
          }

          Title.push(
            <Colxx xxs="10" md="11" lg="11" xl="11">
              {
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                      lineHeight: "29px",
                      letterSpacing: "1px",
                    }}
                  >
                    {this.props.videoCommentList[i].Commentusername}
                  </span>
                  <br></br>
                  <span style={{ fontSize: "16px" }}>
                    {this.props.videoCommentList[i].Commenttext}
                  </span>
                  <br></br>
                  <br></br>
                </div>
              }
            </Colxx>
          );
        }
        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  getCurrentUserImage = () => {
    let div = [];
    if (this.props.currentUser) {
      let Container = [];
      if (this.props.currentUser.ProfileImage != null) {
        Container.push(
          <div>
            {
              <img
                className="engage_comment_profile"
                src={this.props.currentUser.ProfileImage}
                alt=""
              ></img>
            }
          </div>
        );
      } else {
        Container.push(
          <div>
            {
              <img
                className="engage_comment_profile"
                src="/assets/img/profile_icon.png"
                alt=""
              />
            }
          </div>
        );
      }
      div.push(<div>{Container}</div>);
    }
    return div;
  };

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="12" lg="2" md="2">
                <Link to="/managerapp/engage/list">
                  <i
                    class="fa fa-angle-left"
                    style={{
                      fontSize: "27px",
                      color: "#1EBAD6",
                      fontWeight: "bold",
                    }}
                  ></i>
                  <div style={{ marginTop: "-26px" }}>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#1EBAD6",
                        fontWeight: "bold",
                        marginLeft: "17px",
                      }}
                    >
                      Back
                    </span>
                  </div>
                </Link>
              </Colxx>
              <Colxx xxs="12" lg="7" md="7">
                <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Engage Learning Center
                </h2>
              </Colxx>
            </Row>

            <Row>
              <Colxx xxs="12">
                <Separator className="mb-5" />
              </Colxx>
            </Row>

            <Row className="mb-4">
              <Colxx xxs="12" md="8" sm="8" lg="8">
                {this.getEngageVideo()}
              </Colxx>
            </Row>
            <Row>{this.getEngageVideoTitle()}</Row>
            <br></br>
            <br></br>
            <Row>
              <Colxx xxs="12">
                <Separator className="mb-5" />
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <h2 style={{ fontWeight: "bold", color: "#3B3A4A" }}>
                  Comments
                </h2>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="3" md="1" lg="1" sm="1">
                {this.getCurrentUserImage()}
              </Colxx>
              <Colxx xxs="9" sm="6" md="6" lg="6">
                <Field
                  style={{ borderRadius: "0.40rem", marginTop: "13px" }}
                  name="commenttext"
                  className="form-control"
                  component={renderTextField}
                  rows={8}
                  type="text"
                  placeholder="Add a comment"
                  required="required"
                />
              </Colxx>
              <Colxx xxs="12" md="3" lg="3" sm="3">
                <div style={{ marginTop: "15px", float: "right" }}>
                  <Button
                    outline
                    className="mb-2"
                    color="primary"
                    type="submit"
                    onSubmit={this.submit}
                    disabled={pristine || submitting}
                  >
                    Comment
                  </Button>
                </div>
              </Colxx>
            </Row>
            <br></br>

            {this.getEngageVideoComments()}
          </Fragment>
        </form>
      </div>
    );
  }
}

const validations = {
  required: {
    fields: ["Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

managerEngageVideoCommentForm = reduxForm({
  form: "managerEngageVideoCommentForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(managerEngageVideoCommentForm);

//const selector = formValueSelector("managerEngageVideoCommentForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
  engageVideoDetail: state.engageReducer.engageVideoDetail,
  videoCommentList: state.engageReducer.videoCommentList,
  videoCommentCount: state.engageReducer.videoCommentCount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getEngageVideoDetails: (params) => {
      dispatch(getEngageVideoDetails(params));
    },
    getEngageVideoCommentsList: (params) => {
      dispatch(getEngageVideoCommentsList(params));
    },

    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(managerEngageVideoCommentForm);
