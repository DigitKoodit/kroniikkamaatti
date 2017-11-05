import React from 'react';
import PropTypes from 'prop-types';
import './GroupView.css';

const GroupView = (props) => {
  const { groupData, viewToggle } = props;
  const tutors = groupData.filter(student => student.isTutor);
  return(
    <div className="GroupView">
      <h3>{tutors.map(tutor => tutor.name).join(' & ')}</h3>
      <ul className="GroupView-Students">
        { groupData.map((student, i) =>
        <li key={i}>
          <a onClick={ () => viewToggle(student) }>{student.name} {student.isTutor && '- Tuutori'}</a>
        </li>,
        ) }
      </ul>
    </div>
  );
}

GroupView.propTypes = {
  groupData: PropTypes.array.isRequired,
  viewToggle: PropTypes.func.isRequired,
};

export default GroupView;