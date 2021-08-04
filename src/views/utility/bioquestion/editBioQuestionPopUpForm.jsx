
import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import Select from 'react-select';
import { connect } from 'react-redux';
import { renderTextField, validate } from '../../util/form-fields';
// import * as constants from '../../../utils/constants';
// import axios from 'axios';
// import { getAPIURL } from '../../../utils/getApiUrl';
// import { setAuthToken } from '../../../utils/setAuthToken';
// import { getBase64 } from '../../../utils/globalFunctions';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
/* eslint-disable */


class EditBioQuestionPopUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
        }
    }

    componentDidMount() {
        // this.handelInitialValues();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    //    console.log(nextProps.bioq)
        if (!nextProps.dirty) {
            this.handelInitialValues(nextProps.bioq);
        }
    }

    componentWillUnmount() {}

    handelInitialValues = (bioObject) => {
        const bioquestInitialObj = {
            "questiontext": bioObject.Questiontext,
            "Questionmasterid": bioObject.Questionmasterid,
            // "organization": bioObject.organization_name,  
            // "orgid": bioObject.organization_id
            
        }
        this.props.initialize(bioquestInitialObj)
    }
    handleSelectChange = (value) => {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    
    render() {
        const { handleSubmit } = this.props
        let oOptions = [];
        if( this.props.organizationList ) {
            this.props.organizationList.map((c) => {
                oOptions.push( <option key= {c.org_id} value={c.org_id} >{c.org_name}</option> );
            });
        }
        
        return (
            <Modal  open={this.props.modalStatus} onClose={this.props.onRequestClose} center >
                <div style={{width:'420px', height:'230px'}}>
                    <form  onSubmit={handleSubmit}>
                    <ModalHeader>
                      <h2>Edit Bio Questions <br/>  
                        </h2>
                </ModalHeader>
                <ModalBody>
                <div className="container-fluid">
                <Row>
                            <Colxx xxs="12" sm="12" md="12">
                            <label className='required'>Question Text </label>
                            <Field name="questiontext" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Question Text' required='required'  />

                            </Colxx>                           
                        </Row>                        
                </div>
    
                </ModalBody>      
                <ModalFooter>
                      <Button color="primary" type="submit">
                      Submit
                      </Button>
                    </ModalFooter>    

                    </form>
                </div>
            </Modal>
        )
    }
}

const validations = {
    required: {
        fields: ['name']
    },
};

EditBioQuestionPopUpForm = reduxForm({
    form: 'EditBioQuestionPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(EditBioQuestionPopUpForm);


const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(EditBioQuestionPopUpForm);
