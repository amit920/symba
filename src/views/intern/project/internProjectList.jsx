import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  CardSubtitle,
  // CardImg,
  CardText,
  // Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";

// import classnames from "classnames";

import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
// import IntlMessages from "../../../helpers/IntlMessages";
// import {
//   Field,
//   reduxForm,
//   FieldArray,
//   formValueSelector,
//   reset,
// } from "redux-form";
import { formatDateTime } from "../../../utils/globalFunctions";
import { connect } from "react-redux";
import {
  // addProject,
  getInternProjectList,
} from "../../../../src/action/projects/projects";

class internProjectListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // addProjectModal:false,
      formError: [],
    };
  }

  componentDidMount() {
    // var query_params = this.props.router.location.query;

    var queryObj = {
      orgid: this.props.currentUser.organization.id,
      user_id: this.props.currentUser.UserId,
      // limit_start: 0,
      // limit_size: constants.DEFAULT_LIMIT_SIZE,
      // supervisor_id: this.state.superVisorid,
      // sort_dir: this.state.sort_dir,
      // sort_type: this.state.sort_type
    };

    // if(query_params.intern_id){
    //     this.setState({userId: query_params.intern_id});
    //     queryObj.user_id = query_params.intern_id;
    // }

    this.props.getInternProjectList(queryObj);
  }
  handleYourProjectTextSearchChange = (event) => {
    this.setState({ searchText: event.target.value }, function () {
      this.props.getInternProjectList({
        orgid: this.props.currentUser.organization.id,
        search_text: this.state.searchText,
        user_id: this.props.currentUser.UserId,
      });
    });
  };
  // submit = values => {

  //   values.createdby = this.props.currentUser.UserId
  //   values.org=this.props.currentUser.organization.id
  //   this.props.addProject(  values,this.closeProjectSubmissionModal);
  // }

  setFormError = (errors) => {
    this.setState({ formError: errors });
  };
  renderProjectList = () => {
    let table = [];

    if (this.props.internProjectList) {
      if (this.props.internProjectCount > 0) {
        let Title = [];

        for (let i = 0; i < this.props.internProjectCount; i++) {
          Title.push(
            <Colxx md="6" sm="6" lg="3" xxs="12">
              {
                <Card>
                  <Card
                    style={{
                      background: "#03CBAE",
                      height: "6px",
                      marginTop: "-6px",
                    }}
                  ></Card>
                  <CardBody style={{ padding: "0.5rem" }}>
                    <Row>
                      <Colxx xxs="2" md="2" sm="2" lg="2" xl="2">
                        <img
                          style={{ width: "50px" }}
                          src="/assets/img/project_card_icon.png"
                          alt="project_card_icon"
                        ></img>
                      </Colxx>
                      <Colxx xxs="10" md="10" sm="10" lg="10">
                        <NavLink
                          to={
                            "/internapp/project/projectsubmission/" +
                            this.props.internProjectList[i].ProjectId
                          }
                        >
                          <CardSubtitle
                            style={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              marginLeft: "20px",
                              marginTop: "4px",
                            }}
                            className="truncate mb-1"
                          >
                            {this.props.internProjectList[i].Name}
                          </CardSubtitle>
                        </NavLink>
                        <CardText
                          style={{
                            fontSize: "13px",
                            marginLeft: "20px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Due{" "}
                          {formatDateTime(
                            this.props.internProjectList[i].DueDate
                          )}
                        </CardText>
                        <CardText
                          style={{
                            fontSize: "15px",

                            marginTop: "35px",
                          }}
                          className="text-muted text-small mb-2"
                        >
                          Created By {this.props.internProjectList[i].CreatedBy}
                        </CardText>
                      </Colxx>
                    </Row>
                  </CardBody>
                </Card>

                //  <NavLink
                //     to={
                //       "/internapp/project/projectsubmission/" +
                //       this.props.internProjectList[i].ProjectId
                //     }
                //   >
                //     <Card className="d-flex flex-row mb-4">
                //       <div className=" d-flex flex-grow-1 min-width-zero">
                //         <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                //           <div className="min-width-zero">
                //             <NavLink
                //               to={
                //                 "/internapp/project/projectsubmission/" +
                //                 this.props.internProjectList[i].ProjectId
                //               }
                //             >
                //               <CardSubtitle
                //                 style={{
                //                   fontSize: "16px",
                //                   fontWeight: "bold",
                //                   marginLeft: "20px",
                //                 }}
                //                 className="truncate mb-1"
                //               >
                //                 {this.props.internProjectList[i].Name}
                //               </CardSubtitle>
                //             </NavLink>
                //             <CardText
                //               style={{
                //                 fontSize: "15px",
                //                 marginLeft: "20px",
                //                 marginTop: "19px",
                //               }}
                //               className="text-muted text-small mb-2"
                //             >
                //               Due {this.props.internProjectList[i].DueDate}
                //             </CardText>
                //             <CardText
                //               style={{
                //                 fontSize: "15px",
                //                 marginLeft: "20px",
                //                 marginTop: "19px",
                //               }}
                //               className="text-muted text-small mb-2"
                //             ></CardText>
                //             <CardText
                //             style={{
                //               fontSize: "15px",
                //               marginLeft: "20px",
                //               marginTop: "19px",
                //             }}
                //             className="text-muted text-small mb-2"
                //           >
                //            Created By {this.props.internProjectList[i].CreatedBy}
                //           </CardText>

                //           </div>
                //         </CardBody>
                //       </div>
                //     </Card>
                //   </NavLink>
              }
              <br></br>
            </Colxx>
          );
        }
        table.push(<Row>{Title}</Row>);
      }
    }
    return table;
  };
  render() {
    return (
      <div>
        <Fragment>
          <Row>
            <Colxx xxs="12">
              <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
                Project Board
              </h1>
              <Separator className="mb-5" />
            </Colxx>
            <Colxx xxs="12" md="10" sm="10" lg="10" xl="10">
              <div className="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input
                  onChange={this.handleYourProjectTextSearchChange}
                  name="yoursearchKeyword"
                  id="yoursearchKeyword"
                  className="form-control"
                  // className="edityourproject"
                  placeholder="Search for projects here (project name, owner)"
                />
                {/* <span className="search-icon">
                          <i className="simple-icon-magnifier" />
                        </span> */}
              </div>
            </Colxx>
          </Row>
          <br></br>

          {this.renderProjectList()}
        </Fragment>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
    internProjectList: state.projectReducer.internProjectList,
    internProjectCount: state.projectReducer.internProjectCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInternProjectList: (filterObj) => {
      dispatch(getInternProjectList(filterObj));
    },

    dispatch: dispatch,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internProjectListForm);
