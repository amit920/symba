import React from "react";
// import {
//   AvForm,
//   AvField,
//   AvGroup,
//   AvInput,
//   AvFeedback,
//   AvRadioGroup,
//   AvRadio,
//   AvCheckboxGroup,
//   AvCheckbox,
// } from "availity-reactstrap-validation";
// import IntlMessages from "../../../helpers/IntlMessages";
import { reduxForm, formValueSelector } from "redux-form";
// import Select from "react-select";
import { connect } from "react-redux";
import {
  // renderTextField,
  // renderTextArea,
  // renderDateField,
  validate,
  // renderSelectField,
  // ComboField,
  // renderMultiSelectField,
  // fileInput,
} from "../../util/form-fields";
// import * as constants from "../../../utils/constants";
import {
  Row,
  // Card,
  // CardBody,
  // CardTitle,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // FormGroup,
  // Input,
  // Label,
} from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { getInterests } from "../../../action/master/masterData";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
//import { addUserInterests } from "../../../action/profile/profile";
//import { NotificationManager } from "../../../components/common/react-notifications";

class AlumniInterestsPopupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInterests: [],
    };
  }

  componentDidMount() {
    // this.handelInitialValues();
    this.props.getInterests();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.handelInitialValues();
  }

  componentWillUnmount() {}

  handelInitialValues = () => {
    const feedbackInitialObj = {
      interests_array: this.state.selectedInterests,
    };
    this.props.initialize(feedbackInitialObj);
  };

  getAutocomplateInterests = (e) => {
    this.setState({ value: e.target.value });
  };

  onTagsChange = (event, values) => {
    this.setState({
      selectedInterests: [
        ...this.state.selectedInterests,
        {
          name: values,
        },
      ],
    });
  };

  handleDeleteInterests = (e, i) => {
    var items = this.state.selectedInterests;
    const filteredItems = items
      .slice(0, i)
      .concat(items.slice(i + 1, items.length));
    this.setState({ selectedInterests: filteredItems });
  };
  // handleAddInterestsClick = () => {
  //   if (this.state.selectedInterests === "") {
  //     NotificationManager.error(
  //       "Please select any Interest",
  //       "Error",
  //       3000,
  //       null,
  //       null,
  //       ""
  //     );
  //   } else {
  //     var addInterestsobj = {
  //       userId: this.props.currentUser.UserId,
  //       interestsarry: this.state.selectedInterests,
  //       createdby: this.props.currentUser.UserId,
  //       org: this.props.currentUser.organization.id,
  //     };
  //     this.props.addUserInterests(addInterestsobj);
  //   }
  // };

  renderInterests = () => {
    let table = [];

    if (this.state.selectedInterests) {
      let children = [];
      for (let i = 0; i < this.state.selectedInterests.length; i++) {
        if (this.state.selectedInterests[i].name.Interests === "") {
        } else {
          children.push(
            <Colxx xxs="6" md="6" sm="6" lg="5">
              {
                <div>
                  <div
                    style={{
                      backgroundColor: "#17B298",
                      height: "30px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        marginLeft: "2px",
                        color: "white",
                      }}
                    >
                      {this.state.selectedInterests[i].name.Interests}
                    </span>
                    <i
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this Interest?"
                          )
                        ) {
                          this.handleDeleteInterests(
                            this.state.selectedInterests[i].name.Interests,
                            i
                          );
                        }
                      }}
                      style={{
                        float: "right",
                        color: "white",
                        marginTop: "2px",
                        marginRight: "5px",
                        fontSize: "18px",
                      }}
                      class="fa fa-times-circle-o"
                      aria-hidden="true"
                    ></i>
                  </div>
                  <br></br>
                </div>
              }
            </Colxx>
          );
        }
      }

      table.push(<Row>{children}</Row>);
    }

    return table;
  };
  sendBackData = () => {
    this.props.parentCallback(this.state.selectedInterests);
  };

  render() {
    //const { fileType, handleSubmit } = this.props;
    const { handleSubmit } = this.props;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h2>Add some interests that relate to your expertise here! </h2>
              <span style={{ fontSize: "15px" }}>
                Choose as many as you'd like. You can always add more later.
              </span>
            </ModalHeader>

            <ModalBody>
              <div>
                <div className="container-fluid">
                  <Row>
                    <Colxx
                      xxs="12"
                      sm="12"
                      md="12"
                      className="add_skill_interest_popup"
                    >
                      {/* <label className='required'>Recipient Email </label> */}
                      <div>
                        <Autocomplete
                          id="combo-box-demo"
                          options={this.props.interestsList}
                          getOptionLabel={(option) => option.Interests}
                          style={{ width: "100%" }}
                          disableClearable="true"
                          onChange={this.onTagsChange}
                          searchText={this.state.searchText}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Interests"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </Colxx>
                  </Row>
                  <br></br>
                  {this.renderInterests()}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <a
                style={{ color: "#17B298" }} //"#17A2B8"
                className="cancle"
                onClick={this.props.onRequestClose}
                href={() => false}
              >
                Cancel
              </a>

              <Button
                color="primary"
                type="submit"
                //onClick={this.handleAddInterestsClick}
                onClick={this.sendBackData}
                className="mb-2"
              >
                Submit
              </Button>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    );
  }
}

const validations = {
  required: {
    fields: ["file_title", "file_description", "Type"],
  },
  urls: {
    fields: ["doclinkdata"],
  },
};

AlumniInterestsPopupForm = reduxForm({
  form: "AlumniInterestsPopupForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(AlumniInterestsPopupForm);

const selector = formValueSelector("AlumniInterestsPopupForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  interestsList: state.masterReducer.interestsList,
  interestsCount: state.masterReducer.interestsCount,
});

const mapDispatchToProps = (dispatch) => ({
  getInterests: () => {
    dispatch(getInterests());
  },
  // addUserInterests: (params) => {
  //   dispatch(addUserInterests(params));
  // },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlumniInterestsPopupForm);
