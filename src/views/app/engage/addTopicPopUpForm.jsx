import React from "react";
import { reduxForm, formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";
import { renderTextArea, validate } from "../../util/form-fields";
// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Row, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";
// const editorStyleObject = {
//   padding: "6px 5px 0",
//   borderRadius: "2px",
//   border: "1px solid #F1F1F1",
//   marginBottom: "5px",
//   height: "200px",
// };
class addTopicPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars_left: 500,
      max_chars: 500,
      // editorState: EditorState.createEmpty(),
      // topictext: "",
    };
  }
  componentDidMount() {
    this.handelInitialValues();
  }
  handelInitialValues = () => {
    const feedbackInitialObj = {
      topic: "",
    };
    this.props.initialize(feedbackInitialObj);
  };

  handleWordCount = (event) => {
    const charCount = event.target.value.length;
    const maxChar = this.state.max_chars;
    const charLength = maxChar - charCount;
    this.setState({ chars_left: charLength });
    if (charLength === 0) {
      alert(`Sorry, you've exceeded your limit of ${maxChar}`);
    }
  };
  // onEditorStateChange = (editorState) => {
  //   draftToHtml(convertToRaw(editorState.getCurrentContent()));
  //    const charCount = editorState.getCurrentContent().getPlainText("").length;
  //    const maxChar = this.state.max_chars;
  //    const charLength = maxChar - charCount;
  //    this.setState({ chars_left: charLength });
  //   if (charLength >= 0) {
  //     this.setState({
  //       editorState,
  //     });
  //   } else {
  //     alert(`Sorry, you've exceeded your limit of ${maxChar}`);
  //   }

  //   let topic_values = draftToHtml(
  //     convertToRaw(editorState.getCurrentContent())
  //   );
  //   this.setState({
  //     topictext: topic_values,
  //   });
  // };
  render() {
    //const { fileType, handleSubmit } = this.props;
    const { handleSubmit } = this.props;
    // const { editorState } = this.state;
    return (
      <Modal
        open={this.props.modalStatus}
        onClose={this.props.onRequestClose}
        center
      >
        <div>
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h2>
                Add your topic here
                <br />
                <h6>
                  Share your topic here to connect with your community, ask and
                  answer questions, and get the latest updates.
                </h6>
              </h2>
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <Row>
                  <Colxx xxs="12" sm="12" md="12">
                    <label className="required topicmar ">Topic </label>
                    {/* <div>
                      <Editor
                        name="topictext"
                        editorState={editorState}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        editorStyle={editorStyleObject}
                        onEditorStateChange={this.onEditorStateChange}                        
                        component={renderTextArea}                        
                        toolbar={{
                          options: ["inline", "blockType", "fontSize", "list"],                       
                          list: {                           
                            options:['unordered', 'ordered'],
                          },
                        }}
                      />
                    </div> */}
                    <Field
                      name="topictext"
                      className="form-control"
                      component={renderTextArea}
                      type="text"
                      rows="3"
                      placeholder="Please share your topic here"
                      required="required"
                      maxLength="500"
                      onChange={this.handleWordCount}
                    />
                    <p style={{ fontSize: "0.70rem", marginTop: "2px" }}>
                      Characters Left: {this.state.chars_left}
                    </p>
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
                Submit
              </Button>
              {/* {this.state.chars_left !== 500 ? (
                <Button
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  // onClick={this.props.sendTopic(this.state.topictext)}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled={true}
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  // onClick={this.props.sendTopic(this.state.topictext)}
                >
                  Submit
                </Button>
              )} */}
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
addTopicPopUpForm = reduxForm({
  form: "addTopicPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(addTopicPopUpForm);
const selector = formValueSelector("addTopicPopUpForm"); // <-- same as form name
const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(addTopicPopUpForm);
