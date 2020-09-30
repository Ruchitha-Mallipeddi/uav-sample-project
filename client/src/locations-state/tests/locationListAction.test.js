import * as actionTypes from "../actions/actionTypes";   
import * as actions from "../actions/locationsListAction"
describe('actions', () => {
  test('should create an action to add location', () => {
    const id = 1
    const lat= 50.67
    const lng= 49.4
    const expectedAction = {
      type: actionTypes.ADD_NEW_LOCATION,
      id,
      lat,
      lng
      

    }
    expect(actions.addLocation(id,lat,lng)).toEqual(expectedAction)
  })
})
