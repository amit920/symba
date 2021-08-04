import React, { Component, Fragment } from "react";
import {Row, Card, Button, CardTitle} from "reactstrap";
import { connect } from "react-redux";
import { userTermcondition_agree } from "../../src/action/user/user";
import { Colxx, Separator } from "../components/common/CustomBootstrap";
import createBrowserHistory from "history/createBrowserHistory";
const browserHistory = createBrowserHistory();

class TermConditionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
  componentDidMount() {  
    if(this.props.currentUser === null)
    {
      browserHistory.push("/error");
      window.location.reload(false);
    } 
    document.body.classList.add("background");
    document.body.classList.add("no-footer");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
    document.body.classList.remove("no-footer");
  }
  termcondition_cancel = () =>{
    browserHistory.push("/");
    window.location.reload(false);
  }
  termcondition_agree = () =>{
  this.props.userTermcondition_agree({
    org:this.props.currentUser.organization.id,
    user_id:  this.props.currentUser.UserId,
    usertermsagree: true,
    termsaccepted_date: new Date()
  })
  ;
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="form-side" style={{ width: "100%" }}>
                  <div style={{textAlign:'center'}}>
                  <h4>Terms and Conditions</h4>

                  </div>
                  <Separator className="mb-5" />
                    <CardTitle className="mb-4">
                      <div style={{height:'300px',overflowY:'auto',fontSize:'14px',textAlign:'justify',paddingRight:'20px'}}>
                        <div style={{textAlign:'center'}}>
                            <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.2px',color:'#000000'}}>
                            TERMS OF USE</span>
                        </div>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.2px',color:'#000000'}}>
                            Last Updated:  January 5, 2021</span>
                        </div>
                         <br></br>
                        <div>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.2px',color:'#000000'}}>
                            Welcome!  Thank you for visiting us.  Please read these Terms of Use (these "<span style={{fontWeight:'bold'}}> Terms</span>") carefully.  
                            These  Terms  are  a  binding  agreement  between  you  and  Symba Inc  ("<span style={{fontWeight:'bold'}}> Symba</span>,"  "<span style={{fontWeight:'bold'}}> the </span>
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.2px',color:'#000000'}}>
                               Company<span style={{fontWeight:'normal'}}> ," "</span> we<span style={{fontWeight:'normal'}}> ," and "</span> us<span style={{fontWeight:'normal'}}> ") and govern your use of the website located at <a style={{textDecoration:'underline'}} href="https://symba.io/">https://symba.io/</a> and </span>
                            </span>
                            any of our other websites, their respective subdomains, and any of our applications containing a
                            link to these Terms (collectively, our "<span style={{fontWeight:'bold'}}> Platform</span> ").
                            </span>
                        </div>    

                        <br></br>
                        <div style={{textAlign:'justify'}}>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.9px',color:'#000000'}}>
                            THESE TERMS SET FORTH THE TERMS AND CONDITIONS ON WHICH YOU MAY ACCESS AND USE OUR PLATFORM.  IF YOU DO NOT AGREE TO THESE TERMS, YOU MAY NOT ACCESS OR USE OUR PLATFORM.</span>
                        </div>
                        <br></br>

                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          ACCEPTANCE OF TERMS</span>
                        </div>
                        <br></br>
                        <div style={{textAlign:'justify'}}>
                          <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          By using or accessing the Platform, or registering for an account to use the Platform, you are stating that you have read and understand, consent to, and agree to be bound by, these Terms. </span>
                        </div>
                        <br></br>
                        <div style={{textAlign:'justify'}} >
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          IMPORTANT NOTICE:   THESE TERMS CONTAIN<span style={{fontWeight:'normal',fontFamily:'Arial',fontSize:'15.0px'}} >
                           </span> VARIOUS LIMITATIONS AND EXCLUSIONS  OF  LIABILITY,  AND  CLASS  ACTION  WAIVER PROHIBITED  BY  LAW,  BY  ENTERING  INTO  THESE  TERMS  YOU  EXPRESSLY
                           AGREE  THAT  DISPUTES  BETWEEN  YOU  AND  THE  COMPANY  WILL  BE RESOLVED  INDIVIDUALLY  BY  A  JUDGE,  AND  YOU  HEREBY  WAIVE  YOUR RIGHT  TO  PARTICIPATE  IN  A  CLASS  ACTION  LAWSUIT  OR  JURY  TRIAL.
                           THESE TERMS ALSO CONTAIN A RELEASE OF CERTAIN CLAIMS AGAINST THE COMPANY AND CERTAIN THIRD PARTIES.
                            </span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          1.   Related Agreements and Policies</span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000',fontStyle:'italic'}}>
                          Privacy Policy.<span style={{fontStyle:'normal'}}>  </span><span style={{fontWeight:'normal',fontStyle:'normal'}}>&nbsp;&nbsp; You agree that we may use any information we
                           obtain about you in accordance with the provisions of our Privacy Policy, which may be found 
                           <span style={{fontWeight:'bold',color:'#007bff'}}><a style={{color:'#007bff'}} href="https://symba.io/privacy-policy/"> here </a></span>(the "<span style={{fontWeight:'bold'}}> Privacy Policy</span>").
                           These Terms incorporate by reference the terms and conditions of the Privacy Policy.  </span></span>
                        </div>
                        <br></br>
                        <div>
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000',fontStyle:'italic'}}>
                                Additional Terms.<span style={{fontStyle:'normal'}}>  
                            </span>
                            <span style={{fontStyle:'normal',fontWeight:'normal'}}>&nbsp;&nbsp;
                             Some of our Platform, or portions thereof, may be subject to additional terms 
                             (&#34;<span style={{fontWeight:'bold'}}> Additional Terms</span> &#34;), which will be described in separate policies posted on the applicable 
                             Platform.  The  Additional  Terms  will  supplement,  and  be  deemed  part  of,  these  Terms  forpurposes of the applicable Platform or portion thereof, and will control over any conflict between
                             the Additional Terms and these Terms with respect to the applicable Platform or portion thereof.
                             </span></span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            2. Modifications</span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontFamily:'Times New Roman',fontSize:'16.8px',color:'#000000'}}>We may update or change any of the terms and conditions contained in these Terms at any time 
                          and in our sole discretion.  If we make material changes to these Terms, we will endeavor to 
                          notify you, such as by sending an email to the email address associated with Your Account,
                          posting a notice on our Platform, or updating the date at the top of these Terms. Unless we say
                          otherwise, the amended Terms will be effective immediately and your continued use of our
                          Platform will confirm your acceptance of the amended Terms. We encourage you to frequently
                          review the Terms to ensure you understand the terms and conditions that apply to your use of our Platform.Except  as  otherwise  provided  in  the  &#34;Changes&#34;  clause  of  Section  17,  if  any 
                          modification  is  unacceptable  to  you,  you  must  terminate  your  use  of  our  Platform.    Your continued use of our Platform following our posting or emailing of a change notice or revised
                          Terms as provided in this section will constitute your binding acceptance of the change. </span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          3. Eligibility </span>
                        </div>
                        <br></br>
                        <div>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            Our Platform is not targeted toward or intended for use by children. By using our Platform,
                             represent and warrant that you are thirteen (13) years of age or older.  If you are under thirteen
                             (13),  you  may  not  use  our  Platform.  You  also  represent  and  warrant  that  you  (a)  have  not
                             previously  been  suspended  or  removed  from  our  Platform;  (b)  do  not  have  more  than  one
                             account on the Platform; and (c) have full right, power and authority to enter into this agreement 
                             and in doing so will not violate any other agreement to which you are a party.
                              </span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          4. Geographic Limitations</span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            Our Platform is hosted from the United States and is not intended to subject us to the Laws (as 
                              defined below) or jurisdiction of any state, country, or territory other than the United States.
                              Although we may use reasonable efforts to accommodate users around the world, we make no
                              claims that the Platform or any Site Content are accessible or appropriate outside of the United
                              States. If you do use any of our Platform outside the United States, you do so on your own 
                              initiative and you are solely responsible for complying with all applicable local, state, federal,
                              national, provincial, foreign, and international statutes, treaties, regulations, rules, orders, and
                              other laws (each, a &#34;<span style={{fontWeight:'bold'}}> Law</span> &#34;) with respect to such use.
                            </span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            5. Accounts and Passwords  </span>
                        </div>
                        <br></br>
                        <div>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            In connection with particular features of our Platform, you may be required or permitted to 
                            establish a Platform account (&#34;<span style={{fontWeight:'bold'}}> Your Account</span> &#34;). By establishing or logging into Your Account,
                            you  represent  and  warrant  that  the  information  you  provide  is  accurate  and  complete  in  all
                            respects, and you agree to keep such information at all times complete, accurate, and up-to-date.
                            You are responsible for maintaining the confidentiality of the credentials for Your Account, and
                            you  are  solely  responsible  for  all  activities  that  occur  under  Your  Account.    You  agree  to
                            promptly notify us if you discover or otherwise suspect any security breaches related to Your
                            Account or our Platform. We reserve the right to require you to alter your password if we believe 
                            that Your Account is no longer secure.
                            </span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                          6. Our Content and Proprietary Rights</span>
                        </div>
                        <br></br>
                        <div >
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              Our  Platform,  including  without  limitation  their  entire  contents,  features,  and  functionality
                              (including but not limited to all information, software, text, displays, images, video, and audio,
                                and the design, selection, and arrangement thereof) (collectively, &#34;<span style={{fontWeight:'bold'}}> Site Content</span> &#34;), are owned by
                                the Company, its licensors, or other providers of such material, and are protected by copyright
                                Laws, international treaty provisions, trademarks, service marks and other intellectual property Laws.
                               </span>
                               <br></br>
                               <br></br>
                               <span style={{fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                               In  addition,  the  Company  name  and  logo,  as  well  as  the  other  names,  logos,  and  materials
                               displayed in or through our Platform constitute trademarks, trade names, service marks, or logos
                               (collectively, the &#34;<span style={{fontWeight:'bold'}}> Marks</span> &#34;) of us, our content providers, or other entities. Ownership of the
                               Marks and the goodwill associated with them remains with us or those other entities. You must
                               not use any Marks without the Company&apos;s prior written permission. 

                               </span>
                               <br></br>
                               <br></br>
                               <span style={{fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000'}}>
                               You must abide by all rights notices, information, or restrictions contained in or attached to any
                               Site Content and must not remove any trademark, copyright, or other notice from our Platform or
                               any Site Content.  Any use of our Platform or Site Content in violation of these Terms is strictly
                               prohibited and will result in automatic termination of your right to use our Platform.  No right,
                               title, or interest in or to our Platform or any Site Content is transferred to you, and all rights not
                               expressly granted are reserved by us.  Any use of our Platform or Site Content not expressly
                               permitted by these Terms is a breach of these Terms and may violate copyright, trademark, and other Laws.
                               </span>
                        </div>
                        <br></br>
                        <div>
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                            7. Third Party Content</span>
                        </div>
                         <br></br>
                         <div >
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                             Under no circumstances will we be liable in any way for any content or materials of any third
                             parties (including users), including, but not limited to, for any errors or omissions in any content,
                             or  for  any  loss  or  damage  of  any  kind  incurred  as  a  result  of  the  use  of  any  such  content
                             (collectively, &#34;<span style={{fontWeight:'bold'}}> Third Party Content</span> &#34;) on the Platform.  We do not control any Third Party
                             Content on the Platform and do not guarantee the availability or display of any Third Party 
                             Content.  We  reserve  the  right  to  remove  any  Third  Party  Content  at  any  time  in  our  sole
                             discretion.  Any opinions, advice, statements, views, positions, services, offers, or other Third
                             Party Content expressed or made available on the Platform are solely those of the respective
                             authors or distributors, and do not necessarily reflect our opinions, views, or position.  We do not
                             endorse any particular products, services or treatments.  We take no responsibility and assume no
                             liability for any Third Party Content.  You use or rely on Third Party Content at your own risk.
                              </span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                            8. Interactive Areas and Your Content</span>
                        </div>
                        <br></br>
                        <div>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            The Platform may feature interactive tools, personal pages, message boards and other public
                            forums  where  users  with  similar  interests  or  medical  conditions  can  share  information  and 
                            engage  with  one  another  (&#34;<span style={{fontWeight:'bold'}}> Interactive </span><span style={{fontWeight:'bold'}}> Areas</span> &#34;).  We  do  not  guarantee  monitoring  or
                            authentication  of  the  information  contained  in  any  such  Interactive  Areas.  By  submitting
                            communications  or  content  to  any  Interactive  Area,  you  agree  that  such  submission  is  non-
                            confidential for all purposes.  You agree that following actions shall constitute a material breach
                            of  these  Terms:  impersonating  another  person  or  entity,  misrepresenting  yourself  or  your
                            credentials, allowing any other person or entity to use your identification for posting or viewing
                            Site Content, posting excessively or &#34;spamming&#34; or &#34;flaming&#34; or &#34;inciting discord&#34; or otherwise
                            engaging in any other conduct that restricts or inhibits any other person from using or enjoying the Interactive Area.                  
                            </span>
                            <br></br>
                            <br></br>
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            If  you  submit  information  or  material  through  any  means  (collectively,  &#34;<span style={{fontWeight:'bold'}}> Your </span><span style={{fontWeight:'bold'}}> Content</span> &#34;)  
                            through our Platform, including in the Interactive Areas, you, to the extent you have any rights in
                            such  information  or  material,  grant  us  a  non-exclusive,  royalty-free,  worldwide,  perpetual,
                            irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate,
                            create derivative works from, distribute, and display Your Content throughout the world in any
                            media. You grant us and our sublicensees the right to use the name, account name, city or zip
                            code, and other biographical information that you submit in connection with Your Content, if we
                            or they choose.  You represent and warrant that: (i) you own or otherwise control all of the rights
                            to the content that you post, including any intellectual property or other proprietary rights other
                            than content that you clearly identify as Third Party Content, e.g., links to third party websites; 
                            (ii) Your Content is accurate; (iii) neither Your Content nor your posting or submission of Your
                            Content violates any of these Terms, including without limitation the prohibitions on use of the
                            Platform set forth above; and (iv) neither Your Content nor your posting or submission of Your
                            Content will cause injury to any person or entity, including any privacy or security risk.  We
                            have no responsibility for any of Your Content or the consequences of your sharing any of Your
                            Content with others.  We reserve the right to investigate and take appropriate legal action against
                            anyone who, in our sole discretion, violates these Terms, including without limitation, removing
                            the offending content from the Platform, suspending or terminating the access of such violators
                            to the Platform and reporting violations to the law enforcement authorities.             
                            </span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                            9. License & Prohibited Conduct</span>
                        </div>
                        <br></br>
                        <div >
                        <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                        These Terms permit you to use our Platform for your own personal, non-commercial use only,
                        and only in a manner that complies with all legal requirements that apply to you or your use of
                        our Platform.  This license is revocable at any time in our sole discretion, and does not include
                        the right to engage in: (a) any resale or commercial use of our Platform or Site Content; (b) the
                        collection and use of any product listings, pictures or descriptions; (c) the copying, reproduction,
                        distribution, public performance or public display of any Site Content or portion thereof; (d)
                        reverse engineering, modifying or otherwise making any derivative uses of any portion of our
                        Platform or Site Content; (e) use of any bot, crawler, harvester, indexer, robot, spider, scraper, or
                        any  other  automated  means  to  access,  compile,  read,  or  gather  content  from  our  Platform
                        automatically (except that we grant the operators of public search engines revocable permission
                        to use spiders to copy materials from the Platform for the sole purpose of and solely to the extent
                        necessary for creating publicly available searchable indices of the materials, but not caches or
                        archives of such materials); (f) downloading (other than page caching) of any portion of our
                        Platform, Site Content or any information contained therein, except as expressly permitted on
                        our Platform or pursuant to separate terms; or (g) any use of our Platform or Site Content other
                        than for their intended purposes.
                        </span>
                        <br></br>
                        <br></br>
                        <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                        Use of our Platform for any illegal purpose, or any other purpose not expressly permitted in these
                        Terms,  is  strictly  prohibited.  Without  limitation,  you  will  not:  (a) use  our  Platform  or  Site
                        Content in violation of these Terms or any Law; (b) post any material that is illegal, abusive,
                        tortious,  misleading,  fraudulent,  deceptive,  defamatory,  discriminatory,  obscene,  sexually
                        explicit, libelous, violative, infringing, or invasive of another&#146;s privacy, hateful, threatening, or
                        otherwise objectionable, or that may harass or harm another individual or entity, or that may
                        exposes  us  to  legal  liability;  (c) transmit,  display,  share,  post,  or  otherwise  distribute  any
                        unsolicited  or  unauthorized  advertising,  promotional  materials,  sweepstakes,  &#34;junk  mail,&#34;
                        &#34;spam,&#34; &#34;chain letters,&#34; &#34;pyramid schemes,&#34; or any similar form of solicitation; (d) transmit or
                        make available any material that contains adware, malware, spyware, software viruses, or any
                        other  harmful  code;  (e) impersonate  any  person  or  entity,  or  otherwise  misrepresent  your
                        affiliation with a person or entity or give the impression that they emanate from or are endorsed
                        by us or any other person or entity, if that is not the case; (f) interfere with or disrupt any of our
                        Platform or any networks used by us; (g) post any material that infringes, misappropriates, or
                        otherwise violates the intellectual property or other rights of a third party, or that represents
                        confidential  business  or  personal  information  of  a  third  party;  (h)  use  our  Platform  for
                        benchmarking,  or  to  compile  information  for  a  product  or  service;  or  (i)  solicit  personal  or
                        sensitive information from other users.
                        </span>
                        <br></br>
                        <br></br>
                        <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                        By using our Platform, you agree to abide by all security and safety measures established by us
                        or  our  licensors,  partners,  or  service  providers.  You  agree  not  to  circumvent,  disable,  or
                        otherwise  interfere  with  security-related  features  of  our  Platform  or  features  that  prevent  or
                        restrict use or copying of any content or enforce limitations on use of our Platform or Site
                        Content.
                        </span>
                        </div>
                        <br></br>
                        <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                            10. No Warranties </span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            YOU  UNDERSTAND  AND  AGREE  THAT  USE  OF  ANY  OF  OUR  PLATFORM,  SITE 
                            CONTENT,  OR  ANY  THIRD  PARTY  SERVICES  IS  AT  YOUR  SOLE  RISK.&nbsp;&nbsp; OUR
                            PLATFORM, SITE CONTENT, AND THIRD PARTY SERVICES ARE PROVIDED &#34;AS IS&#34;
                            AND  &#34;AS  AVAILABLE&#34;.  TO  THE  FULLEST  EXTENT  PERMITTED  BY  LAW,  THE
                            COMPANY EXPRESSLY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES OF
                            ANY  KIND,  WHETHER  EXPRESS,  IMPLIED,  STATUTORY,  OR  OTHERWISE,
                            INCLUDING  BUT  NOT  LIMITED  TO  IMPLIED  OR  STATUTORY  WARRANTIES  OF
                            MERCHANTABILITY, FITNESS FOR A PARTICULAR USE OR PURPOSE, TITLE, QUIET
                            ENJOYMENT, OR NON-INFRINGEMENT, OR ANY WARRANTIES ARISING OUT OF
                            COURSE  OF  DEALING,  USAGE,  OR  TRADE.  IN  ADDITION,  THE  COMPANY  DOES
                            NOT REPRESENT OR WARRANT THAT ANY INFORMATION OR OTHER CONTENT
                            OBTAINED OR VIEWED BY YOU AS A RESULT OF YOUR USE OF OUR PLATFORM 
                            WILL BE ACCURATE OR RELIABLE, OR THAT YOUR ACCESS TO OUR PLATFORM,
                            SITE  CONTENT,  OR  THIRD  PARTY  SERVICES  WILL  BE  UNINTERRUPTED  OR
                            ERROR-FREE, OR THAT OUR PLATFORM, SITE CONTENT, THIRD PARTY SERVICES,
                            OR  THE  SERVER(S)  THAT  MAKE  OUR  PLATFORM  AVAILABLE  ARE  FREE  OF
                            VIRUSES  OR  OTHER  HARMFUL  COMPONENTS.  THE  COMPANY  EXPRESSLY
                            DISCLAIMS ALL EQUITABLE INDEMNITIES.
                            </span>
                        </div>
                        <br></br>
                        <div>
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                          11. Limitation of Liability  </span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                          YOU UNDERSTAND AND AGREE THAT TO THE FULLEST EXTENT PERMITTED BY 
                          LAW, IN NO EVENT WILL THE COMPANY OR ANY OF OUR OFFICERS, DIRECTORS,
                          EMPLOYEES, AGENTS, MEMBERS, SHAREHOLDERS, OR OTHER 
                          REPRESENTATIVES  (OR  ANY  SUCCESSORS  OR  ASSIGNS  OF  ANY  OF  THE
                          FOREGOING)  (COLLECTIVELY,  &#34;<span style={{fontWeight:'bold'}}> COMPANY </span><span style={{fontWeight:'bold'}}> REPRESENTATIVES</span> &#34;)  BE  LIABLE 
                          UNDER  ANY  THEORY  OF  LIABILITY  (WHETHER  IN  CONTRACT,  TORT,
                          STATUTORY, OR OTHERWISE) FOR ANY DAMAGES, WHETHER DIRECT, INDIRECT,
                          INCIDENTAL, SPECIAL, CONSEQUENTIAL, PERSONAL INJURY/WRONGFUL DEATH,
                          PUNITIVE, EXEMPLARY, OR OTHERWISE (EVEN IF SUCH PARTIES WERE ADVISED
                          OF,  KNEW  OF  OR  SHOULD  HAVE  KNOWN  OF  THE  POSSIBILITY  OF  SUCH
                          DAMAGES),  ARISING  OUT  OF  OR  IN  CONNECTION  WITH:  (A)  ANY  OF  OUR
                          PLATFORM,  (B)  ANY  SITE  CONTENT  OR  THIRD  PARTY  SERVICES  AVAILABLE
                          THROUGH  ANY  OF  OUR  PLATFORM,  OR  (C)  YOUR  USE  OF,  RELIANCE  ON,  OR 
                          INABILITY TO USE ANY OF THE FOREGOING.  SHOULD THE COMPANY OR ANY
                          COMPANY REPRESENTATIVES BE FOUND TO BE LIABLE TO YOU OR ANY THIRD
                          PARTY  NOTWITHSTANDING  THE  FOREGOING,  SUCH  LIABILITY  WILL  NOT
                          EXCEED USD $100.00 IN THE AGGREGATE.
                          </span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                          12. Exclusions and Limitations<span >  </span></span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion
                            of liability for incidental or consequential damages.  Accordingly, some of the above limitations 
                            and disclaimers may not apply to you.  To the extent that we may not, as a matter of applicable
                            Law,  disclaim  any  implied  warranty  or  limit  our  liabilities,  the  scope  and  duration  of  such
                            warranty and the extent of liability of the Company and Company Representatives will be the
                            minimum permitted under such applicable Law.
                           </span>
                        </div>
                        <br></br>
                        <div >
                          <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                          13. Indemnity & Releases</span>
                        </div>
                        <br></br>
                        <div >
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                              To  the  fullest  extent  permitted  by  Law,  you  agree  to  release,  indemnify,  defend,  and  hold
                              harmless  the  Company  and  Company  Representatives  from  and  against  any  and  all  losses,
                              damages, liabilities, and costs of every nature (including reasonable attorneys&#39; fees and costs), 
                              including without limitation as a result of any actual or threatened claims or demands, incurred 
                              by any of them in connection with, related to, or arising out of any of the following, whether
                              actual or alleged: (i) your use of any of our Platform or Site Content; (ii) your Submissions; (iii)
                              your violation of these Terms, Privacy Policy, or any Additional Terms; (iv) your violation of
                              applicable Law; or (v) your violation of any rights of another. We reserve the right, at our own
                              expense, to control exclusively the defense of any matter otherwise subject to indemnification by
                              you and you will not settle any matter without our prior written consent. You will cooperate with
                              us in asserting any available defenses.
                              <br></br><br></br>
                              In the event that you have a dispute with one or more other users of our Platform, you release the
                              Company and Company Representatives from any and all claims, demands and damages (actual
                              and consequential) of every kind and nature, known and unknown, suspected and unsuspected,
                              disclosed and undisclosed, arising out of or in any way connected with such dispute.
                              <br></br><br></br>
                              If you are a California resident, you hereby waive California Civil Code &#167;1542, which says: &#34;A
                              general release does not extend to claims which the creditor does not know or suspect to exist in
                              his favor at the time of executing the release, which if known by him must have materially
                              affected his settlement with the debtor.&#34; If you are a resident of another jurisdiction, you hereby
                              waive any comparable statute or doctrine.
                            </span>
                          </div>
                          <br></br>
                          <div >
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              14. Third Party Services and Platform</span>
                          </div>
                          <br></br>
                          <div >
                            <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                            Portions  of  our  Platform  may  allow  you  to  use  third  party  products  and  services,  and  our 
                            Platform  may  contain  links  to  third  party  websites  or  resources  (such  products,  services,
                            websites, and resources, collectively &#34;<span style={{fontWeight:'bold'}}> Third Party Services</span> &#34;). Your use of Third Party Services
                            is subject to the license agreements, terms and conditions, privacy policies, and other policies
                            and agreements applicable to such Third Party Services.  We do not approve or endorse any
                            Third Party Services, their content, or any views expressed on any Third Party Service, nor are
                            our Platform approved or endorsed by any Third Party Services. We have no responsibility to
                            you for any Third Party Services.
                            
                            </span>
                          </div>
                          <br></br>
                          <div >
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              15. Linking to Our Platform</span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                              If you wish to link to any portion of our Platform, you may include an active link on any website
                              you control directing a browser to the home page of that Site, provided that you agree to remove
                              the link at any time upon our request.  You may not link to or otherwise provide access to any of
                              our Platform in any way that: (a) alters the look, feel, or functionality of any aspect of our
                              Platform; or (b) in any way that disparages our Platform or products or that could injure the
                              reputation or goodwill of the Company or any Company Representatives or any of its or their
                              products or services.
                              
                               </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              16. Mobile Website</span>
                          </div>
                           <br></br>
                           <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                              The Platform may include certain services that are available via a mobile device, including (i) the 
                              ability to upload content to the Platform via a mobile device and (ii) the ability to browse the
                              Platform from a mobile device (collectively, the &#34;<span style={{fontWeight:'bold'}}> Mobile Website</span> &#34;). To the extent you access
                              our Platform through a mobile device, your wireless service carrier&#146;s standard charges, data rates
                              and other fees may apply. In addition, downloading, installing, or using certain elements of the 
                              Mobile Website may be prohibited or restricted by your carrier, and not all aspects of the Mobile
                              Website may work with all carriers or devices. By using the Mobile Website, you agree that we
                              may communicate with you regarding we by electronic means and that certain information about
                              your usage of the Mobile Website may be communicated to us.
                              
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              17. DISPUTE RESOLUTION</span>
                          </div>
                          <br></br>
                          <div>
                                <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                                PLEASE  READ  THIS  SECTION  CAREFULLY.  IT  AFFECTS  YOUR  LEGAL  RIGHTS,
                                INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.
                                <br></br><br></br>
                                  <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000',fontStyle:'italic'}}>
                                  Initial Dispute Resolution<span style={{fontStyle:'normal'}}>.</span>
                                  </span>
                                  &nbsp;&nbsp; You agree that, before initiating any Dispute proceeding, you will
                                  first give us an opportunity to resolve the Dispute informally. To begin this process, you must
                                  send  a  Notice  of  Dispute  by  certified  mail  to  the  mailing  address  set  forth  in  Section  25
                                  (&#34;Contact Us; Notices&#34;) below. The Notice of Dispute must include (1) your name, (2) your
                                  contact information (including your username, if the Dispute relates to an account), and (3) a
                                  brief written description of the Dispute and the relief you are seeking. If you and we do not
                                  resolve the Dispute within 45 days after receiving your Notice of Dispute, then you or we may
                                  initiate a court proceeding.
                                 
                                 <br></br><br></br>
                                 <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000',fontStyle:'italic'}}>
                                 Exceptions<span style={{fontStyle:'normal'}}>.</span>
                                </span>
                                &nbsp;&nbsp;Notwithstanding the other provisions of this Section 17, either you or we may: (1)
                                bring enforcement actions, validity determinations or claims arising from or relating to theft,
                                piracy or unauthorized use of intellectual property in state or federal court with jurisdiction, in 
                                the International Trade Commission, in the U.S. Patent and Trademark Office, or in applicable
                                foreign equivalents of the foregoing forums, to protect our respective intellectual property rights
                                (&#34;intellectual  property  rights&#34;  means  patents,  copyrights,  moral  rights,  trademarks,  industrial
                                design rights, database rights, and trade secrets, but not privacy or publicity rights); and (2) seek 
                                relief in a small claims court for Disputes within the scope of that court&#34;s jurisdiction.  
                                <br></br><br></br>
                                <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000',fontStyle:'italic'}}>
                                    Class Action Waiver<span style={{fontStyle:'normal'}}>.</span>
                                </span>
                                &nbsp;&nbsp;YOU AND THE COMPANY AGREE THAT EACH MAY BRING
                                CLAIMS AGAINST THE OTHER ONLY IN AN INDIVIDUAL CAPACITY, AND NOT AS
                                A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR
                                REPRESENTATIVE  PROCEEDING  IN  A  COURT  PROCEEDING,  UNLESS  BOTH  YOU
                                ND WE SPECIFICALLY AGREE OTHERWISE IN WRITING.
                                <br></br><br></br>
                                <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000',fontStyle:'italic'}}>
                                Changes<span style={{fontStyle:'normal'}}>.</span>
                                </span> 
                                &nbsp;&nbsp;Notwithstanding the provisions of Section 2 (Modifications), if we change any of the
                                terms of this Section 17 after the date you first accepted these Terms (or accepted any subsequent
                                changes to these Terms), you may reject any such change by sending us written notice within 30
                                days of the date such change became effective, as indicated in the &#34;Last Updated&#34; date above or
                                the date of our email to you notifying you of such change.
                                <br></br><br></br>
                                <span  style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.1px',color:'#000000',fontStyle:'italic'}}>
                                Severability<span style={{fontStyle:'normal'}}>.</span>
                                </span> 
                                &nbsp;&nbsp;If any clause within this Section 17 is found to be illegal or unenforceable, that
                                clause will be severed from this Section 17, whose remainder will be given full force and effect,
                                to the extent permitted by applicable Law. 
                               
                                </span>
                            </div>
                            <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                              18. Governing Law & Jurisdiction</span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                              These Terms are governed by and shall be construed in accordance with the laws of the State of 
                              New York, without giving effect to any conflict of laws principles. Foreign laws and the United
                              Nations International Conventions on the Sale of Goods (CISG) of 1980 shall not apply.
                              <br></br><br></br>
                              You and we each hereby consent to the exclusive jurisdiction of the state and federal courts
                              located in San Francisco, California, and irrevocably waive any right we each may otherwise
                              have to challenge the appropriateness of such forums on any basis, including but not limited to 
                              lack of personal jurisdiction, improper venue, or inconvenience of the forum, and waive any
                              right to a jury trial.

                              </span>
                          </div>
                          <br></br>
                          <div >
                            <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                            19. Refusal of Service; Modification of Platform; Termination.</span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}}>
                                  We reserve the right, for any reason, in our sole discretion, to refuse service, terminate accounts,
                                  remove or edit Site Content, or to terminate, change, suspend, or discontinue any aspect of the
                                  Platform or these Terms at any time. We may also impose limits on certain features of the
                                  Platform or restrict access to any part or all of the Platform without notice or penalty.  We may
                                  terminate, suspend, or modify your access to, or registration with, all or part of any of our
                                  Platform, without notice, if you violate these Terms or you engage in any conduct that we, in our
                                  sole and absolute discretion, believe is in violation of any applicable Law or is otherwise harmful
                                  to the interests of us, any other user of any of our Platform, or any third party.
                                  <br></br><br></br>
                                  The Disclaimer of Warranties, Limitation of Liability, Indemnification, Release, Governing Law,
                                  Dispute  Resolution,  and  Class  Action  Waiver  provisions  of  these  Terms  shall  survive  any
                                  termination of these Terms and/or Your Account with us, and the discontinuation of your use of our Platform.
                               </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                20. California Users.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}} >
                                  Under California Civil Code Section 1789.3, California users may be entitled to the following 
                                  consumer rights notice:  If you have a question or comment about any of our Platform, you may
                                  contact us as provided in Section 25 (Contact Us; Notices) below. Regardless of which method is 
                                  used, you must ensure that where available, a tracking service is used.  California residents may
                                  reach the Complaint Assistance Unit of the Division of Consumer Services of the California
                                  Department of Consumer Affairs by mail at 1625 North Market Blvd. Suite N 112, Sacramento,
                                  California 95834 or by telephone at (800) 952-5210.
                                  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                21. Electronic Communications Notice.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}} >
                                  You agree that any notices or other communications regarding your use of our Platform may be
                                  provided  to  you  electronically  (by  posting  on  the  Platform,  by  e-mail,  and  other  electronic
                                  formats) and will be considered received upon posting or other distribution. You agree that all
                                  agreements and other communications that we provide to you electronically satisfy any legal
                                  requirement that such communications be in writing.
                                  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                22. Severability.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}} >
                                Except as otherwise provided in the &#34;Severability&#34; clause of Section 17, if any of these Terms is
                                determined to be invalid, void, or unenforceable for any reason, then the unenforceable provision
                                will be deemed amended in a manner that will most nearly carry out the intent of the provision to
                                the fullest extent permitted by applicable Law or deleted if amendment is not possible, and the
                                remaining Terms will be enforceable to the fullest extent permitted by law.
                                  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                23. No Waiver.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}} >
                              Any waiver of any provision of these Terms must be in writing.  Our failure to enforce these
                              Terms in every instance in which they might apply is not a waiver of any of any of our rights in
                              any other instance, and we reserve our right to take all legal steps available to enforce these
                              Terms.
                                  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                24. Entire Agreement; Assignment; Section Titles.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.3px',color:'#000000'}} >
                                These Terms, together with the Privacy Policy, and any other Additional Terms, constitute the
                                entire and exclusive agreement between us with respect to their subject matter, and govern your
                                use of our Platform and Site Content, superseding any prior agreements or negotiations between 
                                us with respect to that subject matter. These Terms, and any rights or licenses granted hereunder,
                                may be assigned or delegated by us without restriction. These Terms bind and inure to the
                                benefit of you and us and each of our respective successors and permitted assigns. The section
                                titles in these Terms are for convenience only and have no legal or contractual effect.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontWeight:'bold',fontFamily:'Times New Roman',fontSize:'16.4px',color:'#000000'}}>
                                24. Contact Us; Notices.  
                              </span>
                          </div>
                          <br></br>
                          <div>
                              <span style={{fontFamily:'Times New Roman',fontSize:'16.5px',color:'#000000'}} >
                                  If you have any questions about these Terms, please contact us at the following:
                                  <br></br><br></br>
                                  <a style={{color:'#0000ff'}} href="mailto:info@symba.io">info@symba.io</a>
                                  <br></br><br></br>
                                  Symba Inc.
                                  <br></br>
                                  Four Embarcadero Center Suite 1400
                                  <br></br>
                                  San Francisco, California 94111
                                  <br></br><br></br>
                                  We may deliver notice to you by email, posting a notice on our Platform, or any other method we
                                  choose, and such notice will be effective on dispatch. If you give notice to us, it will be effective
                                  when received by mail at the mailing address listed above.
                              </span>
                          </div>

                        </div>
                    </CardTitle>
                    <Separator className="mb-5" />
                     <div style={{float:'right'}}>
                     <Button color="danger" onClick={this.termcondition_cancel}>
                        Cancel
                      </Button>{" "}
                     <Button color="primary" onClick={this.termcondition_agree}>
                        I AGREE
                      </Button>
                      
                     </div>
                  </div>
                </Card>
              
              </Colxx>
            </Row>
         
          </div>
       
        </main>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      currentUser: state.userReducer.currentUser,

    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      userTermcondition_agree: (params) => {
        dispatch(userTermcondition_agree(params));
      },   
      dispatch: dispatch,
    };
  };
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TermConditionPage);
