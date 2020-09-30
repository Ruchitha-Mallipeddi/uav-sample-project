import reducer from '../reducers/locationlistReducer'
import * as actionTypes from "../actions/actionTypes";  

describe('Location List reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([     
    ])
  })
  test('should add location', () => {
    expect(reducer([], { type: actionTypes.ADD_NEW_LOCATION,
        id: 1,
        lat: 57.8,
   lng: 34.5
    
})).toEqual([ {
    id: 1,
    lat: 57.8,
    lng: 34.5
   
}    
    ])
  })
 
  
  test('no change in state  when wrong input is given to add location', () => {
    expect(reducer([{
        lat: 57.8,
        lng: 34.5
       
    }   ], { type: actionTypes.ADD_NEW_LOCATION,
    
})).toEqual([ {
    lat: 57.8,
    lng: 34.5
   
}
    ])
  })
   
    
})