import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import axiosInstance from "../../../utils/axiosApi";
import * as constants from "../../../utils/constants";
import { getAPIURL } from "../../../utils/getApiUrl";
import { NotificationManager } from "../../../components/common/react-notifications";
/* eslint-disable */
//import { toastr } from "react-redux-toastr";
//import { Row } from "devextreme-react/responsive-box";
//import { Colxx } from "../../../components/common/CustomBootstrap";
//import cardImage from "../../../../public/assets/img/resorces_card.jpg";
// export default function DND(props) {
//   const [state, setState] = React.useState({
//     odd: [],
//     even: [],
//   });
//   const [dragDisable, setdragDisable] = React.useState(true);
//   let table = [];
//   React.useEffect(() => {
//     if (props.LaunchpadDetail !== null) {
//       setState({
//         odd: props.LaunchpadDetail.Resources.filter(
//           (item, index) => (index + 1) % 2 !== 0
//         ),
//         even: props.LaunchpadDetail.Resources.filter(
//           (item, index) => (index + 1) % 2 === 0
//         ),
//         dragDisable: true,

//       });
//     }
//   }, [props.LaunchpadDetail]);
//   const handledragDisable = () => {

//     setdragDisable((dragDisable) => false);

//   };
//   const handleDndData = () => {
//     const { even, odd } = state;
//     let combinedArr = [];
//     let i;
//     let l = Math.max(odd.length, even.length);
//     for (i = 0; i < l; i++) {
//       if (odd[i]) {
//         combinedArr.push(odd[i]);
//       }
//       if (even[i]) {
//         combinedArr.push(even[i]);
//       }
//     }
//     combinedArr.map((item, index) => {
//       item.index = index;
//     });
//     axiosInstance({
//       method: "PUT",
//       url: getAPIURL(constants.LAUNCHPAD_DRAGDROP_URL, {}),
//       data: combinedArr,
//     }).then((response) => {
//       NotificationManager.success(
//         "Cards rearranged successfully",
//         "Success",
//         3000,
//         null,
//         null,
//         ""
//       );
//     });
//     setdragDisable(true)
//   };
//   // function to help us with reordering the result
//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };
//   // Moves an item from one list to another list.
//   const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);
//     destClone.splice(droppableDestination.index, 0, removed);
//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;
//     return result;
//   };
//   const onDragEnd = (result) => {
//     const { source, destination } = result;
//     const { even, odd } = state;
//     // dropped outside the list
//     if (!destination) {
//       return;
//     }
//     if (source.droppableId === destination.droppableId) {
//       const items = reorder(
//         source.droppableId === "droppable2" ? even : odd,
//         source.index,
//         destination.index
//       );
//       let dummystate = { odd: items ,dragDisable: true };
//       if (source.droppableId === "droppable2") {
//         dummystate = { even: items ,dragDisable: true};
//       }
//       setState({ ...state, ...dummystate });
//     } else {
//       const result = move(
//         source.droppableId === "droppable1" ? odd : even,
//         destination.droppableId === "droppable2" ? even : odd,
//         source,
//         destination
//       );
//       setState({
//         odd: result.droppable1,
//         even: result.droppable2,
//       });
//     }
//   };
//   if (props.LaunchpadDetail) {
//     if (props.LaunchpadDetail.ResourcesCount > 0) {
//       const { even, odd } = state;
//       return (
//         <DragDropContext onDragEnd={onDragEnd}>
//             <div style={{textAlign:"center",width:'85%',marginTop:'-22px'}}>
//                 {dragDisable ? (

//                   <Button
//                     outline
//                     className="mb-2"
//                     color="info"
//                     onClick={handledragDisable}
//                   >
//                     Rearrange Cards
//                   </Button>
//                 ) : (
//                   <div>
//                   <Button
//                     outline
//                     className="mb-2"
//                     color="info"
//                     onClick={handleDndData}
//                   >
//                     Save Order
//                   </Button>&nbsp;&nbsp;
//                   <Button
//                     outline
//                     className="mb-2"
//                     color="danger"
//                     onClick={() => setdragDisable(true)}
//                   >
//                     Cancel
//                   </Button>
//                   </div>
//               )}
//               </div>

