import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { validate } from '../../util/form-fields';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
/* eslint-disable */


class EditOrgFeaturesPopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
        }
    }

    componentDidMount() {
        // this.handelInitialValues();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //    console.log(nextProps.features)
        if (!nextProps.dirty) {
            this.handelInitialValues(nextProps.features);
        }
    }

    componentWillUnmount() { }


    handelInitialValues = (featuresObject) => {
 
        const featuresInitialObj = {
            "community": featuresObject.CommunityFeatures,
            "projects": featuresObject.projectsFeatures,
            "feedback": featuresObject.feedbackFeatures,
            "engage": featuresObject.EngageFeatures,
            "launchpad": featuresObject.launchpadFeatures,
            "Featuresid": featuresObject.Featuresid,
            // "organization": featuresObject.organization_name,  
            // "orgid": featuresObject.organization_id
            
        }
        this.props.initialize(featuresInitialObj)
    }
    handleSelectChange = (value) => {
        // console.log('You\'ve selected:', value);
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
                <div style={{"width": '450px' , "height": '580px'}}>
                    <form  onSubmit={handleSubmit}>
                    <ModalHeader>
                      <h2>Edit Org Features List <br/>  
                        </h2>
                </ModalHeader>
                <ModalBody>
                <div className="container-fluid">
                {/* <Row>
                            <Colxx xxs="12" sm="12" md="12">
                            <label className='required'>Community </label>
                            <Field name="community" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Community Name' required='required'  />

                            </Colxx>
                           
                        </Row> */}

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

EditOrgFeaturesPopUpForm = reduxForm({
    form: 'EditOrgFeaturesPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(EditOrgFeaturesPopUpForm);

const mapStateToProps = (state) => ({   
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EditOrgFeaturesPopUpForm);;
