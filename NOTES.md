# NOTES

* Updated react-scripts for scss support.
* Updated react and react-dom to support latest redux.

## ASSUMPTIONS
* Font style, spacing, padding, colour might not match visual design.
* Not catering for responsive.
* Not all components are tested.
* No code and scss linting.
* No input validation.
* No accessibilty.
* Some links will go to 404.

## FURTHER IMPROVEMENT
* Redux action type can be moved to constants.
* componentWillReceiveProps will be deprecated in React 17, need to use alternatives
* Product screen, and Cart screen has the same quantity input, plus button and minus button, this could be taken out into seperate components.
* On Category screen load, always fetch data and store into redux store. We can check to only fetch if redux store is empty.
* Code only cater for 1 category, can be improved for multiple categories.
* Cart screen, and the Cart popup use same component as they share same data.
  Cart seperates the render based on the type into different functions - renderFull and renderPopup.
  CartItem use conditional check in render.
  Unsure which one is better, seperating into different function might be more readable.
* CSS can be thought over, combining classes, etc.
* Some business logic exist in cartReducer, should it exist in the component rather than reducer?
* Test is very basic - not familiar yet with it, and has time constraint.
* prop types typechecking