//           <br></br>
//           <br></br>
//           <div style={{ display: "flex" }}>
//             <Droppable droppableId={"droppable1"}>
//               {(provided) => (
//                 <div
//                   style={{
//                     width: window.innerWidth / 3,
//                   }}
//                   className="droppable"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                 >
//                   {odd.map((item, i) => (
//                     <Draggable
//                       key={`${i}_odd`}
//                       draggableId={`${i}_odd`}
//                       index={i}
//                       isDragDisabled={dragDisable}
//                     >
//                       {(provided) => (
//                         <div
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                         >
//                           {/* <img src={cardImage} /> */}
//                           <Card
//                             style={{
//                               height: "160px",
//                               width: window.innerWidth / 3,
//                               // marginLeft: "2%",
//                               // border: "8px solid #17b298",

//                               // borderImage:" conic-gradient(teal,DARKCYAN,LIGHTSEAGREEN, MEDIUMAQUAMARINE,DARKCYAN,teal) 1"
//                             }}
//                           >
//                             <CardBody>
//                               <CardTitle style={{ marginBottom: "1rem" }}>
//                                 <a
//                                   className="cardtitle"
//                                   href={item.resource_link}
//                                   target="_blank"
//                                 >
//                                   {item.resource_title}
//                                 </a>
//                               </CardTitle>
//                               <label>{item.resource_description}</label>
//                             </CardBody>
//                           </Card>
//                           <br />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   ​{provided.placeholder}​<br></br>
//                 </div>
//               )}
//             </Droppable>
//             <Droppable droppableId={"droppable2"}>
//               {(provided) => (
//                 <div
//                   style={{
//                     paddingLeft: "2%",
//                     width: window.innerWidth / 3,
//                   }}
//                   className="droppable"
//                   {...provided.droppableProps}
//                   ref={provided.innerRef}
//                 >
//                   {even.map((item, i) => (
//                     <Draggable
//                       key={`${i}_even`}
//                       draggableId={`${i}_even`}
//                       index={i}
//                       isDragDisabled={dragDisable}
//                     >
//                       {(provided) => (
//                         <div
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                         >
//                           <Card
//                             style={{
//                               height: "160px",
//                               width: window.innerWidth / 3,
//                               // border: "8px solid #17b298",

//                               // borderImage:" conic-gradient(teal,DARKCYAN,LIGHTSEAGREEN, MEDIUMAQUAMARINE,DARKCYAN,teal) 1"

//                             }}
//                           >
//                             <CardBody>
//                               <CardTitle style={{ marginBottom: "1rem" }}>
//                                 <a
//                                   className="cardtitle"
//                                   href={item.resource_link}
//                                   target="_blank"
//                                 >
//                                   {item.resource_title}
//                                 </a>
//                               </CardTitle>
//                               <label>{item.resource_description}</label>
//                             </CardBody>
//                           </Card>
//                           <br />
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                   {provided.placeholder}
//                   <br></br>
//                 </div>
//               )}
//             </Droppable>
//           </div>

//         </DragDropContext>
//       );
//     }
//   }
//   return table;
// }

