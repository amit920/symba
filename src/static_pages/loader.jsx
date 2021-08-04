import React, { Component } from "react";
import { connect } from "react-redux";
import cn from "classnames";

class Loader extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    var inlineStyle = {
      width: "100%",
    };
    return (
      <div
        className={cn("overlay", {
          "show-overlay": this.props.isLoading,
          "hide-overlay": !this.props.isLoading,
        })}
        style={inlineStyle}
      >
        <div className="loader-image overlay-content">
          <img src="/assets/img/loader.gif" alt="" width="70px" height="70px" />
          <p style={{fontSize:"15px",color:'black'}}>Loading, please wait...</p>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.layout.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
