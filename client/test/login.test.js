import React from 'react'
import {shallow} from 'enzyme'
import Main from '../components/Main.component'

  describe('Header', () => {
    
    it('should render self and subcomponents', () => {
      
  const enzymeWrapper = shallow(<Main children={0} />);
  expect(enzymeWrapper.find('.other-class').exists()).toBe(false);
  
      // expect(enzymeWrapper.find('div').hasClass('container chinku')).toBe(true)

      //  expect(enzymeWrapper.find('a').text()).toBe('Sign out')

      //  const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      //  expect(todoInputProps.newTodo).toBe(true)
    //   expect(todoInputProps.placeholder).toEqual('What needs to be done?')
    })
  })
  
  
