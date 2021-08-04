
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { validate } from '../../util/form-fields';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {getorganizationList_for_Orgddl} from '../../../action/organizations/organization';
import {getOrgFeaturesDetails} from '../../../action/features/features';
/* eslint-disable */

class addOrgFeaturesPopUpForm extends React.Component {
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
                <div style={{"width": '450px' , "height": '680px'}}>
                    <form  onSubmit={handleSubmit}>
                        <ModalHeader>
                        <h2>Add New Org Features <br/>  
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

                                <Row style={{marginTop:'5px'}}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Launchpad </label>
                                            <Field name="launchpad" className="form-control" component="select">
                                                <option value='null'>Select</option>                                  
                                                <option value='True'>True</option>
                                                <option value='False'>False</option>      
                                            </Field>
                                    </Colxx>                           
                                </Row>

                                <Row style={{marginTop:'15px'}}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Engage </label>
                                            <Field name="engage" className="form-control" component="select">
                                                <option value='null'>Select</option>                                  
                                                <option value='True'>True</option>
                                                <option value='False'>False</option>      
                                            </Field>
                                    </Colxx>   
                                </Row>

                                <Row style={{marginTop:'15px'}}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Community </label>
                                            <Field name="community" className="form-control" component="select">
                                                <option value='null'>Select</option>                                  
                                                <option value='True'>True</option>
                                                <option value='False'>False</option>      
                                            </Field>
                                    </Colxx>   
                                </Row>

                                <Row style={{marginTop:'15px'}}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Projects </label>
                                            <Field name="projects" className="form-control" component="select">
                                                <option value='null'>Select</option>                                  
                                                <option value='True'>True</option>
                                                <option value='False'>False</option>      
                                            </Field>
                                    </Colxx>   
                                </Row>

                                <Row style={{marginTop:'15px'}}>
                                    <Colxx xxs="12" sm="12" md="12">
                                        <label className='required'>Feedback </label>
                                            <Field name="feedback" className="form-control" component="select">
                                                <option value='null'>Select</option>                                  
                                                <option value='True'>True</option>
                                                <option value='False'>False</option>      
                                            </Field>
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

addOrgFeaturesPopUpForm = reduxForm({
    form: 'addOrgFeaturesPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(addOrgFeaturesPopUpForm);

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser,
    organizationList: state.organizationReducer.organizationList,    
});

const mapDispatchToProps = (dispatch) => ({
    getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
    getOrgFeaturesDetails: (orgfeaturesId) => { dispatch(getOrgFeaturesDetails(orgfeaturesId)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(addOrgFeaturesPopUpForm);;
