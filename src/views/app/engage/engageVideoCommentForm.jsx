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
  reset,
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
  updateEngageVideodetail,
} from "../../../action/engage/engage";
import EditEngageVideoPopUpForm from "../engage/editEngageVideoPopUpForm";

// import * as constants from "../../../utils/constants";
// import axiosInstance from "../../../utils/axiosApi";
// import { getAPIURL } from "../../../utils/getApiUrl";
import ReactPlayer from "react-player";
// import EngageReducer from "../../../reducers/engage_reducer";

class engageVideoCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      isEditForm: false,
      isNewForm: false,
      addNewOverviewResourcesModal: false,
      editOverviewResourcesModal: false,
      currentEngageData: {},
      editEngageVideoModal: false,
    };
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

  handelInitialValues = (OverviewObj) => {
    const overviewObj = {
      commenttext: "",
    };
    this.props.initialize(overviewObj);
  };
  handleEditEngageData = async () => {
    const currentEngageData = {
      EngageVideoId: this.props.EngageVideoId,
      engagecategoryid: this.props.EnageCategoryId,
      orgid: this.props.organizationId,
      EngageVideoTitle: this.props.engageVideoDetail.EngageVideoTitle,
      EngageVideoDescription:
        this.props.engageVideoDetail.EngageVideoDescription,
      EngageVideoUrl: this.props.engageVideoDetail.EngageVideoUrl,
    };
    await this.setState({
      editEngageVideoModal: true,
      currentEngageData: currentEngageData,
    });
    console.log(this.state.currentEngageData);
  };

  closeEditSubmissionModal = () => {
    this.props.dispatch(reset("editEngageVideoPopUpForm"));
    this.setState({ editEngageVideoModal: false });
  };
  submitUpdate = (values) => {
    values.createby = this.props.currentUser.UserId;
    // values.departmentid=this.props.deptId
    this.props.updateEngageVideodetail(
      this.props.currentUser.organization.id,
      values,
      this.closeEditSubmissionModal
    );
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

  getEngageVideo = () => {
    let div = [];

    if (this.props.engageVideoDetail) {
      let Container = [];
      let Row = [];

      if (this.props.engageVideoDetail.EngageVideoUrl != null) {
        Row.push(
          // <div>
          //   {
          //     <ReactPlayer
          //       url={this.props.engageVideoDetail.EngageVideoUrl}
          //       playing
          //       controls={true}
          //     />
          //   }
          // </div>

          <div class="Engagevideo_rplayer_learningcenter">
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
              <div>
                <div style={{ marginTop: "-20px" }}>
                  <h2
                    style={{
                      fontWeight: "bold",
                      color: "#3B3A4A",
                      fontSize: "22px",
                      marginBottom: "0px",
                      marginLeft: "0%",
                    }}
                  >
                    {this.props.engageVideoDetail.EngageVideoTitle}{" "}
                    <div class="Engagevideo_edit">
                      <span onClick={() => this.handleEditEngageData()}>
                        Edit
                      </span>
                    </div>
                  </h2>
                  <span>
                    {" "}
                    {new Intl.DateTimeFormat("us-GB", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    }).format(
                      new Date(this.props.engageVideoDetail.CreateDate)
                    )}
                  </span>
                </div>
              </div>
            }
          </Colxx>
        );
      }
      if (this.props.engageVideoDetail.EngageVideoDescription != null) {
        Row1.push(
          <Colxx xxs="12" md="12" sm="12" lg="12">
            {
              <span
                style={{ color: "#3B3A4A", fontSize: "17px", marginLeft: "0%" }}
              >
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
              <Colxx xxs="2" md="1" lg="1" xl="1">
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
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div className="project-form">
        <form onSubmit={handleSubmit}>
          <Fragment>
            <Row>
              <Colxx xxs="3" lg="2" md="2">
                <Link to="/app/engage/list">
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
              <Colxx xxs="8" lg="7" md="7">
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
              <Colxx xxs="9" md="6" lg="6" sm="6">
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
          <EditEngageVideoPopUpForm
            onSubmit={this.submitUpdate}
            dispatch={this.props.dispatch}
            onRequestClose={this.closeEditSubmissionModal}
            modalStatus={this.state.editEngageVideoModal}
            currentUser={this.props.currentUser}
            engageVideoData={this.state.currentEngageData}
          />
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

engageVideoCommentForm = reduxForm({
  form: "engageVideoCommentForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(engageVideoCommentForm);

//const selector = formValueSelector("engageVideoCommentForm"); // <-- same as form name

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
    updateEngageVideodetail: (ordId, params, callback) => {
      dispatch(updateEngageVideodetail(ordId, params, callback));
    },
    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(engageVideoCommentForm);
