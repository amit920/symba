
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { renderTextField, validate } from '../../util/form-fields';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, 
         ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {getorganizationList_for_Orgddl} from '../../../action/organizations/organization';
import {getOrgFeaturesDetails} from '../../../action/features/features';
/* eslint-disable */

class addOrgEngageCategoryPopUpForm extends React.Component {

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

    componentWillUnmount() {

    }

    // handelInitialValues = () => {
    //     const projectInitialObj = { 
    //         "Type": 'File',          
    //         "organizationname": '',
    //         "doclinkdata": '',
    //         "orgcommunityquote":'',
           
    //     }
    //     this.props.initialize(projectInitialObj)
    // }

    // handleSelectChange = (value) => {
    //     console.log('You\'ve selected:', value);
    //     this.setState({ value });
    // }

    
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
                <div style={{"width": '400px' , "height": '320px'}}>
                    <form  onSubmit={handleSubmit}>
                        <ModalHeader>
                        <h2>Add New Org Engage <br/>  
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
                                        <label className='required'>Category Name </label>
                                            <Field name="categoryname" 
                                            className="form-control" 
                                            component={renderTextField} 
                                            rows={8} type="text" 
                                            placeholder='Enter Category Name' 
                                            required='required'  />                                                                                        
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

addOrgEngageCategoryPopUpForm = reduxForm({
    form: 'addOrgEngageCategoryPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(addOrgEngageCategoryPopUpForm);

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser,
    organizationList: state.organizationReducer.organizationList,
    
});

const mapDispatchToProps = (dispatch) => ({
    getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
    getOrgFeaturesDetails: (orgfeaturesId) => { dispatch(getOrgFeaturesDetails(orgfeaturesId)) },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(addOrgEngageCategoryPopUpForm);;
