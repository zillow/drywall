[![npm version](https://badge.fury.io/js/drywall.svg)](https://badge.fury.io/js/drywall)

Drywall is a style agnostic component library built with [React](https://reactjs.org/) and
[styled-components](https://www.styled-components.com/).
The library consists of high quality, functional components that are accessible and thoroughly tested.
Drywall itself does not provide any styles, but leverages the
[styled-components theming API](https://www.styled-components.com/docs/advanced#theming)
to provide flexible theming capabilities.

**Wait... a component library without styles?!**

After building several different component libraries, we found that styles were always the least
sharable aspect -- so why include them at all if they are just going to be overriden anyways?
Styles are built independently as themes, creating a separation of concerns,
leaving the components to focus on interactions and accessibility.
