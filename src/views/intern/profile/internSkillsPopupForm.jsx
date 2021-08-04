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
import { getSkills } from "../../../action/master/masterData";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
class internSkillsPopupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSkills: [],
    };
  }

  componentDidMount() {
    // this.handelInitialValues();
    this.props.getSkills();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.handelInitialValues();
  }

  componentWillUnmount() {}

  handelInitialValues = () => {
    const feedbackInitialObj = {
      skills_array: this.state.selectedSkills,
    };
    this.props.initialize(feedbackInitialObj);
  };

  getAutocomplateSkill = (e) => {
    this.setState({ value: e.target.value });
  };

  onTagsChange = (event, values) => {
    this.setState({
      selectedSkills: [
        ...this.state.selectedSkills,
        {
          name: values,
        },
      ],
    });
  };

  handleDeleteSkills = (e, i) => {
    var items = this.state.selectedSkills;
    console.log(items);
    const filteredItems = items
      .slice(0, i)
      .concat(items.slice(i + 1, items.length));
    this.setState({ selectedSkills: filteredItems });
  };

  renderSkills = () => {
    let table = [];

    if (this.state.selectedSkills) {
      let children = [];
      for (let i = 0; i < this.state.selectedSkills.length; i++) {
        if (this.state.selectedSkills[i].name.skill === "") {
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
                      {this.state.selectedSkills[i].name.skill}
                    </span>
                    <i
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this skill?"
                          )
                        ) {
                          this.handleDeleteSkills(
                            this.state.selectedSkills[i].name.skill,
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
    this.props.parentSkillsCallback(this.state.selectedSkills);
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
              <h2>Add some skills that relate to your expertise here! </h2>
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
                          options={this.props.skillsList}
                          getOptionLabel={(option) => option.skill}
                          style={{ width: "100%" }}
                          disableClearable="true"
                          onChange={this.onTagsChange}
                          searchText={this.state.searchText}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Skills"
                              variant="outlined"
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </Colxx>
                  </Row>
                  <br></br>
                  {this.renderSkills()}
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
                className="mb-2"
                onClick={this.sendBackData}
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

internSkillsPopupForm = reduxForm({
  form: "internSkillsPopupForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(internSkillsPopupForm);

const selector = formValueSelector("internSkillsPopupForm"); // <-- same as form name

const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
  skillsList: state.masterReducer.skillsList,
  skillsCount: state.masterReducer.skillsCount,
});

const mapDispatchToProps = (dispatch) => ({
  getSkills: () => {
    dispatch(getSkills());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(internSkillsPopupForm);
