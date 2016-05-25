import React from "react";
import { connect } from "react-redux";
import { Link, IndexLink } from 'react-router';

class Main extends React.Component {
  render() {
    const { visitors } = this.props;
    const img_url = (number) => {
      return "https://placehold.it/200?text=" + number;
    };
    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 col-md-2 sidebar">
          <ul className="nav nav-sidebar">
            <li className="active"><Link to="/app">Dashboard</Link></li>
          </ul>
        </div>
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <h1 className="page-header">Dashboard</h1>

          <div className="row placeholders">
            <div className="col-xs-8 col-sm-4 placeholder">
              <img src={img_url(visitors.total)} width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
              <h4>Total</h4>
            </div>
            <div className="col-xs-8 col-sm-4 placeholder">
              <img src={img_url(visitors.max_online)} width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
              <h4>Max. online</h4>
            </div>
            <div className="col-xs-8 col-sm-4 placeholder">
              <img src={img_url(visitors.online)} width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
              <h4>Online</h4>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
};

const mapStateToProps = (state) => {
  return {
    visitors: state.visitors
  };
};
export default connect(mapStateToProps)(Main);