import React, { Component } from 'react';
import fetchData from '../core/api';

class DataWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
    }
  }

  componentWillMount() {
    fetchData()
      .then((freshmanData) => {
        this.setState({
          loading: false,
          data: freshmanData
        });
      });
  }

  componentWillUnmount() {
    this.setState(null);
  }

  render() {
    const { data, loading } = this.state;
    const { route } = this.props;

    if (loading) return <h4>Data is still loading</h4>;

    return <route.component guild={route.guild} data={data} routes={route.routes} />
  } 
}

export default DataWrapper;
