import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {

    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAdd} />
                {this.props.personsState.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDelete(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        personsState: state.persons
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: () => dispatch({type: 'ADD'}),
        onDelete: (id) => dispatch({type: 'DELETE', personId: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Persons);
