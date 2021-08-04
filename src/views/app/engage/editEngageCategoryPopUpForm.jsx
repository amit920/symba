import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import {
    renderTextField,
    validate,
} from "../../util/form-fields";
import {
    Row,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Colxx } from "../../../components/common/CustomBootstrap";

class editEngageCategoryPopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() { }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!nextProps.dirty) {
            this.handelInitialValues(nextProps.engagecategoryData);
        }
    }
    handelInitialValues = (enageeditobjvalue) => {
        const engageCategoryInitialObj = {
            categoryname: enageeditobjvalue.categoryname,
            Categoryid: enageeditobjvalue.categoryId
        };
        this.props.initialize(engageCategoryInitialObj);
    };
    handleSelectChange = (value) => {
        this.setState({ value });
    };
    render() {
        //const { fileType, handleSubmit } = this.props;
        const { handleSubmit } = this.props;
        return (
            <Modal open={this.props.modalStatus} onClose={this.props.onRequestClose} center >
                <div style={{ "width": '350px', "height": '250PX' }}>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>
                            <h2>Edit Engage Category <br />
                            </h2>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container-fluid">
                                <Row style={{ marginTop: '5px' }}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Category Name </label>
                                        <Field name="categoryname"
                                            className="form-control"
                                            component={renderTextField}
                                            rows={8} type="text"
                                            placeholder='Enter Category Name'
                                            required />
                                    </Colxx>
                                </Row>
                                <br />
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
                        </ModalFooter>
                    </form>
                </div>
            </Modal>

        );
    }
}
const validations = {
};
editEngageCategoryPopUpForm = reduxForm({
    form: "editEngageCategoryPopUpForm", // a unique identifier for this form
    validate: (values) => {
        return validate(values, validations);
    },
})(editEngageCategoryPopUpForm);
const selector = formValueSelector("editEngageCategoryPopUpForm"); // <-- same as form name
const mapStateToProps = (state) => ({
    fileType: selector(state, "Type"),
});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(editEngageCategoryPopUpForm);
