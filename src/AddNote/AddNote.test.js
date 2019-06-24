// import React from 'react';
// import ReactDOM from 'react-dom';
// import AddNote from './AddNote';
// import renderer from 'react-test-renderer';
// import {MemoryRouter} from 'react-router-dom';

// describe('AddNote Component', () => {
//     it('renders without crashing', () => {
//         // create a DOM element to render the component into
//         const div = document.createElement('div');
//         //render the component, this is the actual test, if something is wrong it will fail here
//         ReactDOM.render(
//             <MemoryRouter>
//                 <AddNote />
//             </MemoryRouter>
//         , div);
//       //clean up code
//       ReactDOM.unmountComponentAtNode(div);
//     });
    
//     it('renders the UI as expected', () => {
//         const tree = renderer
//             .create(
//                 <MemoryRouter>
//                     <AddNote />
//                 </MemoryRouter>
//             )
//             .toJSON();
//         expect(tree).toMatchSnapshot();  
//     });
// });
