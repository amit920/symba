import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { renderTextField, validate } from "../../util/form-fields";
import { Row, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";

class editmanagerCommentPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
      this.handelInitialValues(nextProps.commentsdata);
    }
  }

  handelInitialValues = (commentobj) => {
    const commentsInitialObj = {
      comments: commentobj.TopicComment,
      comment_id: commentobj.CommentId,
      org_id: commentobj.OrgId,
      topic_id: commentobj.TopicId,
    };

    this.props.initialize(commentsInitialObj);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="modalhead-modal">
              <h2>Edit your Comment here</h2>
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    {/* <label className="required"> Edit Comment </label> */}
                    <Field
                      name="comments"
                      className="form-control"
                      component={renderTextField}
                      type="text"
                      required="required"
                      style={{ marginTop: "14px" }}
                    />
                  </Colxx>
                </Row>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                style={{ marginRight: "10px" }}
              >
                Save
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
    fields: ["topictext"],
  },
};
editmanagerCommentPopUpForm = reduxForm({
  form: "editmanagerCommentPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editmanagerCommentPopUpForm);
const selector = formValueSelector("editmanagerCommentPopUpForm"); // <-- same as form name
const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});
const mapDispatchToProps = () => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editmanagerCommentPopUpForm);
