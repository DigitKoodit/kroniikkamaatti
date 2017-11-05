import React, { Component } from 'react';
import { groupBy, valuesIn } from 'lodash';
import CommentView from './CommentView';
import GroupView from './GroupView';

class GuildView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFreshman: null
    };
  }

  toggleSelectedFreshman(selection) {
    const { selectedFreshman } = this.state;

    if (selectedFreshman || !selection) {
      return this.setState({ selectedFreshman: null });
    }

    return this.setState({ selectedFreshman: selection });
  }

  render() {
    const { state, props } = this;
    const { selectedFreshman } = state;
    const { data, guild } = props;
    const filteredData = data.filter(student => student.guild.match(guild));
    const groupedData = groupBy(filteredData, 'tutorGroup');
    console.log(groupedData, guild);

    return selectedFreshman
      ? <CommentView
        freshman={selectedFreshman}
        callback={ () => this.toggleSelectedFreshman() }        
      />
      : valuesIn(groupedData).map((group, i) =>
        <GroupView
          key={i}
          groupData={group}
          viewToggle={ selection => this.toggleSelectedFreshman(selection) }
        />
      );
  }
}

export default GuildView;