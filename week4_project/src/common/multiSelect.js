import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import styles from '../styles/styles';

const items = [{
    id: "1",
    name: 'Ondo'
  }, {
    id: "2",
    name: 'Ogun'
  }, {
    id: 3,
    name: 'Calabar'
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos'
  }, {
    id: '667atsas',
    name: 'Maiduguri'
  }, {
    id: 'hsyasajs',
    name: 'Anambra'
  }, {
    id: 'djsjudksjd',
    name: 'Benue'
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
  }, {
    id: 'suudydjsjd',
    name: 'Abuja'
    }
];

class MultiSelectExample extends Component {
  state = {
    selectedItems : []
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    this.props.setModalMembers(selectedItems);
    console.log(selectedItems);
    
  };

  render() {
    const { selectedItems } = this.state;

    return (
      <View style={styles.input}>
        <MultiSelect
          hideTags
          items={this.props.allUserList}
          uniqueKey="kakao_id"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="친구를 골라보세요!"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          
        />
        <View>
          {this.multiSelect &&
          this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
  }
}
export default MultiSelectExample;