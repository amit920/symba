import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import Select from 'react-select';
import { connect } from 'react-redux';
import { renderTextField, 
         validate } from '../../util/form-fields';
// import * as constants from '../../../utils/constants';
// import axios from 'axios';
// import { getAPIURL } from '../../../utils/getApiUrl';
// import { setAuthToken } from '../../../utils/setAuthToken';
// import { getBase64 } from '../../../utils/globalFunctions';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, 
         ModalBody, ModalFooter, FormGroup,Label } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {getorganizationList_for_Orgddl} from '../../../action/organizations/organization';
// import {getOrgFeaturesDetails} from '../../../action/features/features';
import {getBioQuestionDetails} from '../../../action/bioquestion/bioquestion'
/* eslint-disable */


class addBioQuestionPopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        // this.handelInitialValues();
        this.props.getorganizationList_for_Orgddl({})
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //this.handelInitialValues();
    }

    componentWillUnmount() {}

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
                <div style={{width:'420px', height:'430px'}}>
                    <form  onSubmit={handleSubmit}>
                        <ModalHeader>
                        <h2>Add New Bio Question <br/>  
                            </h2>
                        </ModalHeader>

                        <ModalBody>
                            <div className="container-fluid">
                                <Row>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <Label className='required'>Organization</Label>                            
                                                <Field name="organization" 
                                                className="form-control"  
                                                placeholder="Select Organization" 
                                                component="select" required='required'>
                                                <option value='0'>Select Organization ...</option>
                                                { oOptions }
                                                </Field>                            
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row>
                                <Colxx xxs="12" sm="12" md="12">
                      <FormGroup>
                            <label className='required'>Question Text </label>
                            <Field name="questiontext" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter questiontext name' required='required'  />
                            </FormGroup>
                            </Colxx>
                                </Row>
                                <Row>
                                <Colxx xxs="12" sm="12" md="12">
                      <FormGroup>
                            <label className='required'>UserType</label>
                            <Field name="usertype_id" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter usertype id' required='required'  />
                            </FormGroup>
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
        fields: ['']
    },
};

addBioQuestionPopUpForm = reduxForm({
    form: 'addBioQuestionPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(addBioQuestionPopUpForm);

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser,
    organizationList: state.organizationReducer.organizationList,    
});

const mapDispatchToProps = (dispatch) => ({
    getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
    getBioQuestionDetails: (Questionmasterid) => { dispatch(getBioQuestionDetails(Questionmasterid)) },
});

export default connect( mapStateToProps, mapDispatchToProps)(addBioQuestionPopUpForm);;
