import React from "react";
import { reduxForm, formValueSelector, Field } from "redux-form";
import { connect } from "react-redux";
import { validate, renderTextArea } from "../../util/form-fields";
import { Row, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import htmlToDraft from "html-to-draftjs";

// const editorStyleObject = {
//   padding: "6px 5px 0",
//   borderRadius: "2px",
//   border: "1px solid #F1F1F1",
//   marginBottom: "5px",
//   height: "200px",
// };
class editTopicPopUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars_left: 500,
      max_chars: 500,
      // editorState: EditorState.createEmpty(),
    };
  }
  componentDidMount() {}
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.dirty) {
      this.handelInitialValues(nextProps.TopicData);
    }
    // if (nextProps.TopicData.Topictext !== undefined) {
    //   const blocksFromHtml = htmlToDraft(nextProps.TopicData.Topictext);
    //   const { contentBlocks, entityMap } = blocksFromHtml;
    //   const contentState = ContentState.createFromBlockArray(
    //     contentBlocks,
    //     entityMap
    //   );
    //   const editorState = EditorState.createWithContent(contentState);
    //   this.setState({
    //     editorState: editorState,
    //   });
    // }
  }

  // this method get Plain text from old topic rich text editor
  getPlainText = (html) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  };
  handelInitialValues = (topicobj) => {
    const topicInitialObj = {
      Topic_text: this.getPlainText(topicobj.Topictext),
      topic_id: topicobj.Topicid,
      Created_on: topicobj.Createdon,
    };
    this.props.initialize(topicInitialObj);
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
  //   const charCount = editorState.getCurrentContent().getPlainText("").length;
  //   const maxChar = this.state.max_chars;
  //   const charLength = maxChar - charCount;
  //   this.setState({ chars_left: charLength });
  //   if (charLength > 0) {
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
            <ModalHeader className="modalhead-modal">
              <h2>Edit your topic here</h2>
            </ModalHeader>
            <ModalBody>
              <div className="container-fluid">
                <Row>
                  <Colxx xxs="12" sm="12" md="12" lg="12">
                    <label className="required topicmar "> Edit Topic </label>
                    {/* <div>
                      <Editor
                        name="Topic_text"
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
                            options: ["unordered", "ordered"],
                          },
                        }}
                      />
                    </div> */}
                    <Field
                      name="Topic_text"
                      className="form-control"
                      component={renderTextArea}
                      type="text"
                      rows="6"
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
                Save
              </Button>
              {/* {this.state.chars_left !== 500 ? (
                <Button
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  onClick={this.props.sendTopic(this.state.topictext)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  disabled={true}
                  color="primary"
                  type="submit"
                  style={{ marginRight: "10px" }}
                  onClick={this.props.sendTopic(this.state.topictext)}
                >
                  Save
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
editTopicPopUpForm = reduxForm({
  form: "editTopicPopUpForm", // a unique identifier for this form
  validate: (values) => {
    return validate(values, validations);
  },
})(editTopicPopUpForm);
const selector = formValueSelector("editTopicPopUpForm"); // <-- same as form name
const mapStateToProps = (state) => ({
  fileType: selector(state, "Type"),
});
const mapDispatchToProps = () => ({});
export default connect(mapStateToProps, mapDispatchToProps)(editTopicPopUpForm);