export default function DND(props) {
  const [state, setState] = React.useState({
    odd: [],
    even: [],
  });
  const [dragDisable, setdragDisable] = React.useState(true);
  let table = [];
  React.useEffect(() => {
    if (props.LaunchpadDetail !== null) {
      setState({
        odd: props.LaunchpadDetail.Resources.filter(
          (item, index) => (index + 1) % 2 !== 0
        ),
        even: props.LaunchpadDetail.Resources.filter(
          (item, index) => (index + 1) % 2 === 0
        ),
        dragDisable: true,
      });
    }
  }, [props.LaunchpadDetail]);
  const handledragDisable = () => {
    setdragDisable((dragDisable) => false);
  };
  const handleDndData = () => {
    const { even, odd } = state;
    let combinedArr = [];
    let i;
    let l = Math.max(odd.length, even.length);
    for (i = 0; i < l; i++) {
      if (odd[i]) {
        combinedArr.push(odd[i]);
      }
      if (even[i]) {
        combinedArr.push(even[i]);
      }
    }
    combinedArr.map((item, index) => {
      item.index = index;
    });
    axiosInstance({
      method: "PUT",
      url: getAPIURL(constants.LAUNCHPAD_DRAGDROP_URL, {}),
      data: combinedArr,
    }).then((response) => {
      NotificationManager.success(
        "Cards rearranged successfully",
        "Success",
        3000,
        null,
        null,
        ""
      );
    });
    setdragDisable(true);
  };
  // function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  // Moves an item from one list to another list.
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    const { even, odd } = state;
    // dropped outside the list
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === "droppable2" ? even : odd,
        source.index,
        destination.index
      );
      let dummystate = { odd: items, dragDisable: true };
      if (source.droppableId === "droppable2") {
        dummystate = { even: items, dragDisable: true };
      }
      setState({ ...state, ...dummystate });
    } else {
      const result = move(
        source.droppableId === "droppable1" ? odd : even,
        destination.droppableId === "droppable2" ? even : odd,
        source,
        destination
      );
      setState({
        odd: result.droppable1,
        even: result.droppable2,
      });
    }
  };
  if (props.LaunchpadDetail) {
    if (props.LaunchpadDetail.ResourcesCount > 0) {
      const { even, odd } = state;
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          {/* <div style={{textAlign:"center",width:'90%',marginTop:'-22px'}}></div> */}
          <div style={{ textAlign: "center" }}>
            {dragDisable ? (
              <Button
                outline
                className="mb-2"
                color="primary"
                onClick={handledragDisable}
              >
                Rearrange Cards
              </Button>
            ) : (
              <div>
                <Button
                  outline
                  className="mb-2"
                  color="success"
                  onClick={handleDndData}
                >
                  Save Order
                </Button>
                &nbsp;&nbsp;
                <Button
                  outline
                  className="mb-2"
                  color="danger"
                  onClick={() => setdragDisable(true)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <br></br>
          <br></br>
          <div style={{ display: "flex" }}>
            <Droppable droppableId={"droppable1"}>
              {(provided) => (
                <div
                  style={{
                    width: "48%",
                  }}
                  className="droppable"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {odd.map((item, i) => (
                    <Draggable
                      key={`${i}_odd`}
                      draggableId={`${i}_odd`}
                      index={i}
                      isDragDisabled={dragDisable}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          {/* <img src={cardImage} /> */}
                          <Card className="lanachpad_resource_card">
                            <CardBody>
                              <CardTitle style={{ marginBottom: "1rem" }}>
                                <a
                                  className="cardtitle"
                                  href={item.resource_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.resource_title}
                                </a>
                              </CardTitle>
                              <label>{item.resource_description}</label>
                            </CardBody>
                          </Card>
                          <br />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  ​{provided.placeholder}​<br></br>
                </div>
              )}
            </Droppable>
            <Droppable droppableId={"droppable2"}>
              {(provided) => (
                <div
                  style={{
                    paddingLeft: "2%",
                    width: "50%",
                  }}
                  className="droppable"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {even.map((item, i) => (
                    <Draggable
                      key={`${i}_even`}
                      draggableId={`${i}_even`}
                      index={i}
                      isDragDisabled={dragDisable}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Card className="lanachpad_resource_card">
                            <CardBody>
                              <CardTitle style={{ marginBottom: "1rem" }}>
                                <a
                                  className="cardtitle"
                                  href={item.resource_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {item.resource_title}
                                </a>
                              </CardTitle>
                              <label>{item.resource_description}</label>
                            </CardBody>
                          </Card>
                          <br />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <br></br>
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      );
    }
  }
  return table;
}
